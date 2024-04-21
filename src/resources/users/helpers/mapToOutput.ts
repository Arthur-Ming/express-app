import { WithId } from 'mongodb';

import { UserDbInterface } from '../../../db/dbTypes/user-db-interface';
import { UserOutputData } from '../types/interfaces';

export const mapToOutput = (user: WithId<UserDbInterface>): UserOutputData => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};
