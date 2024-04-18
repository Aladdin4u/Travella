import { Router } from "express";
const router = Router();
import {
  getRoom,
  getRooms,
  bookRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

//CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/book/:id", bookRoom);
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

export default router;
