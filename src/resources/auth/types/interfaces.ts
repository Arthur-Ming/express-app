import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AccessTokenPayload extends JwtPayload {
  userId: string;
}

export interface AuthMeOutput {
  email: string;
  login: string;
  userId: string;
}
