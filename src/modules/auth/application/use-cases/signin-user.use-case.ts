import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { generateToken } from 'src/core/utils/token.util';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/user.repository';
import { SigninUserInputPort } from '../ports/signin-user.input-port';
import { SigninDTO } from '../dto/sigin.input-dto';
import { InvalidCredentialsException } from '../execeptions/InvalidCredentialsException';
import { JwtService } from 'src/core/services/jwt/jwt.service';

@Injectable()
export class SigninUserUseCase implements SigninUserInputPort<SigninDTO, string | undefined> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SigninDTO): Promise<string | undefined> {
    
    const user = await this.userRepo.findByEmail(input.email);

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new InvalidCredentialsException();
    }
    
    return this.jwtService.generateToken({id: user.id!, role: user.role});
  }
}
