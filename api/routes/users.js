const express = require('express');
const userController = require('../controllers/user');
const { verifyToken, verifyUser, verifyAdmin } = require('../utilis/verifyToken');
const router = express.Router();

// router.get("/checkauthenticated", verifyToken, (req,res,next)) 
//Create
router.post("/", userController.createUser)
//Update
router.update("/:id", verifyUser, userController.updateUser)
//Delete
router.delete("/:id", verifyUser, userController.deleteUser)
//Get
router.get("/:id", verifyUser, userController.getUser)
//GetAll
router.get("/", verifyAdmin, userController.getAllUser)

module.exports = router