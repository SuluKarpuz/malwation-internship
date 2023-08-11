import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field()
  user: string;

  @Field()
  text: string;
}
