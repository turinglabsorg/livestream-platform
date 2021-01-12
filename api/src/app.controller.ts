import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private authService: AuthService, private appService: AppService) { }

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

}