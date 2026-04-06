export class AuthError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class DuplicateEmailError extends AuthError {
  constructor() {
    super("DUPLICATE_EMAIL", "이미 가입된 이메일입니다");
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super("INVALID_CREDENTIALS", "이메일 또는 비밀번호가 올바르지 않습니다");
  }
}

export class InvalidRefreshTokenError extends AuthError {
  constructor() {
    super("INVALID_REFRESH_TOKEN", "유효하지 않은 리프레시 토큰입니다");
  }
}

export class TokenFamilyCompromisedError extends AuthError {
  constructor() {
    super("TOKEN_FAMILY_COMPROMISED", "토큰 탈취가 감지되었습니다");
  }
}

export class ValidationError extends AuthError {
  constructor(message: string) {
    super("VALIDATION_ERROR", message);
  }
}

