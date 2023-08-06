import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//here we are specifying that this is a schema
@Schema()
export class User extends Document {
  @Prop()
  customId: string;
  @Prop({ required: true })
  data: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
