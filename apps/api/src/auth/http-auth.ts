import { HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import type { Response } from "express";

import { AuthError, type AuthResult } from "@mono/auth-core";

const refreshExpiresDays = Number(process.env.JWT_REFRESH_EXPIRES_DAYS ?? "7");

export function applyRefreshCookie(response: Response, refreshToken: string) {
  const maxAge = refreshExpiresDays * 24 * 60 * 60 * 1000;

  response.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export function clearRefreshCookie(response: Response) {
  response.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function toGraphqlPayload(result: AuthResult) {
  return {
    accessToken: result.accessToken,
    user: result.user,
  };
}

export function mapAuthError(error: unknown): never {
  if (error instanceof AuthError) {
    switch (error.code) {
      case "INVALID_CREDENTIALS":
      case "INVALID_REFRESH_TOKEN":
      case "TOKEN_FAMILY_COMPROMISED":
        throw new UnauthorizedException(error.message);
      case "DUPLICATE_EMAIL":
      case "VALIDATION_ERROR":
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      default:
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  throw error;
}

