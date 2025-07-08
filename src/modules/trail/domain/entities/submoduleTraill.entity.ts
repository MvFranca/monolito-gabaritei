import { ContentTrail } from "./contentTrail.entity";

export class SubmoduleTrail {
  constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly contents: ContentTrail[] = [],
        public readonly id?: string,
  ) {}
}
