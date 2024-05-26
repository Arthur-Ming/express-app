import { Router } from 'express';
import routes from '../../common/routes';
import { loginBodyValidation } from '../users/usersValidation/loginBodyValidation';
import {
  authLogin,
  authMe,
  logout,
  refreshToken,
  registration,
  registrationConfirmation,
  registrationEmailResending,
  sendEmail,
} from './auth.controller';
import { checkByJWTAuthorization } from '../../utils/authorization';
import { usersInputBodyValidation } from '../users/usersValidation/usersInputBodyValidation';
import { rateLimits } from '../../utils/rateLimits';

const authRouter = Router();

authRouter.get(routes.authMe, checkByJWTAuthorization, authMe);
authRouter.post(routes.authLogin, rateLimits, loginBodyValidation, authLogin);
authRouter.post(routes.authLogout, logout);
authRouter.post(routes.authRegistration, usersInputBodyValidation, registration);
authRouter.post(routes.authRegistrationConfirmation, registrationConfirmation);
authRouter.post(routes.authRegistrationEmailResending, registrationEmailResending);
authRouter.post(routes.authRefreshToken, refreshToken);

export default authRouter;
