import { Role } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';

export interface CreateUserInputPort {
  execute(input: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }): Promise<User>;
}
