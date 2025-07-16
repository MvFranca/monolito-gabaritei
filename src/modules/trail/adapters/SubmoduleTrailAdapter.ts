import { PrismaService } from "src/core/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { SubmoduleTrailRepositoryPort } from "../domain/ports/SubmoduleTrailRepositoryPort";
import { SubmoduleTrail } from "../domain/entities/submoduleTraill.entity";

@Injectable()
export class SubmoduleTrailAdapter implements SubmoduleTrailRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<SubmoduleTrail[] | null> {
    try {
      const submodules = await this.prisma.submodule.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          moduleId: true,
        },
      });

      return submodules.map(
        (sub) =>
          new SubmoduleTrail(
            sub.title,
            sub.description,
            [],
            sub.id,
            sub.moduleId
          )
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findAllWithContent(moduleId: string): Promise<SubmoduleTrail[] | null> {
    try {

      //entender como trazer somente os dados necessários de contents, ao invés de todos
      //entender como fazer a relação com o contentId atual do progresso do usuário
      const submodules = await this.prisma.submodule.findMany({
        where: { moduleId },
        include: { contents: true },
        omit: { createdAt: false, updatedAt: false }
      });

      return submodules.map(
        (sub) =>
          new SubmoduleTrail(
            sub.title,
            sub.description,
            sub.contents.map((content: any) => ({
              ...content,
              buttons: Array.isArray(content.buttons) ? content.buttons : []
            })),
            sub.id,
            sub.moduleId
          )
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findById(id: string): Promise<SubmoduleTrail | null> {
    const submodule = await this.prisma.submodule.findUnique({
      where: { id },
    });

    if (!submodule) return null;

    return new SubmoduleTrail(
      submodule.title,
      submodule.description,
      [],
      submodule.id,
      submodule.moduleId
    );
  }
}
