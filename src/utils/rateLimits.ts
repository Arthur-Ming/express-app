import { NextFunction, Request, Response } from 'express';
import { Rates } from '../db/collections/rate.collection';
import { httpStatutes } from '../common/httpStatutes';

export const rateLimits = async (req: Request, res: Response, next: NextFunction) => {
  await Rates.create({
    URL: req.originalUrl,
    IP: req.ip || 'unknown',
    date: Number(new Date()),
  });

  const rates = await Rates.find({
    IP: req.ip,
    URL: req.originalUrl,
  });

  const isLimit = rates.filter(({ date }) => {
    return date >= Number(new Date()) - 10 * 1000;
  }).length;

  if (isLimit > 5) {
    res.sendStatus(httpStatutes.TooManyRequests_429);
    return;
  }
  next();
};
