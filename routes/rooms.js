const express = require('express')
const roomController = require('../controllers/room')
const {verifyAdmin} = require('../utils/verifyToken.js')

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, roomController.createRoom);

//UPDATE
router.put("/availability/:id", roomController.updateRoomAvailability);
router.put("/:id", verifyAdmin, roomController.updateRoom);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, roomController.deleteRoom);
//GET

router.get("/:id", roomController.getRoom);
//GET ALL

router.get("/", roomController.getRooms);

module.exports = router