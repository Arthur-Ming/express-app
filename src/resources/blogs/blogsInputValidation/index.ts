import { body } from 'express-validator';
import { inputCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';

export const blogsInputValidation = [
  body('name').isString().trim().isLength({ min: 3, max: 15 }),
  body('description').isString().trim().isLength({ max: 500 }),
  body('websiteUrl').isURL().isLength({ max: 100 }),
  inputCheckErrorsMiddleware,
];
