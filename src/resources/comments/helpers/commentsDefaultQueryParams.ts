import { CommentsPaginationParams } from '../types/interfaces';
import { CommentsQueryParamsEnum, CommentsSortDirection } from '../types/enum';

export const commentsDefaultQueryParams: CommentsPaginationParams = {
  [CommentsQueryParamsEnum.sortBy]: 'createdAt',
  [CommentsQueryParamsEnum.sortDirection]: CommentsSortDirection.desc,
  [CommentsQueryParamsEnum.pageNumber]: 1,
  [CommentsQueryParamsEnum.pageSize]: 10,
};
