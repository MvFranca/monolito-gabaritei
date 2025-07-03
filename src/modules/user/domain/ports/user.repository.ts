import { User } from "../entities/user.entity";

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
