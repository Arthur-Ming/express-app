import { UsersRepository } from '../users/users.repository';
import jwt from 'jsonwebtoken';
import { LoginUserBody } from '../users/types/interfaces';

import bcrypt from 'bcrypt';
import { AccessTokenPayload, AuthMeOutput } from './types/interfaces';
import config from '../../common/config';
import { UserDbInterface } from '../../db/dbTypes/user-db-interface';
import { WithId } from 'mongodb';

const usersRepository = new UsersRepository();
export class AuthService {
  private authMeOutputMap = (user: WithId<UserDbInterface>): AuthMeOutput => {
    return {
      userId: user._id.toString(),
      login: user.login,
      email: user.email,
    };
  };
  private genAccessToken = (payload: AccessTokenPayload) => {
    try {
      const token = jwt.sign(
        {
          userId: payload.userId,
        },
        config.jwtSecret,
        {
          expiresIn: config.jwtExpiresIn,
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
      };
    }
    const isLogin = await bcrypt.compare(body.password, user.password);
    if (!isLogin) {
      return {
        isLogin: false,
        accessToken: null,
      };
    }

    return {
      isLogin: true,
      accessToken: this.genAccessToken({ userId: user._id.toString() }),
    };
  };
  authMeById = async (userId: string) => {
    const user = await usersRepository.getUserById(userId);
    if (!user) {
      return null;
    }
    console.log(user);
    return this.authMeOutputMap(user);
  };
}
