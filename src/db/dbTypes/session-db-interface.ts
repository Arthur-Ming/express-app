import { ObjectId } from 'mongodb';

export interface SessionDbInterface {
  refreshToken: string;
  userId: ObjectId;
}
