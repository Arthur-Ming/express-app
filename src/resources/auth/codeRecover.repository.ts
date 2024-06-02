import { codeRecoverCollection } from '../../db/collections/codeRecover.collection';
import { ObjectId } from 'mongodb';
import { userCollection } from '../../db/collections/user.collection';

export class CodeRecoverRepository {
  add = async (userId: string) => {
    const insertOneResult = await codeRecoverCollection.insertOne({
      userId: new ObjectId(userId),
      createdAt: Number(new Date()),
    });
    return { id: insertOneResult.insertedId.toString() };
  };
  getById = async (id: string) => {
    const found = await codeRecoverCollection.findOne({ _id: new ObjectId(id) });

    if (!found) {
      return null;
    }

    return found;
  };
}
