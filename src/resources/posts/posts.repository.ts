import { ObjectId } from 'mongodb';
import { PostDbInterface } from '../../db/dbTypes/post-db-interface';
import { PostInputData, PostsPaginationParams } from './types/interfaces';
import { postCollection } from '../../db/post.collection';

export class PostsRepository {
  private filter = (blogId?: string) => {
    return blogId
      ? {
          blogId: new ObjectId(blogId),
        }
      : {};
  };

  getTotalCount = async (queryParams: PostsPaginationParams, blogId?: string) => {
    return await postCollection.countDocuments(this.filter(blogId));
  };

  find = async (queryParams: PostsPaginationParams, blogId?: string) => {
    return await postCollection
      .find(this.filter(blogId))
      .sort(queryParams.sortBy, queryParams.sortDirection)
      .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
      .limit(queryParams.pageSize)
      .toArray();
  };

  findById = async (postId: string) => {
    const foundPost = await postCollection.findOne({ _id: new ObjectId(postId) });

    if (!foundPost) {
      return null;
    }

    return foundPost;
  };
  add = async (newPost: PostDbInterface) => {
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
