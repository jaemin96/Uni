import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import type { AccessTokenPayload, TokenConfig } from "./types.js";

const REFRESH_TOKEN_SALT_ROUNDS = 10;

export function signAccessToken(payload: AccessTokenPayload, config: TokenConfig): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.accessExpiresIn as jwt.SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string, config: TokenConfig): JwtPayload {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
}

export function generateRefreshToken(existingFamily?: string): { raw: string; family: string } {
  return {
    raw: uuidv4(),
    family: existingFamily ?? uuidv4(),
  };
}

export async function hashRefreshToken(raw: string): Promise<string> {
  return bcrypt.hash(raw, REFRESH_TOKEN_SALT_ROUNDS);
}

export async function compareRefreshToken(raw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(raw, hash);
}
