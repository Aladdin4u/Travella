const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homecontroller = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homecontroller.getIndex)
// router.get('/profile', authController.getreserve)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router