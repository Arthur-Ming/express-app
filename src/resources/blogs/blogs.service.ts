import { BlogsRepository } from './blogs.repository';
import { BlogInputData, BlogOutputDataWithPagination, BlogsQueryParams } from './types/interfaces';

import { mapToOutput } from './helpers/mapToOutput';
import { mapToCreateBlog } from './helpers/mapToCreateBlog';
import { mapToUpdateBlog } from './helpers/mapToUpdateBlog';

const blogsRepository = new BlogsRepository();

export class BlogsService {
  findByQueryParams = async (
    queryParams: BlogsQueryParams
  ): Promise<BlogOutputDataWithPagination> => {
    const items = await blogsRepository.find(queryParams);
    const totalCount = await blogsRepository.getTotalCount(queryParams);

    return {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount: totalCount,
      items: items.map((item) => mapToOutput(item)),
    };
  };
  findById = async (blogId: string) => {
    const foundBlog = await blogsRepository.findById(blogId);

    if (!foundBlog) {
      return null;
    }

    return mapToOutput(foundBlog);
  };

  addBlog = async (input: BlogInputData) => {
    const newBlog = mapToCreateBlog(input);
    const { id: createdBlogId } = await blogsRepository.add(newBlog);
    const createdBlog = await blogsRepository.findById(createdBlogId);
    return createdBlog ? mapToOutput(createdBlog) : null;
  };

  updateBlog = async (blogId: string, input: BlogInputData) => {
    return await blogsRepository.update(blogId, mapToUpdateBlog(input));
  };
}
