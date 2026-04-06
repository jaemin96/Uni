import { ValidationError } from "./errors.js";

const EMAIL_MAX_LENGTH = 255;
const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 20;
const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
const NICKNAME_PATTERN = /^[A-Za-z0-9가-힣]{2,20}$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateEmail(email: string): string {
  const normalized = normalizeEmail(email);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!normalized || normalized.length > EMAIL_MAX_LENGTH || !emailPattern.test(normalized)) {
    throw new ValidationError("유효한 이메일을 입력해주세요");
  }

  return normalized;
}

export function validatePassword(password: string): string {
  if (!PASSWORD_PATTERN.test(password)) {
    throw new ValidationError("비밀번호는 8자 이상이며 영문 대소문자, 숫자, 특수문자를 포함해야 합니다");
  }

  return password;
}

export function validateNickname(nickname: string): string {
  const trimmed = nickname.trim();

  if (
    trimmed.length < NICKNAME_MIN_LENGTH ||
    trimmed.length > NICKNAME_MAX_LENGTH ||
    !NICKNAME_PATTERN.test(trimmed)
  ) {
    throw new ValidationError("닉네임은 2~20자의 영문, 한글, 숫자만 사용할 수 있습니다");
  }

  return trimmed;
}

