import { SubmoduleTrail } from "../entities/submoduleTraill.entity";

export interface SubmoduleTrailRepositoryPort {
  findAll(): Promise<SubmoduleTrail[] | null>;
  findAllWithContent(moduleId: string): Promise<SubmoduleTrail[] | null>
  findById(id: string): Promise<SubmoduleTrail | null>;
}