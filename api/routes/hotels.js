const express = require("express");
const hotelController = require("../controllers/hotel");
const { verifyAdmin } = require("../utilis/verifyToken");
const router = express.Router();

//Create
router.post("/", hotelController.createHotel);
//Update
router.put("/:id", verifyAdmin, hotelController.updateHotel);
//Delete
router.delete("/:id", verifyAdmin, hotelController.deleteHotel);
//Get
router.get("find/:id", hotelController.getHotel);
//GetAll
router.get("/", hotelController.getAllHotel);
router.get("/countByCity", hotelController.getCountByCity);
router.get("/countByType", hotelController.getCountByType);
router.get("/room/:id", hotelController.getHotelRooms);

module.exports = router;
