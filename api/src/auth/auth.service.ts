import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const ScryptaCore = require('@scrypta/core')
let scrypta = new ScryptaCore
const Utilities = require('../libs/Utilities')
const users = new Utilities.Users
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await users.details(email)
    let hashed = await scrypta.hash(pass)
    if (user && hashed === user.password) {
      const { password, ...result } = user;
      return result;
    }else{
      return false;
    }
  }

  async login(user: any) {
    let validated = await this.validateUser(user.email, user.password)
    if(validated !== false){
      const payload = { email: user.email, level: user.level };
      return {
        access_token: this.jwtService.sign(payload),
        user: validated,
        error: false
      };
    }else{
      return {
        message: 'Not authorized',
        error: true
      }
    }
  }
}