import { Router } from 'express';
import routes from '../../common/routes';
import { addUser, deleteUser, getUsers } from './users.controller';
import { usersInputBodyValidation } from './usersValidation/usersInputBodyValidation';
import { checkAuthorization } from '../../utils/authorization';
import { usersQueryParamsValidation } from './usersValidation/usersQueryParamsValidation';

const usersRouter = Router();

// @ts-ignore
usersRouter.get(routes.users, checkAuthorization, usersQueryParamsValidation, getUsers);
usersRouter.post(routes.users, checkAuthorization, usersInputBodyValidation, addUser);
usersRouter.delete(routes.userById, deleteUser);

export default usersRouter;
