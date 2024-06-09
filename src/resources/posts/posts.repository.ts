import { ObjectId } from 'mongodb';
import { PostDbInterface } from '../../db/dbTypes/post-db-interface';
import { PostInputData, PostsPaginationParams } from './types/interfaces';
import { Posts } from '../../db/collections/post.collection';

export class PostsRepository {
  private filter = (blogId?: string) => {
    return blogId
      ? {
          blogId: new ObjectId(blogId),
        }
      : {};
  };

  getTotalCount = (queryParams: PostsPaginationParams, blogId?: string) => {
    return Posts.countDocuments(this.filter(blogId));
  };

  find = async (queryParams: PostsPaginationParams, blogId?: string) => {
    const foundPosts = await Posts.find(
      this.filter(blogId),
      {},
      {
        sort: { [queryParams.sortBy]: queryParams.sortDirection === 'asc' ? 1 : -1 },
        skip: (queryParams.pageNumber - 1) * queryParams.pageSize,
        limit: queryParams.pageSize,
      }
    );

    return foundPosts;
  };

  findById = async (postId: string) => {
    const foundPost = await Posts.findById(postId);

    if (!foundPost) {
      return null;
    }

    return foundPost;
  };

  add = async (newPostDTO: PostDbInterface) => {
    const newPost = await Posts.create(newPostDTO);

    return newPost;
  };
  update = async (postId: string, input: PostInputData): Promise<boolean> => {
    const updateResult = await Posts.updateOne(
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
    const deleteResult = await Posts.deleteOne({ _id: new ObjectId(postId) });
    return deleteResult.deletedCount === 1;
  };
}
