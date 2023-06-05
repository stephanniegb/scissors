import { Request, Response } from "express";
import shortUrl from "../models/shortUrl.Model";
import analytics from "../models/analytics.model";

export async function createShortUrl(req: Request, res: Response) {
  const { destination } = req.body;

  const newUrl = await shortUrl.create({ destination });
  return res.send(newUrl);
}

export async function handleRedirect(req: Request, res: Response) {
  console.log("createShortUrl controller function executed");
  const { shortId } = req.params;

  const short = await shortUrl.findOne({ shortId }).lean();

  if (!short) {
    return res.sendStatus(404);
  }
  analytics.create({ shortUrl: short.id });
  return res.redirect(short.destination);
}

export async function getAnalytics() {
  try {
    // Fetch analytics data from the data storage system or analytics service
    const analyticsData = await analytics.find();

    // Process the analytics data as needed
    // You can perform calculations, transformations, filtering, etc.

    // Return the processed analytics data
    return analyticsData;
  } catch (error) {
    // Handle any errors that occur during the fetching or processing of analytics data
    console.error("Failed to fetch analytics:", error);
  }
}
