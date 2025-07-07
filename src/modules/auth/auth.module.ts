import { Module } from "@nestjs/common";
import { AuthResolver } from "./presentation/graphql/resolvers/auth.resolver";
import { CreateUserUseCase } from "../user/application/use-cases/create-user.use-case";
import { SigninUserUseCase } from "./application/use-cases/signin-user.use-case";
import { PrismaService } from "src/core/database/prisma.service";
import { UserPrismaAdapter } from "../user/adapters/prisma/user-prisma.adapter";
import { UserModule } from "../user/user.module";
import { JwtModule } from "src/core/services/jwt/jwt.module";
import { SignupMapper } from "./mappers/signup.mapper";
import { SignupUserUseCase } from "./application/use-cases/signup-user.use-case";
import { SigninMapper } from "./mappers/signin.mapper";

@Module({
  imports: [UserModule, JwtModule],
  providers: [
    AuthResolver,
    CreateUserUseCase,
    SigninUserUseCase,
    SignupUserUseCase,
    PrismaService,
    SignupMapper,
    SigninMapper,
    {
      provide: "UserRepository",
      useClass: UserPrismaAdapter,
    },
    {
      provide: "CreateUserInputPort",
      useClass: CreateUserUseCase,
    },
    {
      provide: "SignupUserInputPort",
      useClass: SignupUserUseCase,
    },
    {
      provide: "SigninUserInputPort",
      useClass: SigninUserUseCase,
    },
  ],
})
export class AuthModule {}
