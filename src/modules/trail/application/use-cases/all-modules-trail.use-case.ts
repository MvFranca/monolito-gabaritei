import { Inject, Injectable } from "@nestjs/common";
import { ModuleTrail } from "../../domain/entities/moduleTrail.entity";
import { ModuleTrailRepositoryPort } from "../../domain/ports/ModuleTrailRepositoryPort";
import { AllModulesTrailPort } from "../ports/all-modules-trail.port";

@Injectable()
export class AllModulesTrailUseCase implements AllModulesTrailPort 
{
  constructor(
    @Inject("ModuleTrailRepositoryPort")
    private readonly moduleTrail: ModuleTrailRepositoryPort,
  ) {}

  async execute(): Promise<ModuleTrail[] | null> {
    const modules = await this.moduleTrail.findAll();
    if(modules?.length == 0) {
      throw Error("Nenhum módulo encontrado")
    }

    return modules;
  }
}
