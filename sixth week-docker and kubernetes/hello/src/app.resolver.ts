import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello() {
    console.log('merhaba');
    return 'Hello world';
  }
}
