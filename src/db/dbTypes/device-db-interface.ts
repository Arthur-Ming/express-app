import { ObjectId } from 'mongodb';

export interface DeviceDbInterface {
  userId: ObjectId;
  device_name: string;
}
