import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import config from "config";

mongoose.set("strictQuery", false);

const dbUri = config.get("dbUri") as string;
const CONNECTION = process.env.CONNECTION as string;
const db = async () => {
  try {
    await mongoose.connect(CONNECTION);
    console.log(`Application running from mongodb`);
  } catch (error) {
    console.log(error);
  }
};
export default db;
