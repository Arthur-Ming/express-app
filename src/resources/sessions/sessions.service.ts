import { SessionsRepo } from './sessions.repo';

const sessionsRepo = new SessionsRepo();
export class SessionsService {
  setSession = async (userId: string, refreshToken: string) => {
    return await sessionsRepo.upsert(userId, refreshToken);
  };
  logout = async (userId: string) => {
    return await sessionsRepo.remove(userId);
  };

  findByUserId = async (userId: string) => {
    return await sessionsRepo.findByUserId(userId);
  };
}
