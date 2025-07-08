import { ModuleTrail } from "../domain/entities/moduleTrail.entity";
import { ModuleTrailRepositoryPort } from "../domain/ports/ModuleTrailRepositoryPort";


export class ModuleTrailAdapter implements ModuleTrailRepositoryPort {
  constructor(private readonly moduleTrailRepository: ModuleTrailRepositoryPort) {}

  async findAll(): Promise<ModuleTrail[]> {
    return this.moduleTrailRepository.findAll();
  }

  async findById(id: string): Promise<ModuleTrail | null> {
    return this.moduleTrailRepository.findById(id);
  }

  async create(moduleTrail: ModuleTrail): Promise<ModuleTrail> {
    return this.moduleTrailRepository.create(moduleTrail);
  }

  async update(id: string, moduleTrail: ModuleTrail): Promise<ModuleTrail | null> {
    return this.moduleTrailRepository.update(id, moduleTrail);
  }

  async delete(id: string): Promise<void> {
    return this.moduleTrailRepository.delete(id);
  }
}