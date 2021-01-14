import { Response, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LiveService } from './live.service';
const Utilities = require('../libs/Utilities')
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
const users = new Utilities.Users

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) { }

  @Get()
  async returnAll() {
    let live = await this.liveService.returnAll()
    return live
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createLive(@Request() req) {
    let live = await this.liveService.createLive(req)
    return live
  }

  @Get(':slug')
  async returnLive(@Request() req) {
    return await this.liveService.returnOne(req.params.slug)
  }
}