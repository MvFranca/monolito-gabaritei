import { Mutation, Resolver } from "@nestjs/graphql";

@Resolver()
export class ModuleTrailResolver {
    

    @Mutation(() => String)
    async getAllModules(){

    }

    @Mutation(() => String)
    async getModuleById(id: string){

    }
}