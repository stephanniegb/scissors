import express from "express";
import config from "config";
import routes from "./routes";
const app = express();
const port = config.get("port");

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
  routes(app);
});
