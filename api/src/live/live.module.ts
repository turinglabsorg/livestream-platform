
import { Module } from '@nestjs/common';
import { LiveService } from './live.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Live, LiveSchema } from '../schemas/live.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { LiveController } from './live.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Live.name, schema: LiveSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [LiveController],
  providers: [LiveService],
  exports: [LiveService],
})

export class LiveModule { }