const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    type: {
        type: String,
        required: "you must provide type of house with minimum length of 4"
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
    },
    price: {
        type: Number,
        required: "Price must be provided."
    },
    state: {
        type: String,
        required: "State must be provided."
    },
    landmark: {
        type: String,
        required: "A close landmark must me given."
    },
    extraComment: {
        type: String
    },
    ownerId: {
        type: String,
        required: "owner's Id is required."
    },
    furnishing: {
        type: String
    },
    bathrooms: {
        type: String
    },
    condition: {
        type: String
    },
    parkingSpace: {
        type: String
    },
    createdAt: {
        type: Date,
        required: "You must provide date"
    }
})

module.exports = mongoose.model("Property", schema)