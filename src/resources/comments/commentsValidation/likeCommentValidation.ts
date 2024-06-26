import { commentExistingValidation } from './commentExistingValidation';
import { param } from 'express-validator';
import { paramIdCheckErrorsMiddleware } from '../../../utils/paramIdCheckErrorsMiddleware';
import { likeStatusValidation } from '../../../utils/likeStatusValidation';

export const likeCommentValidation = [
  param('commentId').isMongoId(),
  paramIdCheckErrorsMiddleware,
  commentExistingValidation,
  ...likeStatusValidation,
];
