import { body } from 'express-validator';
import { inputCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';
import { LikeStatus } from '../../../db/dbTypes/comments-likes-db-interface';

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
