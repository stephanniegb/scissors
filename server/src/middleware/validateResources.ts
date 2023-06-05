import { AnyObject } from "yup";
import { Request, Response, NextFunction } from "express";

const validateResource =
  (resourceSchema: AnyObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await resourceSchema.validate({ destination: req.body.destination });
      console.log("validateResource middleware executed");
      next();
    } catch (error) {
      return res.sendStatus(404);
    }
  };

export default validateResource;
