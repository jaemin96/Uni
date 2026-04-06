import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import type { Response } from "express";
import { eq } from "drizzle-orm";

import { login, logout, refresh, signup } from "@mono/auth-core";
import { db, users } from "@mono/db";

import { CurrentUser } from "./current-user.decorator";
import { GqlAuthGuard } from "./auth.guard";
import { AuthPayloadModel, LoginInput, SignupInput, UserModel } from "./auth.types";
import {
  applyRefreshCookie,
  clearRefreshCookie,
  mapAuthError,
  toGraphqlPayload,
} from "./http-auth";

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthPayloadModel)
  async signup(
    @Args("input") input: SignupInput,
    @Context("res") response: Response,
  ): Promise<AuthPayloadModel> {
    try {
      const result = await signup(input);
      applyRefreshCookie(response, result.refreshToken);
      return toGraphqlPayload(result);
    } catch (error) {
      mapAuthError(error);
    }
  }

  @Mutation(() => AuthPayloadModel)
  async login(
    @Args("input") input: LoginInput,
    @Context("res") response: Response,
  ): Promise<AuthPayloadModel> {
    try {
      const result = await login(input);
      applyRefreshCookie(response, result.refreshToken);
      return toGraphqlPayload(result);
    } catch (error) {
      mapAuthError(error);
    }
  }

  @Mutation(() => AuthPayloadModel)
  async refreshTokens(@Context("req") request: { cookies?: Record<string, string> }, @Context("res") response: Response) {
    const refreshToken = request.cookies?.refresh_token;

    if (!refreshToken) {
      mapAuthError({ code: "INVALID_REFRESH_TOKEN", message: "유효하지 않은 리프레시 토큰입니다" });
    }

    try {
      const result = await refresh(refreshToken!);
      applyRefreshCookie(response, result.refreshToken);
      return toGraphqlPayload(result);
    } catch (error) {
      mapAuthError(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async logout(
    @CurrentUser() user: { sub: string },
    @Context("res") response: Response,
  ): Promise<boolean> {
    await logout(user.sub);
    clearRefreshCookie(response);
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserModel)
  async me(@CurrentUser() user: { sub: string; email: string }): Promise<UserModel> {
    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, user.sub),
    });

    if (!dbUser) {
      throw new Error("User not found");
    }

    return {
      id: dbUser.id,
      email: dbUser.email,
      nickname: dbUser.nickname,
      createdAt: dbUser.createdAt,
    };
  }
}
