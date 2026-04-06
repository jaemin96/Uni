export interface UserDTO {
  id: string;
  email: string;
  nickname: string;
  createdAt: Date;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}

export interface SignupInput {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RefreshSessionResult {
  user: UserDTO;
  refreshTokenRowId: string;
  family: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface TokenConfig {
  jwtSecret: string;
  accessExpiresIn: string;
  refreshExpiresDays: number;
}

export interface AccessTokenPayload {
  sub: string;
  email: string;
}
