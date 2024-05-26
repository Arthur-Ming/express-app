import { deviceCollection } from '../../db/collections/device.collection';
import { ObjectId } from 'mongodb';
import { commentsCollection } from '../../db/collections/comments.collection';
import { DeviceJoinedSessionDB, DeviceOutputData } from './types/interfaces';

export class DeviceQueryRepo {
  private mapToOutput = (deviceJoinedSessionDB: DeviceJoinedSessionDB): DeviceOutputData => {
    return {
      ip: deviceJoinedSessionDB.ip,
      title: deviceJoinedSessionDB.device_name,
      lastActiveDate: new Date(deviceJoinedSessionDB.iat * 1000).toISOString(),
      deviceId: deviceJoinedSessionDB._id.toString(),
    };
  };
  getAllByUserId = async (userId: string) => {
    const found = (await deviceCollection
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) },
        },

        {
          $lookup: {
            from: 'sessions',
            localField: '_id',
            foreignField: 'deviceId',
            as: 'sessionInfo',
          },
        },
        {
          $replaceRoot: {
            newRoot: { $mergeObjects: [{ $arrayElemAt: ['$sessionInfo', 0] }, '$$ROOT'] },
          },
        },
        {
          $project: {
            _id: 1,
            device_name: 1,
            ip: 1,
            iat: 1,
          },
        },
      ])
      .toArray()) as DeviceJoinedSessionDB[];
    return found.map((f) => this.mapToOutput(f));
  };
}
