import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/user.repository';
import { SigninUserInputPort } from '../ports/signin-user.input-port';
import { SigninDTO } from '../dto/sigin.input-dto';
import { InvalidCredentialsException } from '../execeptions/InvalidCredentialsException';
import { JwtService } from 'src/core/services/jwt/jwt.service';
import { AuthResponse } from '../../presentation/graphql/types/user.type';


@Injectable()
export class SigninUserUseCase implements SigninUserInputPort<SigninDTO, AuthResponse> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SigninDTO): Promise<AuthResponse> {
    
    const user = await this.userRepo.findByEmail(input.email);

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new InvalidCredentialsException();
    }
    const token = this.jwtService.generateToken({id: user.id!, role: user.role});

    return { token, user: { id: user.id!, name: user.name, email: user.email } };
  }
}
