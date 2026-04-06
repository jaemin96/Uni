import { and, eq, gt } from "drizzle-orm";

import { db, refreshTokens, users, type RefreshTokenRow, type UserRow } from "@mono/db";

import { getTokenConfig } from "./config.js";
import {
  DuplicateEmailError,
  InvalidCredentialsError,
  InvalidRefreshTokenError,
  TokenFamilyCompromisedError,
} from "./errors.js";
import { hashPassword, verifyPassword } from "./password.service.js";
import {
  compareRefreshToken,
  generateRefreshToken,
  hashRefreshToken,
  signAccessToken,
} from "./token.service.js";
import type { AuthResult, LoginInput, SignupInput, UserDTO } from "./types.js";
import { validateEmail, validateNickname, validatePassword } from "./validation.js";

function mapUser(user: UserRow): UserDTO {
  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    createdAt: user.createdAt,
  };
}

function getRefreshExpiryDate(refreshExpiresDays: number): Date {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + refreshExpiresDays);
  return expiresAt;
}

async function issueTokens(user: UserRow, family?: string): Promise<AuthResult> {
  const config = getTokenConfig();
  const accessToken = signAccessToken(
    {
      sub: user.id,
      email: user.email,
    },
    config,
  );
  const refreshToken = generateRefreshToken(family);
  const tokenHash = await hashRefreshToken(refreshToken.raw);

  await db.insert(refreshTokens).values({
    tokenHash,
    family: refreshToken.family,
    userId: user.id,
    expiresAt: getRefreshExpiryDate(config.refreshExpiresDays),
  });

  return {
    accessToken,
    refreshToken: refreshToken.raw,
    user: mapUser(user),
  };
}

async function findTokenMatch(rawToken: string): Promise<RefreshTokenRow | null> {
  const activeRows = await db
    .select()
    .from(refreshTokens)
    .where(and(eq(refreshTokens.revoked, false), gt(refreshTokens.expiresAt, new Date())));

  for (const row of activeRows) {
    const matched = await compareRefreshToken(rawToken, row.tokenHash);
    if (matched) {
      return row;
    }
  }

  return null;
}

async function handleReuseDetection(rawToken: string): Promise<never> {
  const reusedRows = await db.select().from(refreshTokens).where(eq(refreshTokens.revoked, true));

  for (const row of reusedRows) {
    const matched = await compareRefreshToken(rawToken, row.tokenHash);
    if (matched) {
      await db
        .update(refreshTokens)
        .set({ revoked: true })
        .where(eq(refreshTokens.family, row.family));
      throw new TokenFamilyCompromisedError();
    }
  }

  throw new InvalidRefreshTokenError();
}

export async function getUserFromRefreshToken(rawToken: string): Promise<UserDTO> {
  const matchedToken = await findTokenMatch(rawToken);

  if (!matchedToken) {
    return handleReuseDetection(rawToken);
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, matchedToken.userId),
  });

  if (!user) {
    throw new InvalidRefreshTokenError();
  }

  return mapUser(user);
}

export async function signup(input: SignupInput): Promise<AuthResult> {
  const email = validateEmail(input.email);
  const password = validatePassword(input.password);
  const nickname = validateNickname(input.nickname);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    throw new DuplicateEmailError();
  }

  const passwordHash = await hashPassword(password);
  const [createdUser] = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      nickname,
    })
    .returning();

  if (!createdUser) {
    throw new Error("Failed to create user");
  }

  return issueTokens(createdUser);
}

export async function login(input: LoginInput): Promise<AuthResult> {
  const email = validateEmail(input.email);
  const password = validatePassword(input.password);

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const validPassword = await verifyPassword(password, user.passwordHash);
  if (!validPassword) {
    throw new InvalidCredentialsError();
  }

  return issueTokens(user);
}

export async function refresh(oldRawToken: string): Promise<AuthResult> {
  const matchedToken = await findTokenMatch(oldRawToken);

  if (!matchedToken) {
    return handleReuseDetection(oldRawToken);
  }

  if (matchedToken.expiresAt.getTime() <= Date.now()) {
    await db.update(refreshTokens).set({ revoked: true }).where(eq(refreshTokens.id, matchedToken.id));
    throw new InvalidRefreshTokenError();
  }

  await db.update(refreshTokens).set({ revoked: true }).where(eq(refreshTokens.id, matchedToken.id));

  const user = await db.query.users.findFirst({
    where: eq(users.id, matchedToken.userId),
  });

  if (!user) {
    throw new InvalidRefreshTokenError();
  }

  return issueTokens(user, matchedToken.family);
}

export async function logout(userId: string): Promise<void> {
  await db
    .update(refreshTokens)
    .set({ revoked: true })
    .where(and(eq(refreshTokens.userId, userId), eq(refreshTokens.revoked, false)));
}
