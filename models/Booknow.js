const mongoose = require('mongoose')

const BooknowSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    fName: {
        type: String,
        require: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        require: true
    },
    Nation: {
        type: String,
        required: true
    },
    cardName: {
        type: String,
        require: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expDate: {
        type: Date,
        require: true
    },
    cvv: {
        type: Number,
        required: true
    },
    country: {
        type: Date,
        require: true
    },
    zipCode: {
        type: Number,
        max: 6,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Booknow', BooknowSchema)