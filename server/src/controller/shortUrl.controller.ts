import { Request, Response } from "express";
import shortUrl from "../model/shortUrl.Model";

export async function createShortUrl(req: Request, res: Response) {
  const { destination } = req.body;

  const newUrl = await shortUrl.create({ destination });
  return res.send(newUrl);
}
