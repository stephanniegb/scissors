import mongoose, { Document } from "mongoose";
import { shortURL } from "./shortUrl.Model";

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
