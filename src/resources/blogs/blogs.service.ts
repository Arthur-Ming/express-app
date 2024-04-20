import { BlogsRepository } from './blogs.repository';
import {
  BlogInputData,
  BlogOutputData,
  BlogOutputDataWithPagination,
  BlogsQueryParams,
} from './interfaces';
import { WithId } from 'mongodb';
import { BlogDbInterface } from '../../db/dbTypes/blog-db-interface';

const blogsRepository = new BlogsRepository();

export class BlogsService {
  private mapToOutput = (dbBlog: WithId<BlogDbInterface>): BlogOutputData => {
    return {
      id: dbBlog._id.toString(),
      name: dbBlog.name,
      description: dbBlog.description,
      websiteUrl: dbBlog.websiteUrl,
      createdAt: dbBlog.createdAt,
      isMembership: dbBlog.isMembership,
    };
  };
  private mapToCreateBlog = (input: BlogInputData): BlogDbInterface => {
    return {
      name: input.name,
      description: input.description,
      websiteUrl: input.websiteUrl,
      createdAt: new Date(),
      isMembership: false,
    };
  };
  private mapToUpdateBlog = (input: BlogInputData): BlogInputData => {
    return {
      name: input.name,
      description: input.description,
      websiteUrl: input.websiteUrl,
    };
  };
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
      items: items.map((item) => this.mapToOutput(item)),
    };
  };
  findById = async (blogId: string) => {
    const foundBlog = await blogsRepository.findById(blogId);

    if (!foundBlog) {
      return null;
    }

    return this.mapToOutput(foundBlog);
  };

  addBlog = async (input: BlogInputData) => {
    const newBlog = this.mapToCreateBlog(input);
    const { id: createdBlogId } = await blogsRepository.add(newBlog);
    const createdBlog = await blogsRepository.findById(createdBlogId);
    return createdBlog ? this.mapToOutput(createdBlog) : null;
  };

  updateBlog = async (blogId: string, input: BlogInputData) => {
    return await blogsRepository.update(blogId, this.mapToUpdateBlog(input));
  };
}
