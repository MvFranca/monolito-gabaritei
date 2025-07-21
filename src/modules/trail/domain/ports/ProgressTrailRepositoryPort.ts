import { UserProgressTrailDTO } from "../../application/dto/user-progress-trail-dto";

export interface ProgressTrailRepositoryPort {
  findById(userId:string, moduleId:string): Promise<UserProgressTrailDTO>;
}
