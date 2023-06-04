import express from "express";
import config from "config";
import routes from "./routes";
import bodyParser from "body-parser";
import db from "./db";

import mongoose from "mongoose";
mongoose.set("strictQuery", false);
//
const app = express();
app.use(bodyParser.json());
const port = config.get("port");

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
  db();
  routes(app);
});
