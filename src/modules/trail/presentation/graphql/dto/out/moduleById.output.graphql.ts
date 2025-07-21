import { Field, ObjectType } from '@nestjs/graphql';
import { SubmoduleByModulePayload } from './submoduleByModule.output.graphql';

@ObjectType()
export class ModuleByIdPayload {
  @Field()
  id?: string;

  @Field()
  title?: string;

  @Field()
  description?: string;

  @Field(() => [SubmoduleByModulePayload])
  submodules?: SubmoduleByModulePayload[];
}