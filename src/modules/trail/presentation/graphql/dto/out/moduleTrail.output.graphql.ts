import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModuleTrailPayload {
  @Field()
  name?: string;

  @Field()
  description?: string;

  @Field()
  id?: string;
}
