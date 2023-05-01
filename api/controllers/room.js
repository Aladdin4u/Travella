const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

module.exports = {
  createRoom: async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = await Room(req.body);
    try {
      const savedRoom = await newRoom.save();
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (error) {
        next(error);
      }
      res.status(200).json(savedRoom);
    } catch (error) {
      next(error);
    }
  },
  updateRoom: async (req, res, next) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (error) {
      next(error);
    }
  },
  updateRoomAvailability: async (req, res, next) => {
    console.log("date==>", req.body, req.params.id)
    try {
      const rep = await Room.findByIdAndUpdate(
        { "_id": req.params.id },
        {
          $set: req.body
        }
      );
      console.log("rewaa>...>>>",rep)
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      console.log(err);
    }
  },
  deleteRoom: async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (error) {
        next(error);
      }
      res.status(200).json("Room has been deleted.");
    } catch (error) {
      next(error);
    }
  },
  getRoom: async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  },
  getRooms: async (req, res, next) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  },
};
