import { Request, Response } from 'express';
import { httpStatutes } from '../../common/httpStatutes';
import { AuthService } from './auth.service';

const authService = new AuthService();

export const authLogin = async (req: Request, res: Response) => {
  const isLoginUser = await authService.loginUser(req.body);

  if (!isLoginUser) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }

  res.status(httpStatutes.OK_200).json('authLogin');
};
