import { Router } from 'express';
import routes from '../../common/routes';
import { deleteAll, deleteById, getAll } from './device.controller';

const devicesRouter = Router();

devicesRouter.get(routes.devices, getAll);
devicesRouter.delete(routes.devices, deleteAll);
devicesRouter.delete(routes.deviceById, deleteById);

export default devicesRouter;
