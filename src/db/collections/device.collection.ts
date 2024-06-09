import { DeviceDbInterface } from '../dbTypes/device-db-interface';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const { Schema } = mongoose;

const deviceSchema = new Schema<DeviceDbInterface>({
  userId: { type: ObjectId },
  device_name: { type: String },
});

export const Devices = mongoose.model('devices', deviceSchema);
