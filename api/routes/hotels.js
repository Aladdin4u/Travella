import express from "express";

const router = express.Router();

import {
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotel,
  getHotelRooms,
  getCountByCity,
  getCountByType,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

//Create
router.post("/", verifyAdmin, createHotel);
//Update
router.put("/:id", verifyAdmin, updateHotel);
//Delete
router.delete("/:id", verifyAdmin, deleteHotel);
//Get
router.get("/find/:id", getHotel);
//GetAll
router.get("/", getAllHotel);
router.get("/countByCity", getCountByCity);
router.get("/countByType", getCountByType);
router.get("/room/:id", getHotelRooms);

export default router;
