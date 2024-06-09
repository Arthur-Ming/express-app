import { EmailConfirmations } from '../../db/collections/emailConformition.collection';

import { EmailConfirmationDbInterface } from '../../db/dbTypes/emailConfirmation-db-interface';
import { ObjectId } from 'mongodb';

export class AuthRepository {
  addEmailConfirmation = async (newConfirmationDTO: EmailConfirmationDbInterface) => {
    const newConfirmation = await EmailConfirmations.create(newConfirmationDTO);
    return newConfirmation;
  };

  findByConfirmationCode = async (confirmationCode: string) => {
    const confirmation = await EmailConfirmations.findOne({
      confirmationCode: confirmationCode,
    });
    if (!confirmation) {
      return null;
    }
    return confirmation;
  };

  findByUserId = async (userId: string) => {
    const confirmation = await EmailConfirmations.findOne({
      userId: new ObjectId(userId),
    });
    if (!confirmation) {
      return null;
    }
    return confirmation;
  };

  setConfirmed = async (confirmationCode: string) => {
    const updateResult = await EmailConfirmations.updateOne(
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
    const updateResult = await EmailConfirmations.updateOne(
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
