import { UsersPaginationParams } from '../types/interfaces';
import { UsersQueryParamsEnum, UsersSortDirection } from '../types/enum';

export const usersDefaultPaginationParams: UsersPaginationParams = {
  [UsersQueryParamsEnum.sortBy]: 'createdAt',
  [UsersQueryParamsEnum.sortDirection]: UsersSortDirection.desc,
  [UsersQueryParamsEnum.pageNumber]: 1,
  [UsersQueryParamsEnum.pageSize]: 10,
  [UsersQueryParamsEnum.searchLoginTerm]: '',
  [UsersQueryParamsEnum.searchEmailTerm]: '',
};
