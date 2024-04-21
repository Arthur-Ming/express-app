import { body } from 'express-validator';
import { inputCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';

export const blogsInputBodyValidation = [
  body('name').isString().trim().isLength({ min: 3, max: 15 }),
  body('description').isString().trim().isLength({ min: 3, max: 500 }),
  body('websiteUrl').isURL().isLength({ min: 3, max: 100 }),
  inputCheckErrorsMiddleware,
];
