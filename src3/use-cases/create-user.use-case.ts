import { Inject, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { IUserRepository } from 'src/repositories/interface/user.repository';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: Role;
}

@Injectable()
export class CreateUserUseCase {
 constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.getFindByEmail(input.email);

    if (existingUser) {
      throw new Error('Email já está em uso.');
    }

    return this.userRepository.create({
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role,
    });
  }
}
