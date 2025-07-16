import { ModuleTrail } from "../../domain/entities/moduleTrail.entity";

export interface AllModulesTrailPort {
    execute(): Promise<ModuleTrail[] | null>;
}