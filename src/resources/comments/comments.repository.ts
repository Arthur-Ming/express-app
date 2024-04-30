import { commentsCollection } from '../../db/comments.collection';
import { CommentsDbInterface } from '../../db/dbTypes/comments-db-interface';
import { ObjectId } from 'mongodb';
import { CommentsInputBody, CommentsPaginationParams } from './types/interfaces';
import { PostInputData, PostsPaginationParams } from '../posts/types/interfaces';
import { postCollection } from '../../db/post.collection';

export class CommentsRepository {
  find = async (queryParams: CommentsPaginationParams, postId: string) => {
    return await commentsCollection
      .find({
        postId: new ObjectId(postId),
      })
      .sort(queryParams.sortBy, queryParams.sortDirection)
      .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
      .limit(queryParams.pageSize)
      .toArray();
  };

  getTotalCount = async (postId: string) => {
    return await commentsCollection.countDocuments({ postId: new ObjectId(postId) });
  };
  add = async (newComment: CommentsDbInterface) => {
    const insertOneResult = await commentsCollection.insertOne(newComment);

    return { id: insertOneResult.insertedId.toString() };
  };

  getCommentById = async (commentId: string) => {
    const foundComment = await commentsCollection.findOne({ _id: new ObjectId(commentId) });
    if (!foundComment) {
      return null;
    }

    return foundComment;
  };
  update = async (commentId: string, input: CommentsInputBody): Promise<boolean> => {
    const updateResult = await commentsCollection.updateOne(
      { _id: new ObjectId(commentId) },
      {
        $set: {
          content: input.content,
        },
      }
    );
    return updateResult.matchedCount === 1;
  };

  remove = async (commentId: string): Promise<boolean> => {
    const deleteResult = await commentsCollection.deleteOne({ _id: new ObjectId(commentId) });
    return deleteResult.deletedCount === 1;
  };
}
