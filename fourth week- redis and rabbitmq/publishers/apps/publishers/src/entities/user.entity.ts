import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() // This decorator defines it as a GraphQL object type
export class UserType {
  @Field() // This decorator marks it as a field in the GraphQL type
  customId: string;

  @Field() // This decorator marks it as a field in the GraphQL type
  data: string;
}
