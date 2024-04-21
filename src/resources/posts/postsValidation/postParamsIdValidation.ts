import { param } from 'express-validator';
import { paramIdCheckErrorsMiddleware } from '../../../utils/paramIdCheckErrorsMiddleware';

export const postParamsIdValidation = [param('id').isMongoId(), paramIdCheckErrorsMiddleware];
