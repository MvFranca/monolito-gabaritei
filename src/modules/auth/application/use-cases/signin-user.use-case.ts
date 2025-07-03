import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { generateToken } from 'src/core/utils/token.util';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/user.repository';
import { SigninUserInputPort } from '../ports/signin-user.input-port';
import { SigninDTO } from '../dto/sigin.input-dto';

@Injectable()
export class SigninUserUseCase implements SigninUserInputPort<SigninDTO, string | undefined> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepositoryPort
  ) {}

  async execute(input: SigninDTO): Promise<string | undefined> {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new Error('Credenciais inválidas');
    }
    return generateToken({id: user.id!, role: user.role});
  }
}
