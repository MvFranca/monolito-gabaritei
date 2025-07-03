import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

interface SigninDTO {
  email: string;
  password: string;
}

@Injectable()
export class SigninUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository
  ) {}

  async execute(input: SigninDTO): Promise<string> {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new Error('Credenciais inválidas');
    }
    return generateToken(user);
  }
}
