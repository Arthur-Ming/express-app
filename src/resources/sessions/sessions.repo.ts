import { sessionCollection } from '../../db/collections/session.collections';
import { ObjectId } from 'mongodb';
import { SessionDbInterface } from '../../db/dbTypes/session-db-interface';
import { CreateSessionDTO, RefreshSessionDTO } from './types/interfaces';

export class SessionsRepo {
  add = async (dto: CreateSessionDTO) => {
    const insertOneResult = await sessionCollection.insertOne({
      exp: dto.exp,
      iat: dto.iat,
      deviceId: new ObjectId(dto.deviceId),
      ip: dto.ip,
    });
    return { id: insertOneResult.insertedId.toString() };
  };
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
  update = async ({ deviceId, exp, iat }: RefreshSessionDTO) => {
    const updateResult = await sessionCollection.updateOne(
      { deviceId: new ObjectId(deviceId) },
      {
        $set: {
          exp: exp,
          iat: iat,
        },
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
