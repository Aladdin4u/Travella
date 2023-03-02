const User = require("../models/User")
const bcrypt = require("bcryptjs")
const createError = require("../utilis/error")
const jwt = require("jsonwebtoken");

module.exports = { 
  register: async (req,res,next) => {
    try {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.password, salt)
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      })

      await newUser.save()
      res.status(201).send(user)
    } catch (error) {
      next(error)
    }
  }, 
  login: async (req,res,next) => {
    try {
      const user = await User.findOne({username:req.body.username})
      if(!user) return next(createError(404,"User not found!"))

      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
      if(!isPasswordCorrect) return(createError(400, "Wrong password or username!"))
      
      const token = jwk.sign({id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
      const { password, isAdmin, ...otherDetails} = user_doc;
      res.cookie("access token", token, {
        httpOnly: true,
      }).status(201).send({...otherDetails})
    } catch (error) {
      next(error)
    }
  }
}