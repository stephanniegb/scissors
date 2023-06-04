import { Express, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { createShortUrl } from "../controller/shortUrl.controller";

// import { customAlphabet } from "nanoid";

// const nanoId = customAlphabet("abcdefghijklmnopqrstuvwxyz", 6);
// const uniqueId = uuidv4();

const generateUniqueId = (): string => {
  const uniqueId = uuidv4();
  const shortId = uniqueId.substr(0, 6); // Truncate to the first 6 characters
  return shortId;
};

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.send(`App is healthy and strong ${generateUniqueId()}`);
  });

  app.post("/shorten-url", (req, res) => {
    const destination = req.body.destination;
    // Do something with the destination

    return res.send(`URL shortened successfully: ${destination}`);
  });

  app.post("/api/url", createShortUrl);
}
export default routes;
