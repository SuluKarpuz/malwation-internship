import { Module } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';
import { PubsubModule } from '../pubsub/pubsub.module';

@Module({
  imports: [PubsubModule],
  providers: [ChatResolver],
})
export class ChatModule {}
