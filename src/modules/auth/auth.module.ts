import { Module } from '@nestjs/common';
import { AuthResolver } from './presentation/graphql/resolvers/auth.resolver';
import { CreateUserUseCase } from '../user/application/use-cases/create-user.use-case';
import { SigninUserUseCase } from './application/use-cases/signin-user.use-case';
import { PrismaService } from 'src/core/database/prisma.service';
import { UserPrismaAdapter } from '../user/adapters/prisma/user-prisma.adapter';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule], 
  providers: [
    AuthResolver,
    CreateUserUseCase,
    SigninUserUseCase,
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserPrismaAdapter,
    },
    {
      provide: 'CreateUserInputPort',
      useClass: CreateUserUseCase,
    },
  ],
})
export class AuthModule {}
