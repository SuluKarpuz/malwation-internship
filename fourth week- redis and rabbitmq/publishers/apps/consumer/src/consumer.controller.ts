import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Controller()
export class ConsumerController {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  // this will listen the channel
  @EventPattern('ID_CREATED')
  async getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`);

    await new Promise((resolve) => setTimeout(resolve, 60000));

    const newData = await this.userModel.findOneAndUpdate(
      { customId: data.id },
      { $set: { data: data.user_data } },
      { new: true },
    );
    console.log(newData);

    await this.redis.set(newData.customId, JSON.stringify(newData));
    console.log('user data successfully created:');
  }
}
