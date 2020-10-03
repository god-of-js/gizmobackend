const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    type: {
        type: String,
        minlength: 2,
        required: "you must provide type of house with minimum length of 4"
    },
    reason: {
        type: String,
    },
    location: {
        type: Object,
        required: "Location is a compulsory field."
    },
    size: {
        type: String,
        required: "Size of property is a compulsory field."
    },
    noOfRooms: {
        type: Number
    },
    images: {
        type: Array,
        required: "At least one image of the property must be provided."
    }
})

module.exports = mongoose.model("property", schema)