import {
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/ports/user.repository';
import { PrismaService } from '../../../../core/database/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserPrismaAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new ServiceUnavailableException('Erro ao consultar usuário no banco');
    }
  }

  async create(user: User) {
    try {
      return await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Erro de integridade: ${error.code}`);
      }

      throw new InternalServerErrorException('Erro ao criar usuário no banco');
    }
  }
}
