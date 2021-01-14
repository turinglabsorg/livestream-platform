
import { Module } from '@nestjs/common';
import { LiveService } from './live.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Live, LiveSchema } from '../schemas/live.schema';
import { LiveController } from './live.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Live.name, schema: LiveSchema }
  ])],
  controllers: [LiveController],
  providers: [LiveService],
  exports: [LiveService],
})

export class LiveModule { }