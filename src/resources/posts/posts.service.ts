import { PostsRepository } from './posts.repository';
import {
  PostInputDataForSpecificBlog,
  PostOutputDataWithPagination,
  PostsPaginationParams,
  PostsPaginationParamsForDB,
} from './interfaces';

const postsRepository = new PostsRepository();

const setDefaultPaginationParams = (query: PostsPaginationParams): PostsPaginationParamsForDB => {
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : 'createdAt',
    sortDirection: query.sortDirection ? query.sortDirection : 'desc',
  };
};
export class PostsService {
  addPostForSpecificBlog = async (blogId: string, input: PostInputDataForSpecificBlog) => {
    const { id: createdPostId } = await postsRepository.add({
      title: input.title,
      shortDescription: input.shortDescription,
      content: input.content,
      blogId: blogId,
    });
    const createdPost = await postsRepository.findById(createdPostId);
    return createdPost;
  };

  find = async (
    query: PostsPaginationParams,
    blogId?: string
  ): Promise<PostOutputDataWithPagination> => {
    const queryParams = setDefaultPaginationParams(query);
    const items = await postsRepository.find(queryParams, blogId);
    const totalCount = await postsRepository.getTotalCount(queryParams, blogId);
    console.log(items);
    return {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount: totalCount,
      items,
    };
  };
}
