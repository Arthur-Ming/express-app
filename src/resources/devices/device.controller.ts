import { Request, Response } from 'express';
import { httpStatutes } from '../../common/httpStatutes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../common/config';
import { DeviceRepository } from './device.repository';
import { DeviceQueryRepo } from './device.queryRepo';
import { DeviceService } from './device.service';

const deviceRepository = new DeviceRepository();
const deviceQueryRepo = new DeviceQueryRepo();
const deviceService = new DeviceService();
export const getAll = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const payload: JwtPayload | string = jwt.verify(refreshToken, config.jwtSecret);

    if (typeof payload === 'string' || !payload?.deviceId) {
      throw new Error();
    }
    const currentDevice = await deviceRepository.getById(payload.deviceId);
    if (!currentDevice) {
      res.sendStatus(httpStatutes.NOT_FOUND_404);
      return;
    }

    const userDevices = await deviceQueryRepo.getAllByUserId(currentDevice.userId.toString());

    res.status(httpStatutes.OK_200).json(userDevices);
  } catch (err) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }
};

export const deleteAll = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const payload: JwtPayload | string = jwt.verify(refreshToken, config.jwtSecret);

    if (typeof payload === 'string' || !payload?.deviceId) {
      throw new Error();
    }

    await deviceService.removeExcludeCurrent(payload.deviceId);
    res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
  } catch (err) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const payload: JwtPayload | string = jwt.verify(refreshToken, config.jwtSecret);

    if (typeof payload === 'string' || !payload?.deviceId) {
      throw new Error();
    }
    const device = await deviceRepository.getById(payload.deviceId);

    if (!device) {
      res.sendStatus(httpStatutes.NOT_FOUND_404);
      return;
    }
    const deviceByParamId = await deviceRepository.getById(req.params.id);
    if (!deviceByParamId) {
      res.sendStatus(httpStatutes.NOT_FOUND_404);
      return;
    }
    const userId = device.userId.toString();
    const userDevices = await deviceRepository.getAllByUserId(userId);
    if (!userDevices) {
      res.sendStatus(httpStatutes.NOT_FOUND_404);
      return;
    }
    const userDeviceIds = userDevices.map((u) => u._id.toString());
    const isUserHasDevice = userDeviceIds.some((id) => req.params.id === id);
    if (!isUserHasDevice) {
      res.sendStatus(httpStatutes.Forbidden_403);
      return;
    }
    await deviceService.removeById(req.params.id);
    res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
  } catch (err) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }
};
