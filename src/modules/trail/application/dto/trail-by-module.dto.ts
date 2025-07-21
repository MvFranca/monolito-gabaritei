import { ContentTrail } from "../../domain/entities/contentTrail.entity"
import { SubmoduleTrail } from "../../domain/entities/submoduleTraill.entity"

export type submoduleByModule = SubmoduleTrail & {
  contents: (ContentTrail & { done: boolean; isRevision?: boolean })[]
}

export interface TrailByModuleDTO {
    submodules: submoduleByModule[]
}