const express = require('express')
const hotelController = require('../controllers/hotel')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const router = express.Router();

//GET
router.get("/location/:city", hotelController.location)
router.get("/list/:start/:end", hotelController.list);
router.get("/rooms/:start/:end", hotelController.rooms);

module.exports = router