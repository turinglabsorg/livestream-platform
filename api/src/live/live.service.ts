import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Live, LiveDocument } from '../schemas/live.schema';
const Utilities = require('../libs/Utilities')
const Mandrill = require('../libs/Mandrill')
const ScryptaCore = require('@scrypta/core')
let scrypta = new ScryptaCore
const logger = new Utilities.Logger
const mail = new Mandrill.Mail

@Injectable()
export class LiveService {

  constructor(
    @InjectModel(Live.name) private liveModel: Model<LiveDocument>) {
  }

  async returnAll(): Promise<Live | any> {
    return await this.liveModel.find()
  }

  async returnOne(slug): Promise<Live | any> {
    return await this.liveModel.find({ slug: slug })
  }

}