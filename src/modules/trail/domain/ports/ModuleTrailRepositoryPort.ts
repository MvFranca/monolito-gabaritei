import { ModuleTrail } from "../entities/moduleTrail.entity";

export interface ModuleTrailRepositoryPort {
  findAll(): Promise<ModuleTrail[] | null>;
  findById(id: string): Promise<ModuleTrail | null>;
}