import { PrismaService } from "src/core/database/prisma.service";
import { ModuleTrail } from "../domain/entities/moduleTrail.entity";
import { ModuleTrailRepositoryPort } from "../domain/ports/ModuleTrailRepositoryPort";

export class ModuleTrailAdapter implements ModuleTrailRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ModuleTrail[] | null> {
    try {
      const modules = await this.prisma.module.findMany();
      return modules.map(
        (m: any) =>
          new ModuleTrail(
            m.name,
            m.description,
            [],
            m.id
          )
      );
    }
    catch(err) {
      console.log(err);
      return null;
    }
  }

  // async findById(id: string): Promise<ModuleTrail | null> {
  //   return this.prisma.module.findById(id);
  // }

  // async create(moduleTrail: ModuleTrail): Promise<ModuleTrail> {
  //   return this.prisma.module.create(moduleTrail);
  // }

  // async update(id: string, moduleTrail: ModuleTrail): Promise<ModuleTrail | null> {
  //   return this.prisma.module.update(id, moduleTrail);
  // }

  // async delete(id: string): Promise<void> {
  //   return this.prisma.module.delete(id);
  // }
}