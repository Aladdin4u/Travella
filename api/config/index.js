import { config } from "dotenv";
config({ path: "./config/.env" });

const PORT = process.env.PORT;
const DB_STRING = process.env.DB_STRING;
const TEST_DB_STRING = process.env.TEST_DB_STRING;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT, DB_STRING, TEST_DB_STRING, JWT_SECRET };
