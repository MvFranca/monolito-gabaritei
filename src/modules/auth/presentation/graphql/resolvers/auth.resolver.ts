import { Resolver, Mutation, Args, Query, } from '@nestjs/graphql';
import { AuthPayload } from '../dto/auth-payload.dto';
import { SignupInput } from '../dto/signup.input';
import { Inject } from '@nestjs/common';
import { SignupMapper } from 'src/modules/auth/mappers/signup.mapper';
import { SignupUserInputPort } from 'src/modules/auth/application/ports/signup-user.input-port';
import { SignupDTO } from 'src/modules/auth/application/dto/sigup.input-dto';

@Resolver()
export class AuthResolver {

  constructor(
    private readonly signupMapper: SignupMapper,
    @Inject('SignupUserInputPort') 
    private readonly signupUserInputPort: SignupUserInputPort<SignupDTO, string>,
  ) {}

  @Mutation(() => AuthPayload)
  async signup(@Args('input') input: SignupInput) {
    const dto = this.signupMapper.toDTO(input);
    const token = await this.signupUserInputPort.execute(dto);
    return { token };
  }

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}
