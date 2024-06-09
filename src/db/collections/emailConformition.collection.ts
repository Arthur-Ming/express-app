import { EmailConfirmationDbInterface } from '../dbTypes/emailConfirmation-db-interface';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const emailConfirmationSchema = new Schema<EmailConfirmationDbInterface>({
  userId: { type: ObjectId },
  confirmationCode: { type: String },
  expirationDate: { type: Date },
  isConfirmed: { type: Boolean },
});

export const EmailConfirmations = mongoose.model('email_confirmation', emailConfirmationSchema);
