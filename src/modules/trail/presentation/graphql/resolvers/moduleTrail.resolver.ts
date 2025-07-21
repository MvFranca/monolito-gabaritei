import { Mutation, Resolver, Args } from "@nestjs/graphql";
import { ModuleTrailPayload } from "../dto/out/moduleTrail.output.graphql";
import { Inject } from "@nestjs/common";
import { AllModulesTrailPort } from "src/modules/trail/application/ports/all-modules-trail.port";
import { TrailByModulePort } from "src/modules/trail/application/ports/trail-by-module.port";
import { ModuleByIdPayload } from "../dto/out/moduleById.output.graphql";
import { ModuleByIdInput } from "../dto/in/moduleById.input.graphql";

@Resolver()
export class ModuleTrailResolver {
  constructor(
    @Inject("AllModulesTrailPort")
    private readonly moduleTrail: AllModulesTrailPort,
    @Inject("TrailByModulePort")
    private readonly trailByModule: TrailByModulePort
  ) {}

  @Mutation(() => [ModuleTrailPayload])
  async getAllModules() {
    const res = await this.moduleTrail.execute();
    return res;
  }

  @Mutation(() => [ModuleByIdPayload])
  async getModuleAndContentsById(@Args("input") input: ModuleByIdInput) {
    console.log('input', input)
    const res = await this.trailByModule.execute(input.moduleId, input.userId);
    return res;
  }
}
