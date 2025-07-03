import { Resolver, Mutation, Args, } from '@nestjs/graphql';
import { AuthPayload } from '../dto/auth-payload.dto';
import { SignupInput } from '../dto/signup.input';
import { generateToken } from '../../../../../core/utils/token.util';
import { CreateUserInputPort } from 'src/modules/user/application/ports/create-user.input-port';
import { Inject } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject('CreateUserInputPort') 
    private readonly createUserUseCase: CreateUserInputPort
  ) {}

  @Mutation(() => AuthPayload)
  async signup(@Args('input') input: SignupInput) {
    const user = await this.createUserUseCase.execute(input);
    const token = generateToken(user);
    return { token };
  }
}
