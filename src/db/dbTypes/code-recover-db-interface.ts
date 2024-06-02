import { ObjectId } from 'mongodb';

export interface CodeRecoverDbInterface {
  userId: ObjectId;
  createdAt: number;
}
