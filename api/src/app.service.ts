import { Injectable } from '@nestjs/common';
let parse = require("csv-parse")
const fs = require('fs')
const Mailgun = require('./libs/Mailgun')
const mail = new Mailgun.Mail
const axios = require('axios')

@Injectable()
export class AppService {
    constructor() { }
}