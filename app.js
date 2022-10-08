const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require("method-override");
const flash = require('express-flash')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const usersRoutes = require('./routes/users')
const hotelsRoutes = require('./routes/hotels')
const roomsRoutes = require('./routes/rooms')
const homeRoutes = require('./routes/home')

// Load env file
dotenv.config({ path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
//Use forms for put / delete
app.use(methodOverride("_method"));

// Session
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl:process.env.DB_STRING })
    })
  )

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', homeRoutes);
app.use("/users", usersRoutes);
app.use("/hotels", hotelsRoutes);
app.use("/rooms", roomsRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})  