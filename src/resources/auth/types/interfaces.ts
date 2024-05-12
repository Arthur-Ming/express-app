import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export interface AccessTokenPayload extends JwtPayload {
  userId: string;
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
