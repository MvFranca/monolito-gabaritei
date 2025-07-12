import { Module } from "@nestjs/common";
import { ModuleTrailAdapter } from "./adapters/ModuleTrailAdapter";
import { AllModulesTrailUseCase } from "./application/use-cases/all-modules-trail.use-case";
import { PrismaService } from "src/core/database/prisma.service";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { ModuleTrailResolver } from "./presentation/graphql/resolvers/moduleTrail.resolver";
import { PrismaModule } from "src/core/database/database.module";

@Module({
  imports: [UserModule, AuthModule, PrismaModule],
  providers: [
    ModuleTrailResolver,
    ModuleTrailAdapter,
    AllModulesTrailUseCase,
    PrismaService,
    {
      provide: "ModuleTrailRepositoryPort",
      useClass: ModuleTrailAdapter,
    },
    {
      provide: "AllModulesTrailPort",
      useClass: AllModulesTrailUseCase,
    },
  ],
})
export class ModuleTrailModule {}
