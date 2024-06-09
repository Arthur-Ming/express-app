import { CodeRecovers } from '../../db/collections/codeRecover.collection';
import { ObjectId } from 'mongodb';

export class CodeRecoverRepository {
  add = async (userId: string) => {
    const newCodeRecovery = await CodeRecovers.create({
      userId: new ObjectId(userId),
      createdAt: Number(new Date()),
    });
    return newCodeRecovery;
  };
  getById = async (id: string) => {
    const found = await CodeRecovers.findById(id);

    if (!found) {
      return null;
    }

    return found;
  };
}
