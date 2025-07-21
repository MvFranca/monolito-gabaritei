import { SubmoduleTrail } from "../../domain/entities/submoduleTraill.entity";
import { TrailByModuleDTO } from "../dto/trail-by-module.dto";

export interface TrailByModulePort {
    execute(submoduleId: string, userId:string): Promise<TrailByModuleDTO>;
}