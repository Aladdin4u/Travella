import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    room: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
    },
    checkin_date: { type: Date, require: true },
    checkout_date: { type: Date, require: true },
    maxPeople: { type: Number, required: true },
    price: { type: Number, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
