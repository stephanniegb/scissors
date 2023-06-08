import { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import {
  createShortUrl,
  getAnalytics,
  handleRedirect,
} from "../controller/shortUrl.controller";
import validateResource from "../middleware/validateResources";
import shortUrlSchema from "../schemas/createShortUrl.schema";

const generateUniqueId = (): string => {
  const uniqueId = uuidv4();
  const shortId = uniqueId.substr(0, 6); // Truncate to the first 6 characters
  return shortId;
};

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.send(`App is healthy and strong ${generateUniqueId()}`);
  });

  // app.post("/shorten-url", (req, res) => {
  //   const destination = req.body.destination;
  //   return res.send(`URL shortened successfully: ${destination}`);
  // });

  app.post("/api/url", validateResource(shortUrlSchema), createShortUrl);

  app.get("/:shortId", handleRedirect);

  app.get("/api/analytics", getAnalytics);
}
export default routes;
