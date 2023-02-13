const express = require('express')
const roomController = require('../controllers/room')

const router = express.Router();
//CREATE
router.post("/:hotelid",  roomController.createRoom);

//UPDATE
router.put("/availability/:id", roomController.updateRoomAvailability);
router.put("/:id", roomController.updateRoom);
//DELETE
router.delete("/:id/:hotelid", roomController.deleteRoom);
//GET

router.get("/:id", roomController.getRoom);
//GET ALL

router.get("/", roomController.getRooms);

module.exports = router