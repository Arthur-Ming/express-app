import { db } from './db';
import { UserDbInterface } from './dbTypes/user-db-interface';

export const userCollection = db.collection<UserDbInterface>('users');
