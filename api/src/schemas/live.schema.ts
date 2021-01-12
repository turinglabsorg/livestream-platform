import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TechnologyDocument = Technology & Document;

@Schema()
export class Technology {

  // Technology definitions
  @Prop({ required: true })
  name: string; 

  @Prop({ required: true })
  shortcut: string; 
  
}

export const TechnologySchema = SchemaFactory.createForClass(Technology);