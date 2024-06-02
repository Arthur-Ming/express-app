import { body } from 'express-validator';
import { UsersBodyFieldsEnum } from '../../users/types/enum';
import { inputCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';

export const passwordRecoveryInputValidation = [
  body(UsersBodyFieldsEnum.email).trim().isEmail(),
  inputCheckErrorsMiddleware,
];
