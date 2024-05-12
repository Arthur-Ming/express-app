import { BlogDbInterface } from '../../db/dbTypes/blog-db-interface';
import { blogCollection } from '../../db/blog.collection';
import { emailConfirmationCollection } from '../../db/emailConformition.collection';
import { EmailConfirmation } from './types/interfaces';
import { EmailConfirmationDbInterface } from '../../db/dbTypes/emailConfirmation-db-interface';
import { ObjectId } from 'mongodb';

export class AuthRepository {
  addEmailConfirmation = async (newConfirmation: EmailConfirmationDbInterface) => {
    const insertOneResult = await emailConfirmationCollection.insertOne(newConfirmation);
    return { id: insertOneResult.insertedId.toString() };
  };

  findByConfirmationCode = async (confirmationCode: string) => {
    const confirmation = await emailConfirmationCollection.findOne({
      confirmationCode: confirmationCode,
    });
    if (!confirmation) {
      return null;
    }
    return confirmation;
  };

  findByUserId = async (userId: string) => {
    const confirmation = await emailConfirmationCollection.findOne({
      userId: new ObjectId(userId),
    });
    if (!confirmation) {
      return null;
    }
    return confirmation;
  };

  setConfirmed = async (confirmationCode: string) => {
    const updateResult = await emailConfirmationCollection.updateOne(
      {
        confirmationCode: confirmationCode,
      },
      {
        $set: {
          isConfirmed: true,
        },
      }
    );
    return updateResult.matchedCount === 1;
  };

  updateConfirmationCode = async (userId: string, newCode: string) => {
    const updateResult = await emailConfirmationCollection.updateOne(
      {
        userId: new ObjectId(userId),
      },
      {
        $set: {
          confirmationCode: newCode,
        },
      }
    );
    return updateResult.matchedCount === 1;
  };
}
