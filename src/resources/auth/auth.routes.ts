import { Router } from 'express';
import routes from '../../common/routes';
import { loginBodyValidation } from '../users/usersValidation/loginBodyValidation';
import {
  authLogin,
  authMe,
  logout,
  newPassword,
  passwordRecover,
  refreshToken,
  registration,
  registrationConfirmation,
  registrationEmailResending,
  sendEmail,
} from './auth.controller';
import { checkByJWTAuthorization } from '../../utils/authorization';
import { usersInputBodyValidation } from '../users/usersValidation/usersInputBodyValidation';
import { rateLimits } from '../../utils/rateLimits';
import { passwordRecoveryInputValidation } from './authValidations/passwordRecoveryInputValidation';
import { newPasswordInputValidation } from './authValidations/newPasswordInputValidation';

const authRouter = Router();

authRouter.get(routes.authMe, checkByJWTAuthorization, authMe);
authRouter.post(routes.authLogin, rateLimits, loginBodyValidation, authLogin);
authRouter.post(routes.authLogout, logout);
authRouter.post(routes.authRegistration, rateLimits, usersInputBodyValidation, registration);
authRouter.post(routes.authRegistrationConfirmation, rateLimits, registrationConfirmation);
authRouter.post(routes.authRegistrationEmailResending, rateLimits, registrationEmailResending);
authRouter.post(routes.authRefreshToken, refreshToken);
authRouter.post(
  routes.authPasswordRecovery,
  rateLimits,
  passwordRecoveryInputValidation,
  passwordRecover
);
authRouter.post(routes.authNewPassword, rateLimits, newPasswordInputValidation, newPassword);

export default authRouter;
