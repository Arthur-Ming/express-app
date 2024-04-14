import { BlogsRepository } from './blogs.repository';
import {
  BlogOutputDataWithPagination,
  BlogsQueryParamsDB,
  BlogsQueryParamsRequest,
} from './interfaces';

const blogsRepository = new BlogsRepository();

const setDefaultPaginationParams = (query: BlogsQueryParamsRequest): BlogsQueryParamsDB => {
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : 'createdAt',
    sortDirection: query.sortDirection ? query.sortDirection : 'desc',
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : '',
  };
};
export class BlogsService {
  find = async (query: BlogsQueryParamsRequest): Promise<BlogOutputDataWithPagination> => {
    const queryParams = setDefaultPaginationParams(query);
    const items = await blogsRepository.find(queryParams);
    const totalCount = await blogsRepository.getTotalCount(queryParams);

    return {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount: totalCount,
      items,
    };
  };
}
