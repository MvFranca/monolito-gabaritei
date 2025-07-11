import { SubmoduleTrail } from "./submoduleTraill.entity";

export class ModuleTrail {
  constructor(
      public readonly name: string,
      public readonly description: string,
      public readonly submodules: SubmoduleTrail[] = [],
      public readonly id?: string,
  ) {}
}
