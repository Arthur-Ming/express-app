import { DeviceDbInterface } from '../../../db/dbTypes/device-db-interface';
import { WithId } from 'mongodb';

export interface DeviceOutputData {
  ip: string;
  title: string;
  lastActiveDate: string;
  deviceId: string;
}

export interface DeviceJoinedSessionDB extends WithId<DeviceDbInterface> {
  iat: number;
  ip: string;
}
