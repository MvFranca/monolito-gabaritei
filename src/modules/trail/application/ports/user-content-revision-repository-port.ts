import { UserContentRevisionDTO } from "../dto/user-content-revision-dto";

export interface UserContentRevisionRepositoryPort {
  findByUserAndModule(userId: string, moduleId: string): Promise<UserContentRevisionDTO[]>;
}