import { UserInputBody, UserOutputData, UsersPaginationParams } from './types/interfaces';
import { mapToCreateUser } from './helpers/mapToCreateUser';
import { UsersRepository } from './users.repository';
import { mapToOutput } from './helpers/mapToOutput';
import bcrypt from 'bcrypt';
import config from '../../common/config';
import { Pagination } from '../../common/types/interfaces';

const usersRepository = new UsersRepository();
export class UsersService {
  addUser = async (input: UserInputBody) => {
    const salt = await bcrypt.genSalt(config.saltRounds);
    const hash = await bcrypt.hash(input.password, salt);

    input.password = hash;
    const newUser = mapToCreateUser(input);
    const addedUser = await usersRepository.add(newUser);
    return addedUser ? mapToOutput(addedUser) : null;
  };
  findByQueryParams = async (
    queryParams: UsersPaginationParams
  ): Promise<Pagination<UserOutputData[]>> => {
    const items = await usersRepository.find(queryParams);
    const totalCount = await usersRepository.getTotalCount(queryParams);

    return {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount: totalCount,
      items: items.map((item) => mapToOutput(item)),
    };
  };
  updatePassword = async (userId: string, newPassword: string) => {
    const salt = await bcrypt.genSalt(config.saltRounds);
    const hash = await bcrypt.hash(newPassword, salt);

    return usersRepository.updatePassword(userId, hash);
  };
}
