import { Field, ObjectType } from '@nestjs/graphql';
import { ContentTrailPayload } from './contentTrail.output.graphql';

@ObjectType()
export class SubmoduleByModulePayload {
  @Field()
  id?: string;

  @Field()
  title?: string;

  @Field()
  description?: string;

  @Field()
  moduleId?: string;

  @Field(() => [ContentTrailPayload])
  contents?: ContentTrailPayload[];
}
