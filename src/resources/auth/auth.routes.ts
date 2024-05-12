import { Router } from 'express';
import routes from '../../common/routes';
import { loginBodyValidation } from '../users/usersValidation/loginBodyValidation';
import {
  authLogin,
  authMe,
  registration,
  registrationConfirmation,
  sendEmail,
} from './auth.controller';
import { checkByJWTAuthorization } from '../../utils/authorization';
import { usersInputBodyValidation } from '../users/usersValidation/usersInputBodyValidation';

const authRouter = Router();

authRouter.get(routes.authMe, checkByJWTAuthorization, authMe);
authRouter.post(routes.authLogin, loginBodyValidation, authLogin);
authRouter.post(routes.authRegistration, usersInputBodyValidation, registration);
authRouter.post(routes.authRegistrationConfirmation, registrationConfirmation);

export default authRouter;
