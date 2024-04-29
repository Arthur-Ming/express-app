import { Router } from 'express';
import routes from '../../common/routes';
import { loginBodyValidation } from '../users/usersValidation/loginBodyValidation';
import { authLogin } from './auth.controller';

const authRouter = Router();

authRouter.get(routes.authMe);
authRouter.post(routes.authLogin, loginBodyValidation, authLogin);

export default authRouter;
