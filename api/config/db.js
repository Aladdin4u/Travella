const mongoose = require("mongoose");


const connectDB = async () => {
  const DB_STRING =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_STRING
      : process.env.DB_STRING;
  try {
    const conn = await mongoose.connect(DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
