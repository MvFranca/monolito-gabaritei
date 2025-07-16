import { Inject } from "@nestjs/common";
import { SubmoduleTrailRepositoryPort } from "../../domain/ports/SubmoduleTrailRepositoryPort";
import { TrailByModulePort } from "../ports/trail-by-module.port";
import { UserContentRevisionRepositoryPort } from "../ports/user-content-revision-repository-port";

export class TrailByModuleUseCase implements TrailByModulePort {
  constructor(
    @Inject("ModuleTrailRepositoryPort")
    private readonly submoduleTrail: SubmoduleTrailRepositoryPort,
    private readonly contentRevision: UserContentRevisionRepositoryPort
  ) {}

  async execute(moduleId: string, userId: string): Promise<any> {
    const [submodules, revisions] = await Promise.all([
      this.submoduleTrail.findAllWithContent(moduleId),
      this.contentRevision.findByUserAndModule(userId, moduleId),
    ]);

    const totalSubmodules = submodules!.map((submodule) => {
      const newContents = submodule.contents.flatMap((content) => {
        const matchedRevision = revisions.find(
          (rev) => rev.contentId === content.id
        );

        if (matchedRevision) {
          return [
            content,
            {
              ...content,
              name: `Revisão: ${content.name}`,
              position: content.position + 3,
              id: `${content.id}-rev`, 
            },
          ];
        }

        return [content];
      });

      return {
        ...submodule,
        contents: newContents,
      };
    });

    return totalSubmodules;
  }
}
