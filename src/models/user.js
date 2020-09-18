const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        required: "you must provide a name"
    },
    email: {
        type: String,
        minlength: 5,
        required: "you must provide an email",
        unique: true,
        validate: {
            validator: (value) =>
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                 value
            ),
        message: "You must provide a valid email",
      },
    },
    phone: {
        type: String,
        unique: true,
        required: "you must provide a phone number"
    },
    verificationDetails: {
        type: Object,
        required: 'You must provide verificatio details.'
    },
    verified: {
        type: Boolean,
        unique: true,
        required: "you must provide a phone number"
    },
    password: {
        type: String,
        minlength: 8,
        required: 'You must provide a password with min length of 8'
    }
})
module.exports = mongoose.model('User', schema)