import { BlogInputData, BlogsQueryParams } from './interfaces';
import { BlogDbInterface } from '../../db/dbTypes/blog-db-interface';
import { blogCollection } from '../../db/blog.collection';
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
    return await blogCollection.countDocuments(filter(queryParams));
  };

  find = async (queryParams: BlogsQueryParams) => {
    const foundBlogs = await blogCollection
      .find(filter(queryParams))
      .sort(queryParams.sortBy, queryParams.sortDirection)
      .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
      .limit(queryParams.pageSize)
      .toArray();
    return foundBlogs;
  };
  findById = async (blogId: string) => {
    const foundBlog = await blogCollection.findOne({ _id: new ObjectId(blogId) });

    if (!foundBlog) {
      return null;
    }

    return foundBlog;
  };
  add = async (newBlog: BlogDbInterface) => {
    const insertOneResult = await blogCollection.insertOne(newBlog);
    return { id: insertOneResult.insertedId.toString() };
  };

  update = async (blogId: string, input: BlogInputData): Promise<boolean> => {
    const updateResult = await blogCollection.updateOne(
      { _id: new ObjectId(blogId) },
      {
        $set: input,
      }
    );
    return updateResult.matchedCount === 1;
  };

  remove = async (blogId: string): Promise<boolean> => {
    const deleteResult = await blogCollection.deleteOne({ _id: new ObjectId(blogId) });
    return deleteResult.deletedCount === 1;
  };
}
