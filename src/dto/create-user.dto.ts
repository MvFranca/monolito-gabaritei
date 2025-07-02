import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsEnum(Role)
  role?: Role;
}
