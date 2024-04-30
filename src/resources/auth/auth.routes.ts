import { Router } from 'express';
import routes from '../../common/routes';
import { loginBodyValidation } from '../users/usersValidation/loginBodyValidation';
import { authLogin, authMe } from './auth.controller';
import { checkAuthorization } from '../../utils/authorization';

const authRouter = Router();

authRouter.get(routes.authMe, checkAuthorization, authMe);
authRouter.post(routes.authLogin, loginBodyValidation, authLogin);

export default authRouter;
