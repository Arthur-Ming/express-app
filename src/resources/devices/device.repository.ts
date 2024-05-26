import { deviceCollection } from '../../db/collections/device.collection';
import { DeviceDbInterface } from '../../db/dbTypes/device-db-interface';
import { ObjectId } from 'mongodb';

export class DeviceRepository {
  add = async (createDeviceDTO: DeviceDbInterface) => {
    const insertOneResult = await deviceCollection.insertOne(createDeviceDTO);

    return { id: insertOneResult.insertedId.toString() };
  };

  getById = async (id: string) => {
    const found = await deviceCollection.findOne({ _id: new ObjectId(id) });
    if (!found) {
      return null;
    }

    return found;
  };

  getAllByUserId = async (userId: string) => {
    const found = await deviceCollection.find({ userId: new ObjectId(userId) });
    if (!found) {
      return null;
    }

    return found.toArray();
  };

  remove = async (id: string) => {
    const deleteResult = await deviceCollection.deleteOne({ _id: new ObjectId(id) });
    return deleteResult.deletedCount === 1;
  };

  removeExcludeCurrent = async (currentDeviceId: string) => {
    const deleteResult = await deviceCollection.deleteMany({
      _id: { $ne: new ObjectId(currentDeviceId) },
    });
    return deleteResult.deletedCount > 0;
  };
}
