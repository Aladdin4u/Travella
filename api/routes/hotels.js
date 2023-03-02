const express = require('express');
const hotelController = require('../controllers/hotel');
const { verifyAdmin } = require('../utilis/verifyToken');
const router = express.Router();

//Create
router.post("/", verifyAdmin, hotelController.createHotel)
//Update
router.update("/:id", verifyAdmin, hotelController.updateHotel)
//Delete
router.delete("/:id", verifyAdmin, hotelController.deleteHotel)
//Get
router.get("/:id", hotelController.getHotel)
//GetAll
router.get("/", hotelController.getAllHotel)

module.exports = router