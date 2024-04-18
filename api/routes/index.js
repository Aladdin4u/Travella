import express from "express";

const router = express.Router();

import authRoute from "./auth.js";
import usersRoute from "./users.js";
import roomsRoute from "./rooms.js";
import hotelsRoute from "./hotels.js";
import paymentRoute from "./payment.js";

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/rooms", roomsRoute);
router.use("/hotels", hotelsRoute);
router.use("/checkout", paymentRoute);

export default router;
