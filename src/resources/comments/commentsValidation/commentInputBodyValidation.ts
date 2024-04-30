import { body } from 'express-validator';
import { inputCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';

export const commentInputBodyValidation = [
  body('content').isString().trim().isLength({ min: 20, max: 300 }),
  inputCheckErrorsMiddleware,
];
