import { PostsPaginationParams } from '../types/interfaces';
import { PostsQueryParamsEnum, PostsSortDirection } from '../types/enum';

export const postsDefaultQueryParams: PostsPaginationParams = {
  [PostsQueryParamsEnum.sortBy]: 'createdAt',
  [PostsQueryParamsEnum.sortDirection]: PostsSortDirection.desc,
  [PostsQueryParamsEnum.pageNumber]: 1,
  [PostsQueryParamsEnum.pageSize]: 10,
};
