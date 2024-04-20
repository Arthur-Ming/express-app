import { body, param, query } from 'express-validator';
import { paramIdCheckErrorsMiddleware } from '../../../utils/paramIdCheckErrorsMiddleware';
import {
  inputCheckErrorsMiddleware,
  queryParamsErrorsMiddleware,
} from '../../../utils/inputCheckErrorsMiddleware';
import { blogsDefaultQueryParams } from '../helpers/blogsDefaultQueryParams';
import { BlogsSortDirection } from '../interfaces';

export const blogsInputValidation = [
  body('name').isString().trim().isLength({ min: 3, max: 15 }),
  body('description').isString().trim().isLength({ min: 3, max: 500 }),
  body('websiteUrl').isURL().isLength({ min: 3, max: 100 }),
  inputCheckErrorsMiddleware,
];

export const paramsIdValidation = [param('id').isMongoId(), paramIdCheckErrorsMiddleware];

export const queryParamsValidation = [
  query('searchNameTerm')
    .default(blogsDefaultQueryParams.searchNameTerm)
    .isString()
    .trim()
    .isLength({ max: 20 })
    .default(blogsDefaultQueryParams.searchNameTerm),
  query('sortBy').default(blogsDefaultQueryParams.sortBy).isString().trim(),
  query('sortDirection')
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
  query('pageNumber')
    .default(blogsDefaultQueryParams.pageNumber)
    .isInt({ min: 1, max: 20 })
    .toInt(),
  query('pageSize')
    .default(blogsDefaultQueryParams.pageSize)
    .isNumeric()
    .isInt({ min: 1, max: 20 })
    .toInt(),
  queryParamsErrorsMiddleware,
];
