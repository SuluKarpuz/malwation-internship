import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserType } from './entities/user.entity';
import { AppService } from './app.service';

@Resolver(() => UserType)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  create() {
    return this.appService.create();
  }

  @Query(() => String)
  async polling(@Args('id') id: string) {
    // Your code to fetch the item by ID goes here
    return this.appService.polling(id);
  }
}
