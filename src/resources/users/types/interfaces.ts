import { UsersBodyFieldsEnum, UsersQueryParamsEnum, UsersSortDirection } from './enum';

export interface UserOutputData {
  id: string;
  login: string;
  email: string;
  createdAt: Date;
}

export interface UserInputBody {
  login: string;
  password: string;
  email: string;
}

export interface UserOutputDataWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserOutputData[];
}

export interface UsersPaginationParams {
  [UsersQueryParamsEnum.sortBy]: string;
  [UsersQueryParamsEnum.sortDirection]: UsersSortDirection;
  [UsersQueryParamsEnum.pageNumber]: number;
  [UsersQueryParamsEnum.pageSize]: number;
  [UsersQueryParamsEnum.searchLoginTerm]: string;
  [UsersQueryParamsEnum.searchEmailTerm]: string;
}

export interface LoginUserBody {
  loginOrEmail: string;
  password: string;
}
