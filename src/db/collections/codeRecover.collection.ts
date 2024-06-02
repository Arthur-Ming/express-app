import { db } from '../db';
import { CodeRecoverDbInterface } from '../dbTypes/code-recover-db-interface';

export const codeRecoverCollection = db.collection<CodeRecoverDbInterface>('code_recover');
