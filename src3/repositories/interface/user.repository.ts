import { Role, User } from "@prisma/client";

export interface IUserRepository {
  create(data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }): Promise<User>;

  getFindByEmail(email: string): Promise<User | null>;
}