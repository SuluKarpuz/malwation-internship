import { Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const PUB_SUB = 'PUB_SUB';

@Module({
  providers: [
    {
      provide: PUB_SUB,
      useFactory: () =>
        new RedisPubSub({
          connection: {
            host: '127.0.0.1', // Replace with your actual Redis host
            port: 6379, // Replace with your actual Redis port
          },
        }),
    },
  ],
  exports: [PUB_SUB],
})
export class PubsubModule {}
