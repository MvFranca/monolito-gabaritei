import { ModuleTrail } from "../entities/moduleTrail.entity";

export interface ModuleTrailRepositoryPort {
  findAll(): Promise<ModuleTrail[]>;
  findById(id: string): Promise<ModuleTrail | null>;
  create(moduleTrail: ModuleTrail): Promise<ModuleTrail>;
  update(id: string, moduleTrail: ModuleTrail): Promise<ModuleTrail | null>;
  delete(id: string): Promise<void>;
}