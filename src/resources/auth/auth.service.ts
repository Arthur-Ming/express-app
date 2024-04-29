import { UsersRepository } from '../users/users.repository';
import { RequestWithBody } from '../blogs/types/types';
import { LoginUserBody } from '../users/types/interfaces';
import { Response } from 'express';
import { httpStatutes } from '../../common/httpStatutes';
import bcrypt from 'bcrypt';

const usersRepository = new UsersRepository();
export class AuthService {
  loginUser = async (body: LoginUserBody) => {
    const user = await usersRepository.getUserByLoginOrEmail(body.loginOrEmail);
    if (!user) {
      return false;
    }
    const isLogin = await bcrypt.compare(body.password, user.password);
    if (!isLogin) {
      return false;
    }
    return true;
  };
}
