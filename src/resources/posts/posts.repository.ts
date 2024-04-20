import { ObjectId, WithId } from 'mongodb';
import { PostDbInterface } from '../../db/dbTypes/post-db-interface';
import { PostInputData, PostOutputData, PostsPaginationParamsForDB } from './interfaces';
import { postCollection } from '../../db/post.collection';
import { BlogsRepository } from '../blogs/blogs.repository';
import { BlogOutputData } from '../blogs/interfaces';
import { BlogDbInterface } from '../../db/dbTypes/blog-db-interface';

const blogsRepository = new BlogsRepository();
export class PostsRepository {
  private createPost = (input: PostInputData, blog: BlogDbInterface): PostDbInterface => {
    return {
      title: input.title,
      shortDescription: input.shortDescription,
      content: input.content,
      blogId: new ObjectId(input.blogId),
      blogName: blog.name,
      createdAt: new Date(),
    };
  };

  getTotalCount = async (queryParams: PostsPaginationParamsForDB, blogId?: string) => {
    if (!blogId) {
      return await postCollection.countDocuments({});
    }

    return await postCollection.countDocuments({
      blogId: new ObjectId(blogId),
    });
  };

  find = async (queryParams: PostsPaginationParamsForDB, blogId?: string) => {
    if (!blogId) {
      const foundPosts = await postCollection
        .find({})
        .sort(queryParams.sortBy, queryParams.sortDirection)
        .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
        .limit(queryParams.pageSize)
        .toArray();
      return foundPosts;
    }

    const foundPosts = await postCollection
      .find({
        blogId: new ObjectId(blogId),
      })
      .sort(queryParams.sortBy, queryParams.sortDirection)
      .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
      .limit(queryParams.pageSize)
      .toArray();
    return foundPosts;
  };

  findById = async (postId: string) => {
    const foundPost = await postCollection.findOne({ _id: new ObjectId(postId) });

    if (!foundPost) {
      return null;
    }

    return foundPost;
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
