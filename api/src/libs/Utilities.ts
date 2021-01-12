"use strict";
import express = require("express")
var formidable = require('formidable')
const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config()
const Schema = mongoose.Schema;
const MongoClient = require('mongodb').MongoClient;

module Utilities {

    export class Parser {

        public async body(req: express.Request) {
            return new Promise(response => {
                var jsonEmpty = true
                for (var key in req.body) {
                    if (key !== undefined) {
                        jsonEmpty = false
                    }
                }
                if (jsonEmpty === true) {
                    var form = new formidable.IncomingForm()
                    form.maxFileSize = global['limit'] * 1024 * 1024
                    form.maxFieldsSize = global['limit'] * 1024 * 1024
                    form.parse(req, function (err, fields, files) {
                        if (err) {
                            console.log(err)
                        }
                        response({
                            body: fields,
                            files: files
                        })
                    })
                } else {
                    response({
                        body: req.body,
                        files: []
                    })
                }
            })
        }

        public timeToDate(time) {
            var date = new Date(time)
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var day = date.getDate()
            var hours = date.getHours()
            var minutes = "0" + date.getMinutes()
            var seconds = "0" + date.getSeconds()
            var formattedTime = day + '/' + month + '/' + year + ' at ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
            return formattedTime
        }
    }

    export class Logger {
        Log: any
        constructor() {
            this.Log = new Schema({
                log: { type: String },
                datatype: { type: String },
                identifier: { type: String },
                action: { type: String },
                timestamp: { type: Number }
            });
        }
        public async log(what, datatype = '', identifier = '', action = '', type = 'log') {
            const path = './logs/' + type

            try {
                if (!fs.existsSync('./logs/')) {
                    fs.mkdirSync('./logs/')
                }
                if (!fs.existsSync(path)) {
                    fs.writeFileSync(path, "");
                }
                let date_ob = new Date();
                let date = ("0" + date_ob.getDate()).slice(-2);

                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                let year = date_ob.getFullYear();
                let hours = date_ob.getHours();
                let minutes = date_ob.getMinutes();
                let seconds = date_ob.getSeconds();

                let datetime = '[' + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + ']';
                let stringlog = datetime + ' ' + what

                if (type === 'log' && datatype !== '' && identifier !== '' && action !== '') {
                    await mongoose.connect(process.env.DB_CONNECTION, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false,
                        useCreateIndex: true
                    });
                    const LogModel = mongoose.model('log', this.Log);
                    const log = new LogModel();
                    log.timestamp = new Date().getTime()
                    log.identifier = identifier
                    log.datatype = datatype
                    log.action = action
                    log.save()
                }
                fs.appendFileSync(path, stringlog + "\n");
            } catch (err) {
                console.error(err)
            }
        }
    }

    export class Users {
        public async details(email) {
            return new Promise(async response => {
                MongoClient.connect(process.env.DB_CONNECTION, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, function (err, client) {
                    const db = client.db()
                    const users = db.collection('users')
                    users.find({ email: email }).toArray(function (err, user) {
                        client.close()
                        response(user[0])
                    })
                });
            })
        }

        public parse(user) {
            let readonly = ["password", "level", "is_admin", "is_active", "timestamp_registration", "_id", "__v"]
            let parsed = {}
            try{
                user = user.toObject()
            }catch(e){
                // Not a Model
            }
            for (let k in user) {
                if (readonly.indexOf(k) === -1) {
                    parsed[k] = user[k]
                }
            }
            if(user.is_admin){
                parsed['is_admin'] = true
            }
            return parsed
        }
    }
}

export = Utilities;