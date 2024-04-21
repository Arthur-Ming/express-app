import { BlogsQueryParams } from '../types/interfaces';
import { BlogsQueryParamsEnum, BlogsSortDirection } from '../types/enum';

export const blogsDefaultQueryParams: BlogsQueryParams = {
  [BlogsQueryParamsEnum.pageNumber]: 1,
  [BlogsQueryParamsEnum.pageSize]: 10,
  [BlogsQueryParamsEnum.sortBy]: 'createdAt',
  [BlogsQueryParamsEnum.sortDirection]: BlogsSortDirection.desc,
  [BlogsQueryParamsEnum.searchNameTerm]: '',
};
