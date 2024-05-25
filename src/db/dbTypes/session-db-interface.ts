import { ObjectId } from 'mongodb';

export interface SessionDbInterface {
  deviceId: ObjectId;
  iat: number;
  ip: string;
  exp: number;
}
