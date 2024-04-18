import mongoose  from "mongoose";
import { DB_STRING, TEST_DB_STRING } from "./index.js";

const connectDB = async () => {
  const MONGODB_STRING =
    process.env.NODE_ENV === "test"
      ? TEST_DB_STRING
      : DB_STRING;
  try {
    const conn = await mongoose.connect(MONGODB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
