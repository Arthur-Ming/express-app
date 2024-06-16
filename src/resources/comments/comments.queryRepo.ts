import { Comments } from '../../db/collections/comments.collection';
import { ObjectId } from 'mongodb';
import {
  CommentsJoinedCommentatorInfoDB,
  CommentsOutputData,
  CommentsPaginationParams,
} from './types/interfaces';
import { CommentsRepository } from './comments.repository';
import { Pagination } from '../../common/types/interfaces';
import { CommentsLikesDbInterface } from '../../db/dbTypes/comments-likes-db-interface';
import { LikeStatus } from '../../db/dbTypes/likes-db-interface';

const getCurrentUserLikeStatus = (
  likes: CommentsLikesDbInterface[],
  currentUserId?: string
): LikeStatus => {
  if (!currentUserId) {
    return LikeStatus.None;
  }
  const currentUserLike = likes.find((like) => like.authorId.toString() === currentUserId);
  if (!currentUserLike) {
    return LikeStatus.None;
  }

  return currentUserLike.status;
};

const commentsRepository = new CommentsRepository();
export class CommentsQueryRepo {
  private mapToOutput = (
    commentJoinedCommentatorInfo: CommentsJoinedCommentatorInfoDB,
    requestUserId?: string
  ): CommentsOutputData => {
    return {
      id: commentJoinedCommentatorInfo._id.toString(),
      content: commentJoinedCommentatorInfo.content,
      createdAt: commentJoinedCommentatorInfo.createdAt,
      commentatorInfo: {
        userLogin: commentJoinedCommentatorInfo?.login || null,
        userId: commentJoinedCommentatorInfo.userId.toString(),
      },
      likesInfo: {
        likesCount: commentJoinedCommentatorInfo.likes.filter(
          (like) => like.status === LikeStatus.Like
        ).length,
        dislikesCount: commentJoinedCommentatorInfo.likes.filter(
          (like) => like.status === LikeStatus.Dislike
        ).length,
        myStatus: getCurrentUserLikeStatus(commentJoinedCommentatorInfo.likes, requestUserId),
      },
    };
  };
  private joinOptions = () => {
    return [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'commentatorInfo',
        },
      },
      {
        $lookup: {
          from: 'comments_likes',
          localField: '_id',
          foreignField: 'commentId',
          as: 'likes',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$commentatorInfo', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          login: 1,
          userId: 1,
          likes: 1,
        },
      },
    ];
  };

  find = async (
    queryParams: CommentsPaginationParams,
    postId: string,
    requestUserId?: string
  ): Promise<Pagination<CommentsOutputData[]>> => {
    const comments = await Comments.aggregate([
      {
        $match: { postId: new ObjectId(postId) },
      },
      ...this.joinOptions(),
      { $sort: { [queryParams.sortBy]: queryParams.sortDirection === 'asc' ? 1 : -1 } },
      { $skip: (queryParams.pageNumber - 1) * queryParams.pageSize },
      { $limit: queryParams.pageSize },
    ]);

    const totalCount = await commentsRepository.getTotalCount(postId);
    return {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount: totalCount,
      items: comments.map((item) => this.mapToOutput(item, requestUserId)),
    };
  };

  findById = async (commentId: string, requestUserId?: string) => {
    const comment = await Comments.aggregate([
      {
        $match: { _id: new ObjectId(commentId) },
      },
      ...this.joinOptions(),
      { $limit: 1 },
    ]);

    if (!comment || !comment[0]) {
      return null;
    }

    return this.mapToOutput(comment[0], requestUserId);
  };
}
