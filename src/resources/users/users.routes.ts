import { Router } from 'express';
import routes from '../../common/routes';
import { addUser, deleteUser, getUsers } from './users.controller';
import { usersInputBodyValidation } from './usersValidation/usersInputBodyValidation';
import { checkAuthorization } from '../../utils/authorization';
import { usersQueryParamsValidation } from './usersValidation/usersQueryParamsValidation';
import { paramsIdValidation } from './usersValidation/paramsIdValidation';
import { loginBodyValidation } from './usersValidation/loginBodyValidation';

const usersRouter = Router();

// @ts-ignore
usersRouter.get(routes.users, checkAuthorization, usersQueryParamsValidation, getUsers);
usersRouter.post(routes.users, checkAuthorization, usersInputBodyValidation, addUser);
usersRouter.delete(routes.userById, checkAuthorization, paramsIdValidation, deleteUser);

export default usersRouter;
