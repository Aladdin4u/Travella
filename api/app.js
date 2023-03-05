const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const flash = require("express-flash");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoute = require("./Routes/auth");
const usersRoute = require("./Routes/users");
const hotelsRoute = require("./Routes/hotels");
const roomsRoute = require("./Routes/rooms");

const app = express();
// Load env file
dotenv.config({ path: "./config/.env" });

connectDB();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
//Use forms for put / delete
app.use(methodOverride("_method"));

app.use(flash());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

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

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running, you better catch it! on port ${process.env.PORT}`
  );
});
