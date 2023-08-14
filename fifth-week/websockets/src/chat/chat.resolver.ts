import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { MessageType } from './message.entity'; // Import your entity here
import { PUB_SUB } from '../pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject } from '@nestjs/common';

enum subscriptionEvents {
  messages = 'messages',
}

@Resolver()
export class ChatResolver {
  constructor(@Inject(PUB_SUB) private readonly pubSub: RedisPubSub) {}
  private messagesArray: MessageType[] = [];

  @Mutation(() => String)
  postMessage(@Args('user') user: string, @Args('text') text: string): string {
    console.log('mutation working');
    const newMessage: MessageType = {
      id: String(this.messagesArray.length + 1),
      user: user,
      text: text,
    };
    this.messagesArray.push(newMessage);
    console.log(newMessage.id);
    this.pubSub.publish(subscriptionEvents.messages, {
      messages: this.messagesArray,
    });
    return newMessage.id;
  }

  @Subscription(() => [MessageType], {
    resolve: (payload) => payload.messages, // here we return the messages array from the payload
  })
  messagesSubscription() {
    console.log('subscription working');
    return this.pubSub.asyncIterator(subscriptionEvents.messages);
  }
}
