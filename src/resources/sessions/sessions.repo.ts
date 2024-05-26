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
  findByDeviceId = async (deviceId: string) => {
    const foundSession = await sessionCollection.findOne({ deviceId: new ObjectId(deviceId) });
    return foundSession;
  };

  removeExcludeCurrent = async (currentDeviceId: string) => {
    const deleteResult = await sessionCollection.deleteMany({
      deviceId: { $ne: new ObjectId(currentDeviceId) },
    });
    return deleteResult.deletedCount === 1;
  };

  removeByDeviceId = async (deviceId: string) => {
    const deleteResult = await sessionCollection.deleteOne({ deviceId: new ObjectId(deviceId) });
    return deleteResult.deletedCount === 1;
  };
}
