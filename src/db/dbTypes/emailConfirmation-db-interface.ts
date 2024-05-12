import { ObjectId } from 'mongodb';

export interface EmailConfirmationDbInterface {
  userId: ObjectId;
  confirmationCode: string;
  expirationDate: Date;
  isConfirmed: boolean;
}
