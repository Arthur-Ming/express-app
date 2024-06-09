import { Devices } from '../../db/collections/device.collection';
import { DeviceDbInterface } from '../../db/dbTypes/device-db-interface';
import { ObjectId } from 'mongodb';

export class DeviceRepository {
  add = async (createDeviceDTO: DeviceDbInterface) => {
    const newDevice = await Devices.create(createDeviceDTO);

    return newDevice;
  };

  getById = async (id: string) => {
    const found = await Devices.findById(id);
    if (!found) {
      return null;
    }

    return found;
  };

  getAllByUserId = async (userId: string) => {
    const found = await Devices.find({ userId: new ObjectId(userId) });
    if (!found) {
      return null;
    }

    return found;
  };

  remove = async (id: string) => {
    const deleteResult = await Devices.deleteOne({ _id: new ObjectId(id) });
    return deleteResult.deletedCount === 1;
  };

  removeExcludeCurrent = async (currentDeviceId: string) => {
    const deleteResult = await Devices.deleteMany({
      _id: { $ne: new ObjectId(currentDeviceId) },
    });
    return deleteResult.deletedCount > 0;
  };
}
