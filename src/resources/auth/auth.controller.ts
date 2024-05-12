import { Request, Response } from 'express';
import { httpStatutes } from '../../common/httpStatutes';
import { AuthService } from './auth.service';
import config from '../../common/config';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { RequestWithBody } from '../blogs/types/types';
import { UserInputBody } from '../users/types/interfaces';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { ObjectId } from 'mongodb';
import { RegistrationConfirmationBody } from './types/interfaces';

const authService = new AuthService();
const usersService = new UsersService();
const usersRepository = new UsersRepository();

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
  const date = add(new Date(), {
    minutes: 30,
  });
  console.log(date);
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: config.email,
  //     pass: config.emailPassword,
  //   },
  // });
  // const code = uuidv4();
  // const info = await transporter.sendMail({
  //   from: `"Arthur 👻" <${config.email}>`, // sender address
  //   to: 'arthurming7@gmail.com', // list of receivers
  //   subject: 'Hello ✔', // Subject line
  //   html: `<b>Your code: ${code}</b>`, // html body
  // });
  // console.log(info);
  res.status(httpStatutes.OK_200).json('email');
};

const authRepository = new AuthRepository();
export const registration = async (req: RequestWithBody<UserInputBody>, res: Response) => {
  const doesUserExist = await usersRepository.getUserByLoginOrEmailAlt(
    req.body.login,
    req.body.email
  );
  if (doesUserExist) {
    res.status(httpStatutes.BAD_REQUEST_400).json({
      errorsMessages: [
        {
          message: 'string',
          field: 'email',
        },
      ],
    });
    return;
  }
  const addedUser = await usersService.addUser(req.body);
  if (!addedUser) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  const code = uuidv4();
  const confirmation = authRepository.addEmailConfirmation({
    confirmationCode: code,
    expirationDate: add(new Date(), {
      minutes: 30,
    }),
    isConfirmed: false,
    userId: new ObjectId(addedUser.id),
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.emailPassword,
    },
  });

  const info = await transporter.sendMail({
    from: `"Arthur 👻" <${config.email}>`, // sender address
    to: addedUser.email, // list of receivers
    subject: 'Hello ✔', // Subject line
    html: ` <h1>Thank for your registration</h1>
 <p>To finish registration please follow the link below:
     <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
 </p>`, // html body
  });

  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};

export const registrationConfirmation = async (
  req: RequestWithBody<RegistrationConfirmationBody>,
  res: Response
) => {
  const confirmation = await authRepository.findByConfirmationCode(req.body.code);

  if (!confirmation || confirmation.isConfirmed || confirmation.expirationDate < new Date()) {
    res.status(httpStatutes.BAD_REQUEST_400).json({
      errorsMessages: [
        {
          message: 'string',
          field: 'string',
        },
      ],
    });
    return;
  }
  await authRepository.setConfirmed(req.body.code);

  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};
