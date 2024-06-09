import mongoose from 'mongoose';
import { UserDbInterface } from '../dbTypes/user-db-interface';
const { Schema } = mongoose;

const userSchema = new Schema<UserDbInterface>({
  login: { type: String },
  password: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});
export const Users = mongoose.model('users', userSchema);
