import { param } from 'express-validator';
import { paramIdCheckErrorsMiddleware } from '../../../utils/paramIdCheckErrorsMiddleware';

export const paramsPostIdValidation = [param('postId').isMongoId(), paramIdCheckErrorsMiddleware];
