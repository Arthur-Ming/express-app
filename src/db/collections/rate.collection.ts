import { db } from '../db';
import { RateDbInterface } from '../dbTypes/rate-db-interface';

export const rateCollection = db.collection<RateDbInterface>('rates');
