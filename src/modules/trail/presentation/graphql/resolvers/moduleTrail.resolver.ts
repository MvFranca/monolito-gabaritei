import { Mutation, Resolver } from "@nestjs/graphql";
import { ModuleTrailPayload } from "../dto/out/moduleTrail.output.graphql";
import { Inject } from "@nestjs/common";
import { AllModulesTrailPort } from "src/modules/trail/application/ports/all-modules-trail.port";

@Resolver()
export class ModuleTrailResolver {

    constructor(
    @Inject('AllModulesTrailPort') 
    private readonly moduleTrail: AllModulesTrailPort,
    ) {}
    
    @Mutation(() => [ModuleTrailPayload])
    async getAllModules(){
        const res = await this.moduleTrail.execute()
        return res
    }

}