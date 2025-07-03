
import { CreateUserDTO } from 'src/modules/user/application/dto/create-user.input-dto';
import { Mapper } from 'src/core/mappers/mapper.interface';
import { SignupInput } from '../presentation/graphql/dto/signup.input';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignupMapper implements Mapper<SignupInput, CreateUserDTO> {
  toDTO(input: SignupInput): CreateUserDTO {
    return {
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role,
    };
  }
}
