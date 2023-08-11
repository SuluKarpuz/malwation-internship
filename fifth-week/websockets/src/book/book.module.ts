import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { PubsubModule } from '../pubsub/pubsub.module';

@Module({
  imports: [PubsubModule],
  providers: [BookResolver],
})
export class BookModule {}
