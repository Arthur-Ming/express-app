import { body, param } from 'express-validator';
import { paramIdCheckErrorsMiddleware } from '../../../utils/paramIdCheckErrorsMiddleware';
import { inputCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';

export const blogsInputValidation = [
  body('name').isString().trim().isLength({ min: 3, max: 15 }),
  body('description').isString().trim().isLength({ min: 3, max: 500 }),
  body('websiteUrl').isURL().isLength({ min: 3, max: 100 }),
  inputCheckErrorsMiddleware,
];

export const paramsIdValidation = [param('id').isMongoId(), paramIdCheckErrorsMiddleware];
