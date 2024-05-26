import { JwtPayload } from 'jsonwebtoken';

export interface AccessTokenPayload extends JwtPayload {
  userId: string;
}
export interface RefreshTokenPayload extends JwtPayload {
  deviceId: string;
}

export interface AuthMeOutput {
  email: string;
  login: string;
  userId: string;
}

export interface EmailConfirmation {
  userId: string;
  confirmationCode: string;
  expirationDate: Date;
  isConfirmed: boolean;
}

export interface RegistrationConfirmationBody {
  code: string;
}
export interface RegistrationEmailResendingBody {
  email: string;
}

export interface AuthUserInfo {
  ip?: string;
  deviceName?: string;
}
