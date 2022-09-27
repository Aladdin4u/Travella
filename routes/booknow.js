const express = require('express')
const router = express.Router()
const booknowController = require('../controllers/booknow') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, booknowController.getBooknow)

router.post('/createBooknow', booknowController.createBooknow)

router.put('/addBooknow', booknowController.addBooknow)

router.put('/subBooknow', booknowController.subBooknow)

router.delete('/deleteBooknow', booknowController.deleteBooknow)

module.exports = router