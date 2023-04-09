const express = require("express");
const router = express.Router();
const authController = require("../controllers/payment");
const { verifyUser } = require("../utils/verifyToken");

router.post(
  "/create-checkout-session",
  authController.createCheckoutSession
);

module.exports = router;
