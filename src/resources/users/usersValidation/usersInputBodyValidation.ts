import { body } from 'express-validator';
import { inputCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';
import { UsersBodyFieldsEnum } from '../types/enum';
import { BlogsSortDirection } from '../../blogs/types/enum';

export const usersInputBodyValidation = [
  body(UsersBodyFieldsEnum.login).isString().trim().isLength({ min: 3, max: 10 }),
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
  body(UsersBodyFieldsEnum.email).trim().isEmail(),
  inputCheckErrorsMiddleware,
];
