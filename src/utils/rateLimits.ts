import { NextFunction, Request, Response } from 'express';
import { rateCollection } from '../db/collections/rate.collection';
import { commentsCollection } from '../db/collections/comments.collection';
import { ObjectId } from 'mongodb';
import { httpStatutes } from '../common/httpStatutes';

export const rateLimits = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.originalUrl);
  await rateCollection.insertOne({
    URL: req.originalUrl,
    IP: req.ip || 'unknown',
    date: Number(new Date()),
  });

  const rates = await rateCollection
    .find({
      IP: req.ip,
      URL: req.originalUrl,
    })
    .toArray();

  const isLimit = rates.filter(({ date }) => {
    return date >= Number(new Date()) - 10 * 1000;
  }).length;

  if (isLimit > 5) {
    res.sendStatus(httpStatutes.TooManyRequests_429);
    return;
  }
  next();
};
