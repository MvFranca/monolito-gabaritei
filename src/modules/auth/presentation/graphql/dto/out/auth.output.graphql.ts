import { Field, ObjectType } from '@nestjs/graphql';
import { UserGraphQLType } from './user.output.graphql';

@ObjectType()
export class AuthPayload {
  @Field()
  token?: string;
  
  @Field()
  message?: string;

  @Field(() => UserGraphQLType)
  user?: UserGraphQLType;
}
