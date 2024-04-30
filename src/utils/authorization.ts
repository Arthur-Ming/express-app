import { NextFunction, Request, Response } from 'express';
import config from '../common/config';
import { httpStatutes } from '../common/httpStatutes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AccessTokenPayload } from '../resources/auth/types/interfaces';

export const checkByJWTAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }

  const token = auth.split(' ')[1];

  try {
    const payload: JwtPayload | string = jwt.verify(token, config.jwtSecret);
    if (typeof payload !== 'string') {
      res.locals.userId = payload.userId;
    }
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }
};

export const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];
  console.log(auth);
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
