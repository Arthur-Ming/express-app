import { Router } from 'express';
import routes from '../../common/routes';
import { loginBodyValidation } from '../users/usersValidation/loginBodyValidation';
import { authLogin, authMe, sendEmail } from './auth.controller';
import { checkByJWTAuthorization } from '../../utils/authorization';

const authRouter = Router();

authRouter.get(routes.authMe, checkByJWTAuthorization, authMe);
authRouter.post(routes.authLogin, loginBodyValidation, authLogin);
authRouter.post('/auth/send/email', sendEmail);

export default authRouter;
