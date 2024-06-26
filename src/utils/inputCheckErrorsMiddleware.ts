import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const e = validationResult(req);

  const errors = e.array({ onlyFirstError: true });

  if (errors.length) {
    res.status(400).json({
      errorsMessages: errors.map((e) => ({
        message: e.msg,
        field: e.type === 'field' ? e.path : e.type,
      })),
    });
    return;
  }
  next();
};

export const paramsIdCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const e = validationResult(req);

  const errors = e.array({ onlyFirstError: true });

  if (errors.length) {
    res.sendStatus(404);
    return;
  }
  next();
};

export const queryParamsErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const e = validationResult(req);

  const errors = e.array({ onlyFirstError: true });

  if (errors.length) {
    res.status(400).json({
      errorsMessages: errors.map((e) => ({
        message: e.msg,
        field: e.type === 'field' ? e.path : e.type,
      })),
    });
    return;
  }
  next();
};
