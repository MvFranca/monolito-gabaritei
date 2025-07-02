import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client'; 
import { generateToken } from 'src/utils/tokens.utils';
import { CreateUserUseCase } from 'src/use-cases/create-user.use-case';
import { IUserRepository } from 'src/repositories/interface/user.repository';

const GENERIC_ERROR = "Invalid credentials";

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
      private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async signup(
    name: string,
    email: string,
    password: string,
    role: Role
  ): Promise<string> {
    try {
      const user = await this.createUserUseCase.execute({
        name,
        email,
        password,
        role,
      });
      return generateToken(user);
    } catch (error) {
      console.error('Erro no signup:', error);
      throw new Error(GENERIC_ERROR);
    }
  }

  async signin(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getFindByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password!))) {
      throw new Error(GENERIC_ERROR);
    }

    return generateToken(user);
  }
}
