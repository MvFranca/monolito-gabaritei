import { PrismaClient, Role, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { IUserRepository } from '../interface/user.repository';


export class UserRepositoryImpl implements IUserRepository {
  private prisma = new PrismaClient();

  async create(data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }): Promise<User> {
    console.log('teste  ->', bcrypt);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword, // hashedPassword,
        role: data.role,
      },
    });
  }

  async getFindByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
