import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsEmail, MinLength, IsEnum, IsNotEmpty } from 'class-validator';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role enum',
});

@InputType()
export class SignupInput {
  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsNotEmpty()
  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

  @Field()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password!: string;
}
