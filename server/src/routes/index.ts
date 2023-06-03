import { Express, Request, Response } from "express";
import { createShortUrl } from "../controller/shortUrl.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.send("App is healthy and strong");
  });

  app.post("/api/url", createShortUrl);
}
export default routes;
