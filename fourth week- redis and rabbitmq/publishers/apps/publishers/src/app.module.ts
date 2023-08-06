import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisModule } from '@nestjs-modules/ioredis';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: 'redis://localhost:6379',
      },
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/users'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),

    ClientsModule.register([
      {
        name: 'ID_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'id_queue',
          queueOptions: {
            //we are stating that the queue will not disappear after a reload
            durable: false,
          },
        },
      },
    ]),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: 'schema.gql',
      graphiql: true,
    }),
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
