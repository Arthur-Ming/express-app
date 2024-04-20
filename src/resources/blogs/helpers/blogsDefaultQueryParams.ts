import { BlogsQueryParams, BlogsSortDirection } from '../interfaces';

export const blogsDefaultQueryParams: BlogsQueryParams = {
  pageNumber: 1,
  pageSize: 10,
  sortBy: 'createdAt',
  sortDirection: BlogsSortDirection.desc,
  searchNameTerm: '',
};
