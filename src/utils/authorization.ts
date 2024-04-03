import { NextFunction, Request, Response } from 'express';

export const ADMIN_AUTH = 'admin:qwerty'; // get from SETTINGS
export const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    res.status(401).json({});
    return;
  }

  if ('Basic ' + btoa(ADMIN_AUTH) !== auth) {
    res.status(401).json({});
    return;
  }

  next();
};
