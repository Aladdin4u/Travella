import express from "express";

const router = express.Router();
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
} from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

//Update
router.put("/:id", verifyUser, updateUser);
//Delete
router.delete("/:id", verifyUser, deleteUser);
//Get
router.get("/:id", verifyUser, getUser);
//GetAll
router.get("/", verifyAdmin, getAllUser);

export default router;
