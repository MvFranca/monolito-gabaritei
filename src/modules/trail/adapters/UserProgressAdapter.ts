import { PrismaService } from "src/core/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { ProgressTrailRepositoryPort } from "../domain/ports/ProgressTrailRepositoryPort";
import { UserProgressTrailDTO } from "../application/dto/user-progress-trail-dto";

@Injectable()
export class UserProgressAdapter
  implements ProgressTrailRepositoryPort
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(
    userId: string,
    moduleId:string,
  ): Promise<UserProgressTrailDTO> {
    const result = await this.prisma.userContentProgress.findFirst({
      where: {
        userId,
        moduleId
      },
      select: {
        id: true,
        moduleId: true,
        contentId: true,
        currentPosition: true,
      }
    });

    if (!result) {
      throw new Error(`Progresso do usuário ${userId} para o módulo ${moduleId} não encontrado`);
    }

    return result;
  }
}
