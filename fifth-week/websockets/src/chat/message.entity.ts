import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MessageType {
  @Field()
  id: string;

  @Field()
  user: string;

  @Field()
  text: string;
}
