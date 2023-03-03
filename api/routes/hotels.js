const express = require("express");
const hotelController = require("../controllers/hotel");
const { verifyAdmin } = require("../utilis/verifyToken");
const router = express.Router();

//Create
router.post("/", verifyAdmin, hotelController.createHotel);
//Update
router.put("/:id", verifyAdmin, hotelController.updateHotel);
//Delete
router.delete("/:id", verifyAdmin, hotelController.deleteHotel);
//Get
router.get("find/:id", hotelController.getHotel);
//GetAll
router.get("/", hotelController.getAllHotel);
router.get("/countByCity", hotelController.getCity);
router.get("/countByType", hotelController.getType);
router.get("/", hotelController.getAllHotel);

module.exports = router;
