import { Module } from "@nestjs/common";
import { ModuleTrailAdapter } from "./adapters/ModuleTrailAdapter";
import { AllModulesTrailUseCase } from "./application/use-cases/all-modules-trail.use-case";
import { PrismaService } from "src/core/database/prisma.service";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { ModuleTrailResolver } from "./presentation/graphql/resolvers/moduleTrail.resolver";
import { PrismaModule } from "src/core/database/database.module";
import { UserContentRevisionAdapter } from "./adapters/UserContentRevisionAdapter";
import { UserProgressAdapter } from "./adapters/UserProgressAdapter";
import { SubmoduleTrailAdapter } from "./adapters/SubmoduleTrailAdapter";
import { TrailByModuleUseCase } from "./application/use-cases/trail-by-module.use-case";

@Module({
  imports: [UserModule, AuthModule, PrismaModule],
  providers: [
    ModuleTrailResolver,
    ModuleTrailAdapter,
    SubmoduleTrailAdapter,
    AllModulesTrailUseCase,
    TrailByModuleUseCase,
    UserContentRevisionAdapter,
    UserProgressAdapter,
    PrismaService,
    {
      provide: "ModuleTrailRepositoryPort",
      useClass: ModuleTrailAdapter,
    },
    {
      provide: "SubmoduleTrailRepositoryPort",
      useClass: SubmoduleTrailAdapter
    },
    {
      provide: "AllModulesTrailPort",
      useClass: AllModulesTrailUseCase,
    },
    {
      provide: "TrailByModulePort",
      useClass: TrailByModuleUseCase
    },
    {
      provide: "UserContentRevisionRepositoryPort",
      useClass: UserContentRevisionAdapter,
    },
    {
      provide: "ProgressTrailRepositoryPort",
      useClass: UserProgressAdapter,
    },
  ],
})
export class ModuleTrailModule {}
