import { BlogInputData, BlogsQueryParams } from './types/interfaces';
import { BlogDbInterface } from '../../db/dbTypes/blog-db-interface';
import { Blogs } from '../../db/collections/blog.collection';
import { ObjectId } from 'mongodb';

const filter = ({ searchNameTerm }: BlogsQueryParams) => {
  return searchNameTerm
    ? {
        name: {
          $regex: searchNameTerm,
          $options: 'i',
        },
      }
    : {};
};

export class BlogsRepository {
  getTotalCount = async (queryParams: BlogsQueryParams) => {
    return Blogs.countDocuments(filter(queryParams));
  };

  find = async (queryParams: BlogsQueryParams) => {
    const foundBlogs = await Blogs.find(
      filter(queryParams),
      {},
      {
        sort: { [queryParams.sortBy]: queryParams.sortDirection === 'asc' ? 1 : -1 },
        skip: (queryParams.pageNumber - 1) * queryParams.pageSize,
        limit: queryParams.pageSize,
      }
    );

    return foundBlogs;
  };
  findById = async (blogId: string) => {
    const foundBlog = await Blogs.findById(blogId);

    if (!foundBlog) {
      return null;
    }

    return foundBlog;
  };
  add = async (newBlogDTO: BlogDbInterface) => {
    const newBlog = await Blogs.create(newBlogDTO);

    return newBlog;
  };

  update = async (blogId: string, input: BlogInputData): Promise<boolean> => {
    const updateResult = await Blogs.updateOne(
      { _id: new ObjectId(blogId) },
      {
        $set: input,
      }
    );
    return updateResult.matchedCount === 1;
  };

  remove = async (blogId: string): Promise<boolean> => {
    const deleteResult = await Blogs.deleteOne({ _id: new ObjectId(blogId) });
    return deleteResult.deletedCount === 1;
  };
}
