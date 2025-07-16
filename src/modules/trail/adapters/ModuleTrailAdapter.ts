import { PrismaService } from "src/core/database/prisma.service";
import { ModuleTrail } from "../domain/entities/moduleTrail.entity";
import { ModuleTrailRepositoryPort } from "../domain/ports/ModuleTrailRepositoryPort";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ModuleTrailAdapter implements ModuleTrailRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ModuleTrail[] | null> {
    try {
      const modules = await this.prisma.module.findMany({
        omit: { updatedAt: true, createdAt: true }});
      return modules;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findById(id: string): Promise<ModuleTrail | null> {
    return this.prisma.module.findUnique({
      where: { id },
    });
  }

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
