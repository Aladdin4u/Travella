const mongoose = require('mongoose')

const TourSchema = new mongoose.Schema({
    tripId: {
        type: String,
        require: true
    },
    tripDesc: {
        type: String,
        require: true
    },
    ageRange: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        required: true
    },
    tourDays: {
        type: Number,
        required: true
    },
    tourStart: {
        type: Date,
        required: true
    },
    tourEnd: {
        type: Date,
        required: true
    },
    tourType: {
        type: public,
        enum: [public, private],
        required: true
    },
    tourAcc: {
        type: Array,
        enum: [Accommodation, Guide, Meals, Transport],
        required: true
    }
})

module.exports = mongoose.model('Tour', TourSchema)