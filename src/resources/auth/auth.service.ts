import { UsersRepository } from '../users/users.repository';
import jwt from 'jsonwebtoken';
import { LoginUserBody } from '../users/types/interfaces';

import bcrypt from 'bcrypt';
import { AccessTokenPayload, AuthMeOutput } from './types/interfaces';
import config from '../../common/config';
import { UserDbInterface } from '../../db/dbTypes/user-db-interface';
import { WithId } from 'mongodb';
import { SessionsService } from '../sessions/sessions.service';

const usersRepository = new UsersRepository();
const sessionsService = new SessionsService();
export class AuthService {
  private authMeOutputMap = (user: WithId<UserDbInterface>): AuthMeOutput => {
    return {
      userId: user._id.toString(),
      login: user.login,
      email: user.email,
    };
  };
  private genToken = (
    payload: AccessTokenPayload,
    expiresIn: string,
    secret = config.jwtSecret
  ) => {
    try {
      const token = jwt.sign(
        {
          userId: payload.userId,
        },
        secret,
        {
          expiresIn: expiresIn,
        }
      );
      return token;
    } catch (err) {
      return null;
    }
  };
  loginUser = async (body: LoginUserBody) => {
    const user = await usersRepository.getUserByLoginOrEmail(body.loginOrEmail);
    if (!user) {
      return {
        isLogin: false,
        accessToken: null,
        refreshToken: null,
      };
    }
    const isLogin = await bcrypt.compare(body.password, user.password);
    if (!isLogin) {
      return {
        isLogin: false,
        accessToken: null,
        refreshToken: null,
      };
    }
    const userId = user._id.toString();
    const refreshToken = this.genToken({ userId }, config.refreshTokenExpiresIn);
    const accessToken = this.genToken({ userId }, config.accessTokenExpiresIn);
    if (refreshToken) {
      await sessionsService.setSession(userId, refreshToken);
    }

    return {
      isLogin: true,
      accessToken,
      refreshToken,
    };
  };
  logout = async (userId: string) => {
    return await sessionsService.logout(userId);
  };
  refreshSession = async (userId: string) => {
    const refreshToken = this.genToken({ userId }, config.refreshTokenExpiresIn);
    const accessToken = this.genToken({ userId }, config.accessTokenExpiresIn);
    if (refreshToken) {
      await sessionsService.setSession(userId, refreshToken);
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
}
