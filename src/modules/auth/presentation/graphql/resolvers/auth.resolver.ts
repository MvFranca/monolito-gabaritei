import { Resolver, Mutation, Args, Query, } from '@nestjs/graphql';
import { AuthPayload } from '../dto/auth-payload.dto';
import { SignupInput } from '../dto/signup.input.graphql';
import { Inject } from '@nestjs/common';
import { SignupMapper } from 'src/modules/auth/mappers/signup.mapper';
import { SignupUserInputPort } from 'src/modules/auth/application/ports/signup-user.input-port';
import { SignupDTO } from 'src/modules/auth/application/dto/sigup.input-dto';
import { SigninInput } from '../dto/signin.input.graphql';
import { SigninMapper } from 'src/modules/auth/mappers/signin.mapper';
import { SigninUserInputPort } from 'src/modules/auth/application/ports/signin-user.input-port';
import { SigninDTO } from 'src/modules/auth/application/dto/sigin.input-dto';

@Resolver()
export class AuthResolver {

  constructor(
    private readonly signupMapper: SignupMapper,
    private readonly SigninMapper: SigninMapper,
    @Inject('SignupUserInputPort') 
    private readonly signupUserInputPort: SignupUserInputPort<SignupDTO, string>,
    @Inject('SigninUserInputPort') 
    private readonly signinUserInputPort: SigninUserInputPort<SigninDTO, string>,
  ) {}

  @Mutation(() => AuthPayload)
  async signup(@Args('input') input: SignupInput) {
    const dto = await this.signupMapper.transform(input);
    const token = await this.signupUserInputPort.execute(dto);
    return { token, message: 'Cadastro realizado com sucesso' };
  }

  @Mutation(() => AuthPayload)
  async signin(@Args('input') input: SigninInput) {

    const dto = await this.SigninMapper.transform(input);
    const token = await this.signinUserInputPort.execute(dto);
    return { token, message: 'Login realizado com sucesso' };

  }

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}
