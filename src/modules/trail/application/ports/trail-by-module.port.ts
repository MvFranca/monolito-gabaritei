import { SubmoduleTrail } from "../../domain/entities/submoduleTraill.entity";

export interface TrailByModulePort {
    execute(submoduleId: string, userId:string): Promise<any>;
}