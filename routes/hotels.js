const express = require('express')
const hotelController = require('../controllers/hotel')
const Hotel = require('../models/Hotel')
const {verifyAdmin} = require('../utils/verifyToken.js')
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, hotelController.createHotel);

//UPDATE
router.put("/:id", verifyAdmin, hotelController.updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, hotelController.deleteHotel);
//GET

router.get("/find/:id", hotelController.getHotel);
//GET ALL

router.get("/", hotelController.getHotels);
router.get("/countByCity", hotelController.countByCity);
router.get("/countByType", hotelController.countByType);
router.get("/room/:id", hotelController.getHotelRooms);

module.exports = router