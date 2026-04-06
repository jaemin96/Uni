export interface AuthUser {
  id: string;
  email: string;
  nickname: string;
  createdAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

