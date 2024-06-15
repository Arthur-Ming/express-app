import { IncomingHttpHeaders } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const extractTokenPayload = (headers: IncomingHttpHeaders) => {
  const auth = headers['authorization'];
  let userId;
  if (!auth) {
    userId = null;
  }

  const token = auth?.split(' ')[1];
  if (!token) {
    userId = null;
  }

  const payload: JwtPayload | string | null | undefined = token && jwt.decode(token);

  if (!payload) {
    userId = null;
  }
  if (payload && typeof payload !== 'string') {
    userId = payload.userId;
  }
  return userId;
};
