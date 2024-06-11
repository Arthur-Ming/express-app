import { UsersRepository } from '../users/users.repository';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LoginUserBody } from '../users/types/interfaces';

import bcrypt from 'bcrypt';
import {
  AccessTokenPayload,
  AuthMeOutput,
  AuthUserInfo,
  RefreshTokenPayload,
} from './types/interfaces';
import config from '../../common/config';
import { UserDbInterface } from '../../db/dbTypes/user-db-interface';
import { WithId } from 'mongodb';
import { SessionsService } from '../sessions/sessions.service';
import { DeviceRepository } from '../devices/device.repository';
import { CodeRecoverRepository } from './codeRecover.repository';

const usersRepository = new UsersRepository();
const sessionsService = new SessionsService();
const deviceRepository = new DeviceRepository();
const codeRecoverRepository = new CodeRecoverRepository();
export class AuthService {
  private authMeOutputMap = (user: WithId<UserDbInterface>): AuthMeOutput => {
    return {
      userId: user._id.toString(),
      login: user.login,
      email: user.email,
    };
  };
  private genAccessToken = (
    payload: AccessTokenPayload,
    expiresIn = config.accessTokenExpiresIn,
    secret = config.jwtSecret
  ) => {
    try {
      const token = jwt.sign(
        {
          userId: payload.userId,
        },
        secret,
        {
          expiresIn,
        }
      );
      return token;
    } catch (err) {
      return null;
    }
  };
  private genRefreshToken = (
    payload: RefreshTokenPayload,
    expiresIn = config.refreshTokenExpiresIn,
    secret = config.jwtSecret
  ) => {
    try {
      const token = jwt.sign(
        {
          deviceId: payload.deviceId,
        },
        secret,
        {
          expiresIn,
        }
      );
      return token;
    } catch (err) {
      return null;
    }
  };
  loginUser = async (
    body: LoginUserBody,
    { ip = 'unknown', deviceName = 'unknown' }: AuthUserInfo
  ) => {
    const user = await usersRepository.getUserByLoginOrEmail(body.loginOrEmail);
    console.log(user);
    if (!user) {
      return {
        isLogin: false,
        accessToken: null,
        refreshToken: null,
      };
    }
    const isLogin = await bcrypt.compare(body.password, user.password);
    console.log(isLogin);
    if (!isLogin) {
      return {
        isLogin: false,
        accessToken: null,
        refreshToken: null,
      };
    }

    const { id: deviceId } = await deviceRepository.add({
      userId: user._id,
      device_name: deviceName,
    });

    const userId = user._id.toString();
    const refreshToken = this.genRefreshToken({ deviceId });
    const accessToken = this.genAccessToken({ userId });
    if (refreshToken) {
      const payload: JwtPayload | string = jwt.verify(refreshToken, config.jwtSecret);
      if (typeof payload !== 'string') {
        const { iat = 0, exp = 0, deviceId } = payload;
        await sessionsService.add({ exp, iat, ip, deviceId });
      }
    }

    return {
      isLogin: true,
      accessToken,
      refreshToken,
    };
  };
  logout = async (deviceId: string) => {
    await deviceRepository.remove(deviceId);
    await sessionsService.logout(deviceId);
  };
  refreshSession = async (deviceId: string) => {
    const device = await deviceRepository.getById(deviceId);
    if (!device) {
      return null;
    }
    const userId = device.userId.toString();
    const refreshToken = this.genRefreshToken({ deviceId });
    const accessToken = this.genAccessToken({ userId });
    if (refreshToken) {
      const payload: JwtPayload | string = jwt.verify(refreshToken, config.jwtSecret);
      if (typeof payload !== 'string') {
        const { iat = 0, exp = 0, deviceId } = payload;
        await sessionsService.refresh({ exp, iat, deviceId });
      }
    }

    return { refreshToken, accessToken };
  };
  authMeById = async (userId: string) => {
    const user = await usersRepository.getUserById(userId);
    if (!user) {
      return null;
    }

    return this.authMeOutputMap(user);
  };
  addRecoverCode = async (userId: string) => {
    const { id } = await codeRecoverRepository.add(userId);
    return id;
  };
  getRecoverCodeById = async (recoveryCodeId: string) => {
    const codeRecovery = await codeRecoverRepository.getById(recoveryCodeId);
    return codeRecovery;
  };
}
