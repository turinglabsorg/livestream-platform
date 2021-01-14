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
require('dotenv').config()

@Injectable()
export class LiveService {

  constructor(
    @InjectModel(Live.name) private liveModel: Model<LiveDocument>) {
  }

  async returnAll(): Promise<Array<Live>> {
    return await this.liveModel.find({ user_hash: process.env.ADMIN_HASH })
  }

  async returnOne(slug): Promise<Live | any> {
    return await this.liveModel.findOne({ slug: slug })
  }

  async createLive(req): Promise<Live | any> {
    if (
      req.body.name !== undefined &&
      req.body.subtitle !== undefined &&
      req.body.price !== undefined &&
      req.body.description !== undefined &&
      req.body.date !== undefined &&
      req.body.hour !== undefined &&
      req.body.slug !== undefined &&
      req.body.image !== undefined &&
      req.body.tags !== undefined &&
      req.body.youtube !== undefined &&
      req.body.twitch !== undefined &&
      req.body.rtmp !== undefined
    ) {
      try {
        let check = await this.liveModel.find({ slug: req.body.slug })
        if (check === null) {
          let newLive = new this.liveModel(req.body);
          newLive.user_hash = await scrypta.hash(req.user.email)
          newLive.save();
          return await this.liveModel.find({ slug: req.body.slug })
        } else {
          return { message: "Event exists.", error: true }
        }
      } catch (e) {
        return e.message
      }
    } else {
      return { message: "New live validation failed.", error: true }
    }
  }

}