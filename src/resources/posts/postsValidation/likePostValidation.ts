import { param } from 'express-validator';
import { paramIdCheckErrorsMiddleware } from '../../../utils/paramIdCheckErrorsMiddleware';
import { likeStatusValidation } from '../../../utils/likeStatusValidation';
import { checkPostExisting } from './checkPostExisting';

export const likePostValidation = [
  param('postId').isMongoId(),
  paramIdCheckErrorsMiddleware,
  checkPostExisting,
  ...likeStatusValidation,
];
