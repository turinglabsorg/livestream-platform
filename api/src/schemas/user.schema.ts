import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ required: true })
  level: string; // Can be 'user', 'admin'

  @Prop({ required: false })
  token: string;

  @Prop({ required: false })
  restore_token: string;

  @Prop({ required: false })
  validated: boolean;

  // Logic fields
  @Prop({ required: true })
  is_admin: boolean;

  @Prop({ required: true })
  is_active: boolean;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Generated fields
  @Prop({ required: true })
  hash: string;

  @Prop({ required: true })
  timestamp_registration: number;

  @Prop({ required: false })
  attendee: Array<string>;

}

export const UserSchema = SchemaFactory.createForClass(User);