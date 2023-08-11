import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class BookInput {
  @Field()
  id: string;
  @Field(() => Int)
  count: string;
}
