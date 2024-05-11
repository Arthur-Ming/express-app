import { Request, Response } from 'express';
import { httpStatutes } from '../../common/httpStatutes';
import { AuthService } from './auth.service';
import config from '../../common/config';
import nodemailer from 'nodemailer';
const authService = new AuthService();

export const authLogin = async (req: Request, res: Response) => {
  const { isLogin, accessToken } = await authService.loginUser(req.body);

  if (!isLogin) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }
  if (!accessToken) {
    res.sendStatus(httpStatutes.INTERNAL_SERVER_ERROR);
    return;
  }

  res.status(httpStatutes.OK_200).json({ accessToken });
};

export const authMe = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const me = await authService.authMeById(userId);
  if (!me) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.OK_200).json(me);
};

export const sendEmail = async (req: Request, res: Response) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.emailPassword,
    },
  });
  const info = await transporter.sendMail({
    from: `"Arthur 👻" <${config.email}>`, // sender address
    to: 'arthurming7@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    html: '<b>Hello world?</b>', // html body
  });
  console.log(info);
  res.status(httpStatutes.OK_200).json('email');
};
