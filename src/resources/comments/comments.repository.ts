import { Comments } from '../../db/collections/comments.collection';
import { CommentsDbInterface } from '../../db/dbTypes/comments-db-interface';
import { ObjectId } from 'mongodb';
import { CommentsInputBody } from './types/interfaces';
import { LikeStatus } from '../../db/dbTypes/comments-likes-db-interface';
import { CommentsLikes } from '../../db/collections/commentsLikes.collection';

export class CommentsRepository {
  getTotalCount = async (postId: string) => {
    return Comments.countDocuments({ postId: new ObjectId(postId) });
  };
  add = async (newCommentDTO: CommentsDbInterface) => {
    const newComment = await Comments.create(newCommentDTO);

    return newComment;
  };

  findCommentById = async (commentId: string) => {
    const foundComment = await Comments.findById(commentId);
    if (!foundComment) {
      return null;
    }

    return foundComment;
  };

  update = async (commentId: string, input: CommentsInputBody): Promise<boolean> => {
    const updateResult = await Comments.updateOne(
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
    const deleteResult = await Comments.deleteOne({ _id: new ObjectId(commentId) });
    return deleteResult.deletedCount === 1;
  };

  addLike = async (authorId: string, commentId: string, status: LikeStatus) => {
    const upsertResult = await CommentsLikes.updateOne(
      {
        authorId: new ObjectId(authorId),
        commentId: new ObjectId(commentId),
      },
      { $set: { status: status } },
      { upsert: true }
    );
    return upsertResult.matchedCount === 1;
  };
}
