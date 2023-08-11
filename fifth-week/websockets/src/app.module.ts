import { Module } from '@nestjs/common';
import { PubsubModule } from './pubsub/pubsub.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChatModule } from './chat/chat.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/schema.gql',
      subscriptions: {
        'graphql-ws': true,
      },
    }),

    PubsubModule,
    ChatModule,
    BookModule,
  ],
})
export class AppModule {}
