import { body } from 'express-validator';
import { LikeStatus } from '../db/dbTypes/likes-db-interface';
import { inputCheckErrorsMiddleware } from './inputCheckErrorsMiddleware';

export const likeStatusValidation = [
  body('likeStatus').custom(async (value) => {
    const isValid = LikeStatus.hasOwnProperty(value);
    if (!isValid) {
      throw new Error(`Invalid value: like status is not correct`);
    }
    return isValid;
  }),

  inputCheckErrorsMiddleware,
];
