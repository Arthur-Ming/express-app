import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

  const payload: JwtPayload | string | null | undefined = token && jwt.decode(token);

  if (!payload) {
    res.locals.userId = null;
  }
  if (payload && typeof payload !== 'string') {
    res.locals.userId = payload.userId;
  }
  next();
};
