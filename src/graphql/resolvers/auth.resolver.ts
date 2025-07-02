import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Role } from "@prisma/client";
import { AuthService } from '../../services/auth.service';
import { AuthPayload } from 'src/dto/auth-payload.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload, { nullable: true })
  async signup(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('role') role: Role,
  ) {
    const token = await this.authService.signup(name, email, password, role);
    return token ? { token } : null;
  }

  @Mutation(() => AuthPayload, { nullable: true })
  async signin(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const token = await this.authService.signin(email, password);
    return token ? { token } : null;
  }
}


@Resolver()
export class AppResolver {
  @Query(() => String)
  _empty(): string {
    return 'Hello world';
  }
}