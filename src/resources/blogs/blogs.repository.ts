import { BlogInputData, BlogOutputData } from './interfaces';
import { BlogDbInterface } from '../../db/dbTypes/blog-db-interface';
import { blogCollection } from '../../db/blog.collection';
import { ObjectId, WithId } from 'mongodb';

export class BlogsRepository {
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

  private createBlog = (input: BlogInputData): BlogDbInterface => {
    return {
      name: input.name,
      description: input.description,
      websiteUrl: input.websiteUrl,
      createdAt: new Date(),
      isMembership: false,
    };
  };

  private updateBlog = (input: BlogInputData): BlogInputData => {
    return {
      name: input.name,
      description: input.description,
      websiteUrl: input.websiteUrl,
    };
  };

  find = async () => {
    const foundBlogs = await blogCollection.find({}).toArray();
    return foundBlogs.map((foundBlog) => this.mapToOutput(foundBlog));
  };
  findById = async (blogId: string) => {
    const foundBlog = await blogCollection.findOne({ _id: new ObjectId(blogId) });

    if (!foundBlog) {
      return null;
    }

    return this.mapToOutput(foundBlog);
  };
  add = async (input: BlogInputData) => {
    const newBlog = this.createBlog(input);
    const insertOneResult = await blogCollection.insertOne(newBlog);
    return { id: insertOneResult.insertedId.toString() };
  };

  update = async (blogId: string, input: BlogInputData): Promise<boolean> => {
    const updateResult = await blogCollection.updateOne(
      { _id: new ObjectId(blogId) },
      {
        $set: this.updateBlog(input),
      }
    );
    return updateResult.matchedCount === 1;
  };

  remove = async (blogId: string): Promise<boolean> => {
    const deleteResult = await blogCollection.deleteOne({ _id: new ObjectId(blogId) });
    return deleteResult.deletedCount === 1;
  };
}
