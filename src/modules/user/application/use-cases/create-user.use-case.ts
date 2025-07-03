import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/ports/user.repository';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserInputPort } from '../ports/create-user.input-port';
import { CreateUserDTO } from '../dto/create-user.input-dto';

@Injectable()
export class CreateUserUseCase implements CreateUserInputPort {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepositoryPort
  ) {}

  async execute(input: CreateUserDTO): Promise<User> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) throw new Error('Email já está em uso.');

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = new User(input.name, input.email, hashedPassword, input.role);
    return this.userRepo.create(user);
  }
}
