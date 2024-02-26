const express = require('express')
const router = express.Router();
const roomController = require('../controllers/room');
const { verifyAdmin } = require('../utils/verifyToken');

//CREATE
router.post("/:hotelId", verifyAdmin, roomController.createRoom);

//UPDATE
router.put("/availability/:id", roomController.updateRoomAvailability);
router.put("/book/:id", roomController.bookRoom);
router.put("/:id", verifyAdmin, roomController.updateRoom);
//DELETE
router.delete("/:id/:hotelId", verifyAdmin, roomController.deleteRoom);
//GET

router.get("/:id", roomController.getRoom);
//GET ALL

router.get("/", roomController.getRooms);

module.exports = router