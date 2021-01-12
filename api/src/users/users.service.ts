import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
const Utilities = require('../libs/Utilities')
const Mandrill = require('../libs/Mandrill')
const ScryptaCore = require('@scrypta/core')
let scrypta = new ScryptaCore
const logger = new Utilities.Logger
const users = new Utilities.Users
const mail = new Mandrill.Mail
const mailchimp = require("@mailchimp/mailchimp_marketing")
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_APIKEY,
  server: "us18"
});

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  /**
   * User functions
   */

  create(req): Promise<Object> {
    return new Promise(async response => {
      let checkExist = await this.userModel.findOne({ email: req.email }).exec()
      if (checkExist === null) {
        try {
          const newUser = new this.userModel(req);
          newUser.level = 'user'
          newUser.password = await scrypta.hash(req.password)
          newUser.hash = await scrypta.hash(req.email)
          newUser.is_admin = false
          newUser.is_active = true
          newUser.validated = false
          newUser.timestamp_registration = new Date().getTime()
          newUser.token = await scrypta.hash(newUser.timestamp_registration.toString())

          await newUser.save().catch(e => {
            response({ message: e._message, error: true, details: e })
          })

          // Sending e-mail
          mail.send(req.email, newUser.firstname + ' ' + newUser.lastname, 'welcome', "", { token: "https://" + process.env.PLATFORM_URL + "users/validate/" + newUser.token })

          logger.log('USER CREATED SUCCESSFULLY', 'users', newUser.hash, 'CREATED')
          response({ message: 'User successfully created', error: false })
        } catch (e) {
          console.log(e)
          response({ message: 'Error while creating user', error: true })
        }
      } else {
        response({ message: 'User exists', error: true })
      }
    })
  }

  async validateToken(req): Promise<any> {
    let toedit = await this.userModel.findOne({ token: req.params.token }).exec()
    if (toedit !== undefined) {
      toedit.validated = true
      await toedit.save()
      return true
    } else {
      return false
    }
  }

  async askRestore(email): Promise<any> {
    let toRestore = await this.userModel.findOne({ email: email }).exec()
    if (toRestore !== null && toRestore.hash !== undefined) {
      let token = await scrypta.hash(new Date().getTime().toString())
      toRestore.restore_token = token
      mail.send(toRestore.email, toRestore.firstname + ' ' + toRestore.lastname, "welcome-password-reset", "", { restore_token: token, name: toRestore.firstname })
      await toRestore.save()
      return Promise.resolve({ success: true })
    } else {
      return Promise.resolve({ success: true })
    }
  }

  async restorePassword(req): Promise<any> {
    let toRestore = await this.userModel.findOne({ restore_token: req.body.token }).exec()
    if (toRestore !== null && toRestore.hash !== undefined) {
      toRestore.restore_token = null
      toRestore.password = await scrypta.hash(req.body.password)
      await toRestore.save()
      return Promise.resolve({ success: true })
    } else {
      return Promise.resolve({ success: false })
    }
  }

  async update(req): Promise<User | any> {
    if (req.user.email) {
      let toedit = await this.userModel.findOne({ email: req.user.email }).exec()
      let readonly = ["password", "hash", "level", "is_admin", "is_active", "role", "timestamp_registration", "_id"]
      for (let k in toedit) {
        if (req.body[k] !== undefined && readonly.indexOf(k) === -1) {
          toedit[k] = req.body[k]
        }
      }
      await toedit.save()
      logger.log('USER EDITED SUCCESSFULLY', 'users', toedit.hash, 'EDIT')
      let updated = await this.userModel.findOne({ email: req.user.email }).exec()
      let result = users.parse(updated)
      return result
    } else {
      return { message: 'Unauthorized', error: true }
    }
  }

  async changePassword(req): Promise<User | any> {
    if (req.user.email && req.body.old !== undefined && req.body.password !== undefined) {
      let toedit = await this.userModel.findOne({ email: req.user.email }).exec()
      let oldhash = await scrypta.hash(req.body.old)
      if (oldhash === toedit.password) {
        toedit.password = await scrypta.hash(req.body.password)
        await toedit.save()
        logger.log('PASSWORD CHANGED SUCCESSFULLY', 'users', toedit.hash, 'CHANGEPASSWORD')
        return { message: 'Password changed correctly', error: false }
      } else {
        return { message: 'Password is invalid, retry', error: true }
      }
    } else {
      return { message: 'Unauthorized', error: true }
    }
  }

  async deleteUser(req): Promise<User | any> {
    if (req.user.email) {
      let todelete = await this.userModel.findOne({ email: req.user.email }).exec()
      if (todelete !== null) {
        await this.userModel.deleteOne({ email: req.user.email }).exec()
        logger.log('USER DELETED SUCCESSFULLY', 'users', todelete.hash, 'DELETED')
        return { message: 'Bye bye', error: false }
      } else {
        return { message: 'Can\'t find user', error: true }
      }
    } else {
      return { message: 'Unauthorized', error: true }
    }
  }

  async details(email): Promise<User | any> {
    if (email) {
      let user = await this.userModel.findOne({ email: email })
      if (user !== null) {
        return user
      } else {
        return { message: 'Unauthorized', error: true }
      }
    } else {
      return { message: 'Unauthorized', error: true }
    }
  }
  
  /**
   * Admin functions
   */

  async find(req): Promise<User | any> {
    if (req.email) {
      let user = await users.details(req.email)
      if (user.level !== undefined && user.level === 'admin') {
        let user = await this.userModel.findOne({ email: req.email }).exec();
        return user
      } else {
        return { message: 'Unauthorized', error: true }
      }
    } else {
      return { message: 'Unauthorized', error: true }
    }
  }

  async edit(req): Promise<User | any> {
    if (req.user.email) {
      let user = await users.details(req.user.email)
      if (user.level !== undefined && user.level === 'admin') {
        if (req.body.email !== undefined) {
          let toedit = await this.userModel.findOne({ email: req.body.email }).exec()
          for (let k in toedit) {
            if (req.body[k] !== undefined) {
              toedit[k] = req.body[k]
            }
          }
          await toedit.save()
          logger.log('USER EDITED SUCCESSFULLY', 'users', toedit.hash, 'EDIT')
          let updated = await this.userModel.findOne({ email: req.body.email }).exec()
          return updated
        } else {
          return { message: 'No e-mail provided', error: true }
        }
      } else {
        return { message: 'Unauthorized', error: true }
      }
    } else {
      return { message: 'Unauthorized', error: true }
    }
  }

  async findAll(req): Promise<any> {
    if (req.email) {
      let user = await users.details(req.email)
      if (user.level !== undefined && user.level === 'admin') {
        return await this.userModel.find().exec();
      } else {
        return { message: 'Unauthorized', error: true }
      }
    } else {
      return { message: 'Unauthorized', error: true }
    }
  }
}