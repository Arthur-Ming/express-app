import { BlogDbInterface } from '../../db/dbTypes/blog-db-interface';
import { blogCollection } from '../../db/blog.collection';
import { emailConfirmationCollection } from '../../db/emailConformition.collection';
import { EmailConfirmation } from './types/interfaces';
import { EmailConfirmationDbInterface } from '../../db/dbTypes/emailConfirmation-db-interface';

export class AuthRepository {
  addEmailConfirmation = async (newConfirmation: EmailConfirmationDbInterface) => {
    const insertOneResult = await emailConfirmationCollection.insertOne(newConfirmation);
    return { id: insertOneResult.insertedId.toString() };
  };
}
