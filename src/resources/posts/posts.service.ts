import { PostsRepository } from './posts.repository';
import {
  PostInputDataForSpecificBlog,
  PostOutputData,
  PostOutputDataWithPagination,
  PostsPaginationParams,
  PostsPaginationParamsForDB,
} from './interfaces';
import { ObjectId, WithId } from 'mongodb';
import { PostDbInterface } from '../../db/dbTypes/post-db-interface';
import { postCollection } from '../../db/post.collection';

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
  private mapToOutput = (dbPost: WithId<PostDbInterface>): PostOutputData => {
    return {
      id: dbPost._id.toString(),
      title: dbPost.title,
      shortDescription: dbPost.shortDescription,
      content: dbPost.content,
      blogId: dbPost.blogId.toString(),
      blogName: dbPost.blogName,
      createdAt: dbPost.createdAt,
    };
  };
  addPostForSpecificBlog = async (blogId: string, input: PostInputDataForSpecificBlog) => {
    const { id: createdPostId } = await postsRepository.add({
      title: input.title,
      shortDescription: input.shortDescription,
      content: input.content,
      blogId: blogId,
    });
    const createdPost = await postsRepository.findById(createdPostId);
    return createdPost ? this.mapToOutput(createdPost) : null;
  };

  findByQueryParams = async (
    query: PostsPaginationParams,
    blogId?: string
  ): Promise<PostOutputDataWithPagination> => {
    const queryParams = setDefaultPaginationParams(query);
    const items = await postsRepository.find(queryParams, blogId);
    const totalCount = await postsRepository.getTotalCount(queryParams, blogId);

    return {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount: totalCount,
      items: items.map((item) => this.mapToOutput(item)),
    };
  };

  findById = async (postId: string) => {
    const foundPost = await postsRepository.findById(postId);

    if (!foundPost) {
      return null;
    }

    return this.mapToOutput(foundPost);
  };
}
