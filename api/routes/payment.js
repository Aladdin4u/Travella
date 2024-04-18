import { Router } from "express";
const router = Router();

import { createCheckoutSession } from "../controllers/payment.js";
import { verifyUser } from "../utils/verifyToken.js";

router.post(
  "/create-checkout-session",
  createCheckoutSession
);

export default router;
