import { PrismaService } from "src/core/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { UserContentRevisionRepositoryPort } from "../application/ports/user-content-revision-repository-port";
import { UserContentRevisionDTO } from "../application/dto/user-content-revision-dto";

@Injectable()
export class UserContentRevisionAdapter
  implements UserContentRevisionRepositoryPort
{
  constructor(private readonly prisma: PrismaService) {}

  findByUserAndModule(
    userId: string,
    moduleId: string
  ): Promise<UserContentRevisionDTO[]> {
    return this.prisma.userContentRevision.findMany({
      where: {
        userId,
        moduleId,
      },

    });
  }
}
