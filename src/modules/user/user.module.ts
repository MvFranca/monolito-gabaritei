import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';

import { UserPrismaAdapter } from './adapters/prisma/user-prisma.adapter';
import { PrismaModule } from '../../core/database/database.module'; 

@Module({
  imports: [PrismaModule], 

  providers: [
    {
      provide: 'CreateUserInputPort',
      useClass: CreateUserUseCase,
    },
    {
      provide: 'UserRepository',
      useClass: UserPrismaAdapter,
    },
    CreateUserUseCase,
  ],

  exports: ['CreateUserInputPort', ],
})
export class UserModule {}
