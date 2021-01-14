import { Response, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LiveService } from './live.service';
const Utilities = require('../libs/Utilities')
const users = new Utilities.Users

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) { }

  @Get()
  async returnAll() {
    let user = await this.liveService.returnAll()
    return users.parse(user)
  }

  @Get(':slug')
  async returnLive(@Request() req) {
    let user = await this.liveService.returnOne(req.params.slug)
    return users.parse(user)
  }
}