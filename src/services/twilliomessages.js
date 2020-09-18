const { response } = require('express')

const {TWILLIO_AUTH_TOKEN, TWILLIO_ACCOUNT_SID} = process.env
const client = require('twilio')(TWILLIO_ACCOUNT_SID, TWILLIO_AUTH_TOKEN)

module.exports.sms = (recipientNumber, message) => {
    client.messages.create({
        to: Number(recipientNumber),
        from: +13605251478,
        body: message
    }).then(response => console.log(response.sid))
}