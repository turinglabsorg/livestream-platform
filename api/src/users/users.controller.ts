import { Response, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
const Utilities = require('../libs/Utilities')
const users = new Utilities.Users

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  /**
   * User functions
   */
  @Post()
  async create(@Request() req) {
    let created = await this.usersService.create(req.body);
    return created
  }


  @Get('validate/:token')
  async validateMail(@Request() req, @Response() res) {
    try {
      await this.usersService.validateToken(req)
      res.redirect("https://" + process.env.PLATFORM_URL + "/login")
    } catch (e) {
      res.redirect("https://" + process.env.PLATFORM_URL + "/login")
    }
  }

  @Get('restore/:email')
  async askRestore(@Request() req) {
    let created = await this.usersService.askRestore(req.params.email);
    return created
  }

  @Post('restore')
  async restorePassword(@Request() req) {
    let created = await this.usersService.restorePassword(req);
    return created
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    let user = await this.usersService.details(req.user.email)
    return users.parse(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req): Promise<User[]> {
    let updated = await this.usersService.changePassword(req);
    return updated
  }

}