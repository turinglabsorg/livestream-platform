import { Injectable } from '@nestjs/common';
let parse = require("csv-parse")
const fs = require('fs')
const Mandrill = require('./libs/Mandrill')
const mail = new Mandrill.Mail
const axios = require('axios')

@Injectable()
export class AppService {
}