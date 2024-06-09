import { SessionDbInterface } from '../dbTypes/session-db-interface';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const { Schema } = mongoose;

const sessionSchema = new Schema<SessionDbInterface>({
  deviceId: { type: ObjectId },
  ip: { type: String },
  iat: { type: Number },
  exp: { type: Number },
});
export const Sessions = mongoose.model('sessions', sessionSchema);
