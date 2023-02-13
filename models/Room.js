const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      maxPeople: {
        type: Number,
        required: true,
      },
      checkIn: {
        type: Date,
        default: Date.now,
        required: true,
      },
      checkOut: {
        type: Date,
        default: Date.now + 1,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Room', RoomSchema)