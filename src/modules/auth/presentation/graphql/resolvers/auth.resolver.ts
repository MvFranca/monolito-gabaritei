import { Resolver, Mutation, Args, } from '@nestjs/graphql';
import { AuthPayload } from '../dto/auth-payload.dto';
import { SignupInput } from '../dto/signup.input';
import { generateToken } from '../../../../../core/utils/token.util';
import { CreateUserInputPort } from 'src/modules/user/application/ports/create-user.input-port';
import { Inject } from '@nestjs/common';
import { SignupMapper } from 'src/modules/auth/mappers/signup.mapper';

@Resolver()
export class AuthResolver {

  constructor(
    @Inject('CreateUserInputPort') 
    private readonly createUserUseCase: CreateUserInputPort,
    private readonly signupMapper: SignupMapper 
  ) {}

  @Mutation(() => AuthPayload)
  async signup(@Args('input') input: SignupInput) {
    const dto = this.signupMapper.toDTO(input);
    const user = await this.createUserUseCase.execute(dto);
    const token = generateToken({id: user.id!, role: user.role});
    return { token };
  }
}
