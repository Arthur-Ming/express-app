import { db } from './db';
import { SessionDbInterface } from './dbTypes/session-db-interface';

export const sessionCollection = db.collection<SessionDbInterface>('sessions');
