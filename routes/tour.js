const express = require('express')
const router = express.Router()
const tourController = require('../controllers/tour') 
const { ensureAuth } = require('../middleware/auth')

//Create
router.post('/createTour', tourController.createTour)
// update
router.put('/updateTour/:id', tourController.updateTour)
//Delete
router.put('/deleteTour/:id', tourController.deleteTour)
//get
router.get('/:id', tourController.getTour)

//get all
router.get('/', tourController.getTours)

module.exports = router