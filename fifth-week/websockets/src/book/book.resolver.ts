import { Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { BookType } from './book.entity';
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => BookType)
export class BookResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}

  private book: BookType = {
    id: uuidv4(),
    count: 0,
  };

  @Query(() => BookType)
  getBook(): BookType {
    return this.book;
  }

  @Mutation(() => BookType)
  incrementStock(): BookType {
    this.book.count += 1;
    this.pubSub.publish('stockUpdate', { stockUpdate: this.book });
    return this.book;
  }

  @Mutation(() => BookType)
  decrementStock(): BookType {
    if (this.book.count > 0) {
      this.book.count -= 1;
      this.pubSub.publish('stockUpdate', { stockUpdate: this.book });
    }
    return this.book;
  }

  @Subscription(() => BookType, {
    resolve: (value) => value.stockUpdate,
  })
  stockUpdate() {
    return this.pubSub.asyncIterator('stockUpdate');
  }
}
