
import { Injectable } from '@nestjs/common';
import { BaseMapper } from 'src/core/mappers/base.mapper';
import { SigninInput } from '../presentation/graphql/dto/signin.input.graphql';
import { SigninDTO } from '../application/dto/sigin.input-dto';

@Injectable()
export class SigninMapper extends BaseMapper<SigninInput, SigninDTO>{
  toDTO(input: SigninInput): SigninDTO {
    return {
      email: input.email,
      password: input.password,
    };
  }
}
