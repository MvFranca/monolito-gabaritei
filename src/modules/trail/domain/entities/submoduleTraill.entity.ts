import { ContentTrail } from "./contentTrail.entity";

export class SubmoduleTrail {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly contents: ContentTrail[] = [],
    public readonly id?: string,
    public readonly moduleId?: string,
  ) {}
}

