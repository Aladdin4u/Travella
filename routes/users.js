const express = require('express')
const userController = require('../controllers/user')
const { verifyAdmin, verifyToken, verifyUser } = require('../utils/verifyToken')

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put("/:id", verifyUser, userController.updateUser);

//DELETE
router.delete("/:id", verifyUser, userController.deleteUser);

//GET
router.get("/:id", verifyUser, userController.getUser);

//GET ALL
router.get("/", verifyAdmin, userController.getUsers);

module.exports = router