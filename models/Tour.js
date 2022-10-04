const mongoose = require('mongoose')

const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    ageRange: {
        type: Number,
        require: true
    },
    duration: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: [String],
    },
    types: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Tour', TourSchema)