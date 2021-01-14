import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LiveDocument = Live & Document;

@Schema()
export class Live {

  @Prop({ required: true })
  name: string; 

  @Prop({ required: true })
  subtitle: string; 

  @Prop({ required: true })
  description: string; 

  @Prop({ required: true })
  price: string; 

  @Prop({ required: true })
  date: string; 

  @Prop({ required: true })
  hour: string; 

  @Prop({ required: true })
  slug: string; 

  @Prop({ required: true })
  image: string; 

  @Prop({ required: true })
  tags: string;

  @Prop({ required: true })
  youtube: string; 

  @Prop({ required: true })
  twitch: string; 

  @Prop({ required: true })
  rtmp: string;

  @Prop({ required: true })
  user_hash: string;
  
}

export const LiveSchema = SchemaFactory.createForClass(Live);