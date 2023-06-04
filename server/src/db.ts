import mongoose from "mongoose";
import config from "config";
mongoose.set("strictQuery", false);

const dbUri = config.get("dbUri") as string;

const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://stephaniegb:pass1234@url-shortner.xg27elq.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(`Application running from mongodb`);
  } catch (error) {
    console.log(error);
  }
};
export default db;
