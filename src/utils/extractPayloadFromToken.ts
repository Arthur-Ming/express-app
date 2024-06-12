import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../common/config';

export const extractPayloadFromToken = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    res.locals.userId = null;
    next();
  }

  const token = auth?.split(' ')[1];
  if (!token) {
    res.locals.userId = null;
    next();
  }
  try {
    const payload: JwtPayload | string | undefined = token && jwt.verify(token, config.jwtSecret);
    if (!payload) {
      res.locals.userId = null;
    }
    if (payload && typeof payload !== 'string') {
      res.locals.userId = payload.userId;
    }
    next();
  } catch (err) {
    next();
  }
};
