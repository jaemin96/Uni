import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
const NICKNAME_PATTERN = /^[A-Za-z0-9가-힣]{2,20}$/;

@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @Field()
  @IsString()
  @Matches(PASSWORD_PATTERN)
  password!: string;

  @Field()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @Matches(NICKNAME_PATTERN)
  nickname!: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @Field()
  @IsString()
  @Matches(PASSWORD_PATTERN)
  password!: string;
}

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string;

  @Field()
  email!: string;

  @Field()
  nickname!: string;

  @Field()
  createdAt!: Date;
}

@ObjectType()
export class AuthPayloadModel {
  @Field()
  accessToken!: string;

  @Field(() => UserModel)
  user!: UserModel;
}

