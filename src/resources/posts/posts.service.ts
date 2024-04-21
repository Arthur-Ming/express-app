import { PostsRepository } from './posts.repository';
import {
  PostInputData,
  PostInputDataForSpecificBlog,
  PostOutputData,
  PostOutputDataWithPagination,
  PostsPaginationParams,
} from './types/interfaces';
import { WithId } from 'mongodb';
import { PostDbInterface } from '../../db/dbTypes/post-db-interface';
import { BlogDbInterface } from '../../db/dbTypes/blog-db-interface';
import { BlogsRepository } from '../blogs/blogs.repository';

const postsRepository = new PostsRepository();
const blogsRepository = new BlogsRepository();

export class PostsService {
  private mapToCreatePost = <T extends PostInputDataForSpecificBlog>(
    input: T,
    blog: WithId<BlogDbInterface>
  ): PostDbInterface => {
    return {
      title: input.title,
      shortDescription: input.shortDescription,
      content: input.content,
      blogId: blog._id,
      blogName: blog.name,
      createdAt: new Date(),
    };
  };
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
    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      throw new Error(`blog with id ${blogId} not found`);
    }
    const newPost = this.mapToCreatePost(input, blog);
    const { id: createdPostId } = await postsRepository.add(newPost);
    const createdPost = await postsRepository.findById(createdPostId);
    return createdPost ? this.mapToOutput(createdPost) : null;
  };

  addPost = async (input: PostInputData) => {
    return this.addPostForSpecificBlog(input.blogId, input);
  };

  findByQueryParams = async (
    queryParams: PostsPaginationParams,
    blogId?: string
  ): Promise<PostOutputDataWithPagination> => {
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
