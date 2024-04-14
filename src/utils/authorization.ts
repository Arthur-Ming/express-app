import { NextFunction, Request, Response } from 'express';
import config from '../common/config';
import { httpStatutes } from '../common/httpStatutes';

export const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }

  if ('Basic ' + btoa(config.adminAuth) !== auth) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }

  next();
};
