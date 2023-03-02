const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

module.exports = {
  createHotel: async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    
    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (error) {
      next(error);
    }
  },
  updateHotel: async (req, res, next) => {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true })
      res.status(200).json(updatedHotel);
    } catch (error) {
      next(error);
    }
  },
  deleteHotel: async (req, res, next) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("Hotel has been deleted");
    } catch (error) {
      next(error);
    }
  },
  getHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (error) {
      next(error);
    }
  },
  getAllHotel: async (req, res, next, next) => {
    try {
      const hotels = await Hotel.find();
      res.status(200).json(hotels);
    } catch (error) {
      next(error);
    }
  },
};
 