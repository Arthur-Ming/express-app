import { body } from 'express-validator';
import { UsersBodyFieldsEnum } from '../types/enum';
import { inputCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';

export const loginBodyValidation = [
  body('loginOrEmail').isString().trim().isLength({ min: 3, max: 50 }),
  body(UsersBodyFieldsEnum.password)
    .isString()
    .trim()
    .isLength({ min: 6, max: 20 })
    .custom(async (value) => {
      const isValid = /^[a-zA-Z0-9_-]*$/.test(value);
      if (!isValid) {
        throw new Error(`Incorrect password`);
      }
      return isValid;
    }),
  inputCheckErrorsMiddleware,
];
