import express from "express";
import expressApp from "./app.js";
import connectDB from "./config/db.js";
import { PORT } from "./config/index.js";

const startServer = () => {
  // Load env file
  connectDB();

  const app = express();
  expressApp(app);

  app.listen(PORT, () => {
    console.log(
      `Server is running, you better catch it! on port ${process.env.PORT}`
    );
  });
};

startServer();
