import { RateDbInterface } from '../dbTypes/rate-db-interface';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const rateSchema = new Schema<RateDbInterface>({
  IP: { type: String },
  URL: { type: String },
  date: { type: Number },
});

export const Rates = mongoose.model('rates', rateSchema);
