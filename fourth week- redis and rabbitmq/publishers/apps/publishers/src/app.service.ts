import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @Inject('ID_SERVICE') private readonly client: ClientProxy,
    @InjectModel('User') private userModel: Model<User>,
    @InjectRedis() private readonly redis: Redis,
  ) {
    //
  }

  //the first one create endpoint whicjh emits a message to rabbitMq
  async create(): Promise<string> {
    const id = uuidv4();
    //buradaki user data kısmı urlde de alınabilir
    const user_data = 'user_data';
    const dummyData = await this.userModel.create({
      customId: id,
      data: 'dummy_data',
    });
    console.log('Dummy data successfully created:', dummyData);

    await this.client.emit('ID_CREATED', { id, user_data });
    return id;
  }

  //the second one which we use to test the queue listener by giving requests
  async polling(id: string) {
    const cachedData = await this.redis.get(id);

    if (cachedData) {
      console.log(`Found data with ID ${id} in Redis`);
      const parsedObject = JSON.parse(cachedData);
      return parsedObject.data;
    } else {
      console.log(`Data with ID ${id} not found in Redis`);
      const data = await this.userModel.findOne({ customId: id });

      if (data) {
        console.log(`Found data with ID ${id} in MongoDB`);
        return data.data;
      } else {
        console.log(`Data with ID ${id} not found in MongoDB`);
        return 'null';
      }
    }
  }
}
