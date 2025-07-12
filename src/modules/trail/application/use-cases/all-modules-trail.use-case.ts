import { Inject, Injectable } from "@nestjs/common";
import { AllModulesTrailPort } from "../ports/all-modules-trail.port";
import { ModuleTrail } from "../../domain/entities/moduleTrail.entity";
import { ModuleTrailRepositoryPort } from "../../domain/ports/ModuleTrailRepositoryPort";

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
