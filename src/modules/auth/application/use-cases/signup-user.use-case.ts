import { UserRepositoryPort } from "src/modules/user/domain/ports/user.repository";
import { SignupDTO } from "../dto/sigup.input-dto";
import { Inject } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { CreateUserInputPort } from "src/modules/user/application/ports/create-user.input-port";
import { JwtService } from "src/core/services/jwt/jwt.service";
import { SignupUserInputPort } from "../ports/signup-user.input-port";
import { SigninDTO } from "../dto/sigin.input-dto";

export class SignupUserUseCase implements SignupUserInputPort<SigninDTO, string | undefined> 
{
  constructor(
    @Inject("UserRepository")
    private readonly userRepo: UserRepositoryPort,
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

    const [hashedPassword, existingUser] = await Promise.all([
      await bcrypt.hash(password, 10),
      this.userRepo.findByEmail(email)
    ]);

    if (existingUser) throw new Error("Email já está em uso.");

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
