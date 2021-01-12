"use strict";
require('dotenv').config()
var mandrill = require('mandrill-api/mandrill');

module Mandrill {

    export class Mail {

        public async send(email, name, template, html = "", replacement = {}) {
            return new Promise(async response => {
                if (process.env.MANDRILL_APIKEY !== undefined) {
                    const mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_APIKEY);

                    let subject = ""
                    if (html === "") {
                        const mandrill_template = await this.returnTemplate(template);
                        html = mandrill_template['publish_code']
                        subject = mandrill_template['subject']
                    } else {
                        subject = replacement['subject']
                    }
                    if(replacement['name'] === undefined){
                        html = html.replace('*|NAME|*', name)
                    }
                    html = html.replace('*|SUBJECT|*', subject)
                    let keys = Object.keys(replacement)
                    if (keys.length > 0) {
                        for (let k in keys) {
                            html = html.replace("*|" + keys[k].toUpperCase() + "|*", replacement[keys[k]])
                        }
                    }

                    var message = {
                        "html": html,
                        "subject": subject,
                        "from_email": "noreply@livestre.am",
                        "from_name": "Livestream Platform",
                        "to": [{
                            "email": email,
                            "name": name,
                            "type": "to"
                        }],
                        "important": false,
                        "track_opens": null,
                        "track_clicks": null,
                        "auto_text": null,
                        "auto_html": null,
                        "inline_css": null,
                        "url_strip_qs": null,
                        "preserve_recipients": null,
                        "view_content_link": null,
                        "tracking_domain": null,
                        "signing_domain": null,
                        "return_path_domain": null
                    };

                    mandrill_client.messages.send({ "message": message, "async": true }, function (result) {
                        response(result)
                    }, function (e) {
                        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                        response(false)
                    });

                    response(true)
                } else {
                    response(false)
                }
            })
        }

        public async returnTemplate(name) {
            return new Promise(async response => {
                if (process.env.MANDRILL_APIKEY !== undefined) {
                    const mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_APIKEY);
                    mandrill_client.templates.info({ "name": name }, function (result) {
                        response(result)
                    })
                } else {
                    response(false)
                }
            })
        }
    }

}

export = Mandrill;