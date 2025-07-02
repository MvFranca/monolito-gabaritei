import { Field, InputType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsEmail, MinLength, IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export class SignupInput {
  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(6)
  password!: string;

  @Field(() => Role)
  @IsEnum(Role)
  role?: Role;
}
