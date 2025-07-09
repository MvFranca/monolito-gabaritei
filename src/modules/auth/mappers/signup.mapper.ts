
import { CreateUserDTO } from 'src/modules/user/application/dto/create-user.input-dto';
import { SignupInput } from '../presentation/graphql/dto/in/signup.input.graphql';
import { Injectable } from '@nestjs/common';
import { BaseMapper } from 'src/core/mappers/base.mapper';

@Injectable()
export class SignupMapper extends BaseMapper<SignupInput, CreateUserDTO>{
  toDTO(input: SignupInput): CreateUserDTO {
    return {
      name: input.name,
      email: input.email,
      password: input.password,
      role: "USER",
    };
  }
}
