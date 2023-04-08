const express = require("express");
const router = express.Router();
const authController = require("../controllers/payment");
const { verifyUser } = require("../utils/verifyToken");

router.post(
  "/create-checkout-session", verifyUser,
  authController.createCheckoutSession
);

module.exports = router;
