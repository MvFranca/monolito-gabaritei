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

    const user = new User(input.name, input.email, input.password, input.role);
    return this.userRepo.create(user);
  }
}
