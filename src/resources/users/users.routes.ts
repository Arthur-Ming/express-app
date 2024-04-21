import { Router } from 'express';
import routes from '../../common/routes';
import { addUser, deleteUser, getUsers } from './users.controller';
import { usersInputBodyValidation } from './usersValidation/usersInputBodyValidation';
import { checkAuthorization } from '../../utils/authorization';

const usersRouter = Router();

usersRouter.get(routes.users, getUsers);
usersRouter.post(routes.users, checkAuthorization, usersInputBodyValidation, addUser);
usersRouter.delete(routes.userById, deleteUser);

export default usersRouter;
