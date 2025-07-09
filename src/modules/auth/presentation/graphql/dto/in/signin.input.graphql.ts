import { Field, InputType, } from "@nestjs/graphql";
import { IsEmail, MinLength, IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export class SigninInput {
    
    @Field()
    @IsNotEmpty()
    @IsEmail({}, { message: 'E-mail inválido' })
    email!: string;

    @Field()
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password!: string;
}