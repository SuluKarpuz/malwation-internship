import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BookType {
  @Field()
  id: string;

  @Field(() => Int)
  count: number;
}
