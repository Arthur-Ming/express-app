import { ObjectId, WithId } from 'mongodb';
import { PostDbInterface } from '../../db/dbTypes/post-db-interface';
import { PostInputData, PostOutputData } from './interfaces';
import { postCollection } from '../../db/post.collection';
import { BlogsRepository } from '../blogs/blogs.repository';
import { BlogOutputData } from '../blogs/interfaces';

const blogsRepository = new BlogsRepository();
export class PostsRepository {
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
  private createPost = (input: PostInputData, blog: BlogOutputData): PostDbInterface => {
    return {
      title: input.title,
      shortDescription: input.shortDescription,
      content: input.content,
      blogId: new ObjectId(input.blogId),
      blogName: blog.name,
      createdAt: new Date(),
    };
  };

  find = async () => {
    const foundPosts = await postCollection.find({}).toArray();
    return foundPosts.map((foundPost) => this.mapToOutput(foundPost));
  };
  findById = async (postId: string) => {
    const foundPost = await postCollection.findOne({ _id: new ObjectId(postId) });

    if (!foundPost) {
      return null;
    }

    return this.mapToOutput(foundPost);
  };
  add = async (input: PostInputData) => {
    const blog = await blogsRepository.findById(input.blogId);

    if (!blog) {
      throw new Error(`blog with id ${input.blogId} not found`);
    }
    const newPost = this.createPost(input, blog);

    const insertOneResult = await postCollection.insertOne(newPost);

    return { id: insertOneResult.insertedId.toString() };
  };
  update = async (postId: string, input: PostInputData): Promise<boolean> => {
    const updateResult = await postCollection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          title: input.title,
          shortDescription: input.shortDescription,
          content: input.content,
          blogId: new ObjectId(input.blogId),
        },
      }
    );
    return updateResult.matchedCount === 1;
  };
  remove = async (postId: string): Promise<boolean> => {
    const deleteResult = await postCollection.deleteOne({ _id: new ObjectId(postId) });
    return deleteResult.deletedCount === 1;
  };
}
