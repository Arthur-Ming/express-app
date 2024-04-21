import { query } from 'express-validator';
import { blogsDefaultQueryParams } from '../../blogs/helpers/blogsDefaultQueryParams';
import { queryParamsErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';
import { BlogsQueryParamsEnum, BlogsSortDirection } from '../../blogs/types/enum';
import { PostsQueryParamsEnum, PostsSortDirection } from '../types/enum';
import { postsDefaultQueryParams } from '../helpers/postsDefaultQueryParams';

export const postsQueryParamsValidation = [
  query(PostsQueryParamsEnum.sortBy)
    .default(postsDefaultQueryParams.sortBy)
    .isString()
    .trim()
    .isLength({ max: 20 }),

  query(PostsQueryParamsEnum.sortDirection)
    .default(postsDefaultQueryParams.sortDirection)
    .custom(async (value) => {
      const isValid = BlogsSortDirection.hasOwnProperty(value);
      if (!isValid) {
        throw new Error(
          `Invalid value: sort direction must be ${PostsSortDirection.asc} or ${PostsSortDirection.desc}`
        );
      }
      return isValid;
    }),
  query(PostsQueryParamsEnum.pageNumber)
    .default(postsDefaultQueryParams.pageNumber)
    .isInt({ min: 1, max: 20 })
    .toInt(),
  query(PostsQueryParamsEnum.pageSize)
    .default(postsDefaultQueryParams.pageSize)
    .isNumeric()
    .isInt({ min: 1, max: 20 })
    .toInt(),
  queryParamsErrorsMiddleware,
];
