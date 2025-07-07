import { SignupDTO } from "../dto/sigup.input-dto";
import { Inject } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { CreateUserInputPort } from "src/modules/user/application/ports/create-user.input-port";
import { JwtService } from "src/core/services/jwt/jwt.service";
import { SignupUserInputPort } from "../ports/signup-user.input-port";

export class SignupUserUseCase implements SignupUserInputPort<SignupDTO, string | undefined> 
{
  constructor(
    @Inject("CreateUserInputPort")
    private readonly createUser: CreateUserInputPort,
    private readonly jwtService: JwtService
  ) {}

  async execute({
    email,
    name,
    password,
    role,
  }: SignupDTO): Promise<string | undefined> {

    const [hashedPassword] = await Promise.all([
      await bcrypt.hash(password, 10),
    ]);
    
    await this.createUser.execute({
      name,
      email,
      password: hashedPassword,
      role,
    });
    
    const token = this.jwtService.sign({
      email,
      name,
      password,
      role,
    });

    return token;
  }
}
