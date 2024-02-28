const express = require("express");
const userController = require("../controllers/user");
const {
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");
const router = express.Router();

// router.get("/checkuser/:id", verifyUser, (req,res,next) => {
//   res.send("hello user you are authenticated and can deleted user")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req,res,next) => {
//   res.send("hello Admin  you are authenticated and can deleted user")
// })

//Update
router.put("/:id", verifyUser, userController.updateUser);
//Delete
router.delete("/:id", verifyUser, userController.deleteUser);
//Get
router.get("/:id", verifyUser, userController.getUser);
//GetAll
router.get("/", verifyAdmin, userController.getAllUser);

module.exports = router;
