import { SessionsRepo } from './sessions.repo';
import { SessionDbInterface } from '../../db/dbTypes/session-db-interface';
import { CreateSessionDTO, RefreshSessionDTO } from './types/interfaces';
import { ObjectId } from 'mongodb';

const sessionsRepo = new SessionsRepo();
export class SessionsService {
  add = async (dto: CreateSessionDTO) => {
    return await sessionsRepo.add(dto);
  };
  setSession = async (userId: string, refreshToken: string) => {
    return await sessionsRepo.upsert(userId, refreshToken);
  };

  refresh = async (refreshSessionDTO: RefreshSessionDTO) => {
    return await sessionsRepo.update(refreshSessionDTO);
  };
  logout = async (deviceId: string) => {
    return await sessionsRepo.removeByDeviceId(deviceId);
  };

  findByDeviceId = async (deviceId: string) => {
    return await sessionsRepo.findByDeviceId(deviceId);
  };
}
