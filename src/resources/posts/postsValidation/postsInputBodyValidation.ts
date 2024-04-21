import { body, param } from 'express-validator';
import { inputCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';

export const postsInputBodyValidation = [
  body('title').isString().trim().isLength({ min: 3, max: 30 }),
  body('shortDescription').isString().trim().isLength({ min: 3, max: 100 }),
  body('content').isString().trim().isLength({ min: 3, max: 1000 }),
  inputCheckErrorsMiddleware,
];
