import { query } from 'express-validator';

import { blogsDefaultQueryParams } from '../helpers/blogsDefaultQueryParams';
import { queryParamsErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';
import { BlogsQueryParamsEnum, BlogsSortDirection } from '../types/enum';

export const queryParamsValidation = [
  query(BlogsQueryParamsEnum.searchNameTerm)
    .default(blogsDefaultQueryParams.searchNameTerm)
    .isString()
    .trim()
    .isLength({ max: 20 }),
  query(BlogsQueryParamsEnum.sortBy).default(blogsDefaultQueryParams.sortBy).isString().trim(),
  query(BlogsQueryParamsEnum.sortDirection)
    .default(blogsDefaultQueryParams.sortDirection)
    .custom(async (value) => {
      const isValid = BlogsSortDirection.hasOwnProperty(value);
      if (!isValid) {
        throw new Error(
          `Invalid value: sort direction must be ${BlogsSortDirection.asc} or ${BlogsSortDirection.desc}`
        );
      }
      return isValid;
    }),
  query(BlogsQueryParamsEnum.pageNumber)
    .default(blogsDefaultQueryParams.pageNumber)
    .isInt({ min: 1, max: 20 })
    .toInt(),
  query(BlogsQueryParamsEnum.pageSize)
    .default(blogsDefaultQueryParams.pageSize)
    .isNumeric()
    .isInt({ min: 1, max: 20 })
    .toInt(),
  queryParamsErrorsMiddleware,
];
