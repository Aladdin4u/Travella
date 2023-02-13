const Room = require('../models/Room')

module.exports = {
  createRoom: async (req, res) => {
    try {
        await Comment.create({
            title: req.body.comment,
            price: req.boody.price,
            maxPeople: req.body.maxPeople,
            checkIn: req.body.checkin,
            checkOut: req.body.checkout,
            desc: req.body.desc,
            hotelId: req.params.id,
            userId: req.user.id
        });
      console.log("Rooms has been booked");
      res.redirect(`/Hotels/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updateRoom: async (req, res) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (err) {
       console.log(err);
    }
  },
  updateRoomAvailability: async (req, res) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
       console.log(err);
    }
  },
  deleteRoom: async (req, res) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
         console.log(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
       console.log(err);
    }
  },
  getRoom: async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
       console.log(err);
    }
  },
  getRooms: async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
       console.log(err);
    }
  }
}
