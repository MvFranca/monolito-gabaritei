import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthResolver } from '../graphql/resolvers/auth.resolver';
import { UserRepositoryImpl } from 'src/repositories/impl/user.repositoryImpl';
import { CreateUserUseCase } from 'src/use-cases/create-user.use-case';

@Module({
  providers: [
    AuthService,
    UserRepositoryImpl,
    CreateUserUseCase,
    AuthResolver,
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {}