import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import db from "./db";

import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Application listening at http://localhost:${PORT}`);
  db();
  routes(app);
});
