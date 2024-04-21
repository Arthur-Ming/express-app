import {
  UserInputBody,
  UserOutputDataWithPagination,
  UsersPaginationParams,
} from './types/interfaces';
import { mapToCreateUser } from './helpers/mapToCreateUser';
import { UsersRepository } from './users.repository';
import { mapToOutput } from './helpers/mapToOutput';
import { BlogOutputDataWithPagination, BlogsQueryParams } from '../blogs/types/interfaces';

const usersRepository = new UsersRepository();
export class UsersService {
  addUser = async (input: UserInputBody) => {
    const newUser = mapToCreateUser(input);
    const { id: addedUserId } = await usersRepository.add(newUser);
    const addedUser = await usersRepository.findById(addedUserId);
    return addedUser ? mapToOutput(addedUser) : null;
  };
  findByQueryParams = async (
    queryParams: UsersPaginationParams
  ): Promise<UserOutputDataWithPagination> => {
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
}
