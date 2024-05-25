import { deviceCollection } from '../../db/collections/device.collection';
import { DeviceDbInterface } from '../../db/dbTypes/device-db-interface';
import { commentsCollection } from '../../db/collections/comments.collection';
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
}
