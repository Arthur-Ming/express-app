import { UserInputBody } from '../types/interfaces';
import { UserDbInterface } from '../../../db/dbTypes/user-db-interface';

export const mapToCreateUser = (input: UserInputBody): UserDbInterface => {
  return {
    login: input.login,
    email: input.email,
    password: input.password,
    createdAt: new Date(),
  };
};
