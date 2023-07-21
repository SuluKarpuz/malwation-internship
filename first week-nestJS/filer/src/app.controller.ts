import { AppService } from './app.service';

import fastify = require('fastify');
import * as fs from 'fs';
import * as pump from 'pump';
import { Controller, Post, Req, Res, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('upload')
  upload(@Req() req, @Res() reply): void {
    const mp = req.multipart(handler, function (err) {
      console.log('upload completed');
      reply.code(200).send();
    });
    function handler(field, file, filename, encoding, mimetype) {
      pump(file, fs.createWriteStream(`${filename}`)); //File path
      console.log('File uploaded successfully');
    }
  }
}
