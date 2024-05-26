import { DeviceRepository } from './device.repository';
import { SessionsRepo } from '../sessions/sessions.repo';

const deviceRepository = new DeviceRepository();
const sessionsRepo = new SessionsRepo();
export class DeviceService {
  removeExcludeCurrent = async (currentDeviceId: string) => {
    await deviceRepository.removeExcludeCurrent(currentDeviceId);
    await sessionsRepo.removeExcludeCurrent(currentDeviceId);
  };

  removeById = async (deviceId: string) => {
    await deviceRepository.remove(deviceId);
    await sessionsRepo.removeByDeviceId(deviceId);
  };
}
