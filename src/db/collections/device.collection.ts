import { db } from '../db';
import { DeviceDbInterface } from '../dbTypes/device-db-interface';

export const deviceCollection = db.collection<DeviceDbInterface>('devices');
