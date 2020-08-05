const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    type: {
        type: String,
        minlength: 4,
        required: "you must provide type of house with minimum length of 4"
    }
})