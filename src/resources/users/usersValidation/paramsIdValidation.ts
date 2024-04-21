import { param } from 'express-validator';
import { paramIdCheckErrorsMiddleware } from '../../../utils/paramIdCheckErrorsMiddleware';

export const paramsIdValidation = [param('id').isMongoId(), paramIdCheckErrorsMiddleware];
