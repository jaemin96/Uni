import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AuthResolver } from "./auth.resolver";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [AuthResolver, JwtStrategy],
})
export class AuthModule {}

