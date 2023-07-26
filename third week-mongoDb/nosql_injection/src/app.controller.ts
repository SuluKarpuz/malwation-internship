import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Controller()
export class AppController {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  @Post('vulnerable-login')
  async loginVulnerable(
    @Body() credentials: { username: string; password: string },
  ) {
    console.log('vulnerable');
    const { username, password } = credentials;

    const user = await this.userModel
      .findOne({ username: username, password: password })
      .exec();

    if (!user) {
      return { message: 'Invalid credentials. Login unsuccessful.' };
    }

    return { message: 'Login successful. Welcome, ' + user.username + '!' };
  }

  @Post('protected-login')
  async loginProtected(
    @Body() credentials: { username: string; password: string },
  ) {
    console.log('protected');
    const { username, password } = credentials;

    if (!/^[a-zA-Z0-9]+$/.test(username) || !/^[a-zA-Z0-9]+$/.test(password)) {
      throw new Error('Invalid username or password format');
    }

    const user = await this.userModel
      .findOne({ username: { $eq: username }, password: { $eq: password } })
      .exec();
    if (!user) {
      return { message: 'Invalid credentials. Login unsuccessful.' };
    }

    return { message: 'Login successful. Welcome, ' + user.username + '!' };
  }
  @Post('create-user')
  async createUser(@Body() newUser: User) {
    console.log('created');
    return await this.userModel.create(newUser);
  }
}
