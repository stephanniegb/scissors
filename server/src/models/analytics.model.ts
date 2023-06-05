import mongoose, { Document } from "mongoose";
import { shortURL } from "./shortUrl.Model";
import { v4 as uuidv4 } from "uuid";

const generateUniqueId = (): string => {
  const uniqueId = uuidv4();
  const shortId = uniqueId.substr(0, 6); // Truncate to the first 6 characters
  return shortId;
};

interface Analytics extends Document {
  shortUrl: shortURL;
}
const schema = new mongoose.Schema(
  {
    shortUrl: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shortUrl",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const analytics = mongoose.model<Analytics>("analytics", schema);

export default analytics;
