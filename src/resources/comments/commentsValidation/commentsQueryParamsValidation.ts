import { query } from 'express-validator';
import { queryParamsErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';
import { BlogsSortDirection } from '../../blogs/types/enum';
import { commentsDefaultQueryParams } from '../helpers/commentsDefaultQueryParams';
import { CommentsQueryParamsEnum, CommentsSortDirection } from '../types/enum';

export const commentsQueryParamsValidation = [
  query(CommentsQueryParamsEnum.sortBy)
    .default(commentsDefaultQueryParams.sortBy)
    .isString()
    .trim()
    .isLength({ max: 20 }),

  query(CommentsQueryParamsEnum.sortDirection)
    .default(commentsDefaultQueryParams.sortDirection)
    .custom(async (value) => {
      const isValid = BlogsSortDirection.hasOwnProperty(value);
      if (!isValid) {
        throw new Error(
          `Invalid value: sort direction must be ${CommentsSortDirection.asc} or ${CommentsSortDirection.desc}`
        );
      }
      return isValid;
    }),
  query(CommentsQueryParamsEnum.pageNumber)
    .default(commentsDefaultQueryParams.pageNumber)
    .isInt({ min: 1, max: 20 })
    .toInt(),
  query(CommentsQueryParamsEnum.pageSize)
    .default(commentsDefaultQueryParams.pageSize)
    .isNumeric()
    .isInt({ min: 1, max: 20 })
    .toInt(),
  queryParamsErrorsMiddleware,
];
