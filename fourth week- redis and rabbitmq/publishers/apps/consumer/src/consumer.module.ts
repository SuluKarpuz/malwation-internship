import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { AppModule } from 'apps/publishers/src/app.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/users'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AppModule,
  ],
  controllers: [ConsumerController],
})
export class ConsumerModule {}
