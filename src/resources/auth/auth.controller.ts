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
import {
  NewPasswordInput,
  PasswordRecoverInput,
  RegistrationConfirmationBody,
  RegistrationEmailResendingBody,
} from './types/interfaces';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SessionsService } from '../sessions/sessions.service';

const authService = new AuthService();
const usersService = new UsersService();
const usersRepository = new UsersRepository();
const sessionsService = new SessionsService();

export const authLogin = async (req: Request, res: Response) => {
  const ip = req.ip;
  const deviceName = req.headers['user-agent'];
  const { isLogin, accessToken, refreshToken } = await authService.loginUser(req.body, {
    ip,
    deviceName,
  });

  if (!isLogin) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }
  if (!accessToken || !refreshToken) {
    res.sendStatus(httpStatutes.INTERNAL_SERVER_ERROR);
    return;
  }
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: config.cookieSecure });
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

  res.status(httpStatutes.OK_200).json('email');
};

const authRepository = new AuthRepository();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.emailPassword,
  },
});
export const registration = async (req: RequestWithBody<UserInputBody>, res: Response) => {
  const doesUserExistByLogin = await usersRepository.getUserByLogin(req.body.login);
  if (doesUserExistByLogin) {
    res.status(httpStatutes.BAD_REQUEST_400).json({
      errorsMessages: [
        {
          message: 'string',
          field: 'login',
        },
      ],
    });
    return;
  }
  const doesUserExistByEmail = await usersRepository.getUserByEmail(req.body.email);
  if (doesUserExistByEmail) {
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
          field: 'code',
        },
      ],
    });
    return;
  }
  await authRepository.setConfirmed(req.body.code);

  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};

export const registrationEmailResending = async (
  req: RequestWithBody<RegistrationEmailResendingBody>,
  res: Response
) => {
  const doesUserExistByEmail = await usersRepository.getUserByEmail(req.body.email);
  console.log(doesUserExistByEmail);
  if (!doesUserExistByEmail) {
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
  const confirm = await authRepository.findByUserId(doesUserExistByEmail._id.toString());
  console.log(confirm);
  const code = uuidv4();
  // if (!confirm) {
  //   const confirmation = authRepository.addEmailConfirmation({
  //     confirmationCode: code,
  //     expirationDate: add(new Date(), {
  //       minutes: 30,
  //     }),
  //     isConfirmed: false,
  //     userId: doesUserExistByEmail._id,
  //   });
  // }

  if (confirm?.isConfirmed) {
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
  await authRepository.updateConfirmationCode(doesUserExistByEmail._id.toString(), code);
  const info = await transporter.sendMail({
    from: `"Arthur 👻" <${config.email}>`, // sender address
    to: req.body.email, // list of receivers
    subject: 'Hello ✔', // Subject line
    html: ` <h1>Thank for your registration</h1>
 <p>To finish registration please follow the link below:
     <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
 </p>`, // html body
  });

  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const payload: JwtPayload | string = jwt.verify(refreshToken, config.jwtSecret);
    if (typeof payload === 'string' || !payload?.deviceId) {
      throw new Error();
    }
    const session = await sessionsService.findByDeviceId(payload.deviceId);
    if (!session) {
      throw new Error();
    }
    if (session.exp !== payload.exp) {
      res.sendStatus(httpStatutes.UNAUTHORIZED_401);
      return;
    }
    await authService.logout(payload.deviceId);
    res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
  } catch (err) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken; //cookieSecure set true or false for get
  console.log(refreshToken);
  try {
    const payload: JwtPayload | string = jwt.verify(refreshToken, config.jwtSecret);
    console.log(payload);
    if (typeof payload === 'string' || !payload?.deviceId) {
      throw new Error();
    }
    const session = await sessionsService.findByDeviceId(payload.deviceId);
    console.log(session);
    if (!session) {
      throw new Error();
    }
    if (session.exp !== payload.exp) {
      res.sendStatus(httpStatutes.UNAUTHORIZED_401);
      return;
    }

    const refreshedSession = await authService.refreshSession(payload.deviceId);
    if (!refreshedSession) {
      res.sendStatus(httpStatutes.NOT_FOUND_404);
      return;
    }
    const { refreshToken: newRefreshToken, accessToken: newAccessToken } = refreshedSession;
    if (!newRefreshToken || !newAccessToken) {
      res.sendStatus(httpStatutes.INTERNAL_SERVER_ERROR);
      return;
    }

    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: config.cookieSecure });
    res.status(httpStatutes.OK_200).json({ accessToken: newAccessToken });
  } catch (err) {
    res.sendStatus(httpStatutes.UNAUTHORIZED_401);
    return;
  }
};

export const passwordRecover = async (
  req: RequestWithBody<PasswordRecoverInput>,
  res: Response
) => {
  const user = await usersRepository.getUserByEmail(req.body.email);

  if (!user) {
    res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
    return;
  }

  const recoveryCode = await authService.addRecoverCode(user._id.toString());

  transporter
    .sendMail({
      from: `"Arthur 👻" <${config.email}>`,
      to: req.body.email,
      subject: 'Recovery code ✔',
      html: `<h1>Password recovery</h1>
  <p>To finish password recovery please follow the link below:
    <a href='https://somesite.com/password-recovery?recoveryCode=${recoveryCode}'>recovery password</a>
     
  </p>`,
    })
    .catch((err) => console.error(err));

  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};
export const newPassword = async (req: RequestWithBody<NewPasswordInput>, res: Response) => {
  const recoveryCode = await authService.getRecoverCodeById(req.body.recoveryCode);

  if (!recoveryCode) {
    res.sendStatus(httpStatutes.BAD_REQUEST_400);
    return;
  }
  const updateResult = await usersService.updatePassword(
    recoveryCode.userId.toString(),
    req.body.newPassword
  );

  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};
