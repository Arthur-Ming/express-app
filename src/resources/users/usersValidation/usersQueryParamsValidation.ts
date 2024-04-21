import { query } from 'express-validator';
import { queryParamsErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';
import { UsersQueryParamsEnum, UsersSortDirection } from '../types/enum';
import { usersDefaultPaginationParams } from '../helpers/usersDefaultPaginationParams';

export const usersQueryParamsValidation = [
  query(UsersQueryParamsEnum.searchEmailTerm)
    .default(usersDefaultPaginationParams.searchEmailTerm)
    .isString()
    .trim()
    .isLength({ max: 50 }),
  query(UsersQueryParamsEnum.searchLoginTerm)
    .default(usersDefaultPaginationParams.searchLoginTerm)
    .isString()
    .trim()
    .isLength({ max: 50 }),
  query(UsersQueryParamsEnum.sortBy).default(usersDefaultPaginationParams.sortBy).isString().trim(),
  query(UsersQueryParamsEnum.sortDirection)
    .default(usersDefaultPaginationParams.sortDirection)
    .custom(async (value) => {
      const isValid = UsersSortDirection.hasOwnProperty(value);
      if (!isValid) {
        throw new Error(
          `Invalid value: sort direction must be ${UsersSortDirection.asc} or ${UsersSortDirection.desc}`
        );
      }
      return isValid;
    }),
  query(UsersQueryParamsEnum.pageNumber)
    .default(usersDefaultPaginationParams.pageNumber)
    .isInt({ min: 1, max: 20 })
    .toInt(),
  query(UsersQueryParamsEnum.pageSize)
    .default(usersDefaultPaginationParams.pageSize)
    .isNumeric()
    .isInt({ min: 1, max: 20 })
    .toInt(),
  queryParamsErrorsMiddleware,
];
