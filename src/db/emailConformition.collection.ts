import { db } from './db';
import { EmailConfirmationDbInterface } from './dbTypes/emailConfirmation-db-interface';

export const emailConfirmationCollection =
  db.collection<EmailConfirmationDbInterface>('email_confirmations');
