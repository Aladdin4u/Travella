import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js"

const expressApp = (app) => {
  app.use(cors());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.use("/api", routes);

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
};

export default expressApp;
