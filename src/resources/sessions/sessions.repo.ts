import { sessionCollection } from '../../db/session.collections';
import { ObjectId } from 'mongodb';

export class SessionsRepo {
  upsert = async (userId: string, refreshToken: string) => {
    const updateResult = await sessionCollection.updateOne(
      { userId: new ObjectId(userId) },
      {
        $set: {
          refreshToken: refreshToken,
        },
      },
      {
        upsert: true,
      }
    );
    return updateResult.matchedCount === 1;
  };
  findByUserId = async (userId: string) => {
    const foundSession = await sessionCollection.findOne({ userId: new ObjectId(userId) });
    return foundSession;
  };
  remove = async (userId: string) => {
    const deleteResult = await sessionCollection.deleteOne({ userId: new ObjectId(userId) });
    return deleteResult.deletedCount === 1;
  };
}
