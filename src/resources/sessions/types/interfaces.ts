import { ObjectId } from 'mongodb';

export interface CreateSessionDTO {
  deviceId: string;
  iat: number;
  ip: string;
  exp: number;
}
export interface RefreshSessionDTO {
  deviceId: string;
  iat: number;
  exp: number;
}
