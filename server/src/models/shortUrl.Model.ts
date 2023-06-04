import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// const uniqueId = uuidv4();

const generateUniqueId = (): string => {
  const uniqueId = uuidv4();
  const shortId = uniqueId.substr(0, 6); // Truncate to the first 6 characters
  return shortId;
};

export interface shortURL extends Document {
  shortId: string;
  destination: string;
}
const schema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true,
    default: generateUniqueId(),
  },
  destination: {
    type: String,
    required: true,
  },
});

const shortUrl = mongoose.model<shortURL>("shortUrl", schema);

export default shortUrl;
