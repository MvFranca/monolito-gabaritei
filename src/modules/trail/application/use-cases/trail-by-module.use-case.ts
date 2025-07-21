import { Inject } from "@nestjs/common";
import { SubmoduleTrailRepositoryPort } from "../../domain/ports/SubmoduleTrailRepositoryPort";
import { TrailByModulePort } from "../ports/trail-by-module.port";
import { UserContentRevisionRepositoryPort } from "../ports/user-content-revision-repository-port";
import { ProgressTrailRepositoryPort } from "../../domain/ports/ProgressTrailRepositoryPort";
import { ContentTrail } from "../../domain/entities/contentTrail.entity";
import { TrailByModuleDTO } from "../dto/trail-by-module.dto";

type ContentTrailWithProgress = ContentTrail & {
  done: boolean;
  isRevision?: boolean;
};

export class TrailByModuleUseCase implements TrailByModulePort {
  constructor(
    @Inject("SubmoduleTrailRepositoryPort")
    private readonly submoduleTrail: SubmoduleTrailRepositoryPort,
    @Inject("UserContentRevisionRepositoryPort")
    private readonly contentRevision: UserContentRevisionRepositoryPort,
    @Inject("ProgressTrailRepositoryPort")
    private readonly progressTrail: ProgressTrailRepositoryPort
  ) {}

  async execute(moduleId: string, userId: string): Promise<TrailByModuleDTO> {
    const [submodules, revisions, progress] = await Promise.all([
      this.submoduleTrail.findAllWithContent(moduleId),
      this.contentRevision.findByUserAndModule(userId, moduleId),
      this.progressTrail.findById(userId, moduleId),
    ]);

    const revisionIds = new Set(revisions.map((r) => r.contentId));

    const totalSubmodules = submodules!.map((submodule) => {
      const updatedContents = this.trackReoreding(
        submodule.contents,
        revisionIds,
        progress.currentPosition
      );

      return {
        ...submodule,
        contents: updatedContents,
      };
    });

    return {
      submodules: totalSubmodules,
    };
  }

  private trackReoreding(
    contents: ContentTrail[],
    revisionIds: Set<string>,
    currentPosition: number
  ) {
    const contentsMap = new Map<number, ContentTrailWithProgress>();

    for (const content of contents) {
      contentsMap.set(content.position, {
        ...content,
        done: content.position < currentPosition,
      });
    }

    for (const content of contents) {
      if (!revisionIds.has(content.id!)) continue;

      let revPosition = content.position + 3;

      while (contentsMap.has(revPosition)) {
        const itemToShift = contentsMap.get(revPosition);
        contentsMap.set(revPosition + 1, itemToShift!);
        contentsMap.delete(revPosition);
        revPosition++;
      }

      contentsMap.set(revPosition, {
        ...content,
        id: `${content.id}-rev`,
        name: `Revisão: ${content.name}`,
        isRevision: true,
        done: revPosition < currentPosition,
      });
    }

    return Array.from(contentsMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([position, content]) => ({
        ...content,
        position,
      }));
  }
}
