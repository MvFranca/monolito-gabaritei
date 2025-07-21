import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Button {
    @Field({ nullable: true })
    type?: string;

    @Field({ nullable: true })
    position?: string;

    @Field({ nullable: true })
    quantity?: string;
}

@ObjectType()
export class ContentTrailPayload {
  @Field({ nullable: true })
  id?: string;

  @Field()
  position?: number;

  @Field()
  name?: string;

  @Field()
  description?: string;

  @Field()
  wheight?: number;


  @Field(() => [Button])
  buttons?: Button[];

  @Field()
  done?: boolean;

  @Field({ nullable: true })
  isRevision?: boolean;
}
