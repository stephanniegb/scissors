import { Request, Response } from "express";
import shortUrl from "../models/shortUrl.Model";
import analytics from "../models/analytics.model";

export async function createShortUrl(req: Request, res: Response) {
  const { destination } = req.body;

  try {
    const newUrl = await shortUrl.create({ destination });
    return res.send(newUrl.toObject());
  } catch (error) {
    console.error("Failed to create short URL:", error);
    return res.sendStatus(500);
  }
}

export async function handleRedirect(req: Request, res: Response) {
  console.log("handleRedirect controller function executed");
  const { shortId } = req.params;

  try {
    const short = await shortUrl.findOne({ shortId }).lean();

    if (!short) {
      return res.sendStatus(404);
    }

    await analytics.create({ shortUrl: short._id });

    return res.redirect(short.destination);
  } catch (error) {
    console.error("Failed to handle redirect:", error);
    return res.sendStatus(500);
  }
}

export async function getAnalytics(req: Request, res: Response) {
  try {
    const analyticsData = await analytics.find().populate("shortUrl");

    return res.json(analyticsData);
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return res.sendStatus(500);
  }
}
