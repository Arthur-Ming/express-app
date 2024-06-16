import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const paramIdCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const e = validationResult(req);

  const errors = e.array({ onlyFirstError: true });
  console.log(errors);
  if (errors.length) {
    res.sendStatus(404);
    return;
  }
  next();
};
