import {
  CommentsOutputData,
  CommentsOutputDataWithPagination,
  CommentsPaginationParams,
  CreateCommentsBody,
} from './types/interfaces';
import { CommentsRepository } from './comments.repository';
import { CommentsDbInterface } from '../../db/dbTypes/comments-db-interface';
import { ObjectId, WithId } from 'mongodb';
import { UserDbInterface } from '../../db/dbTypes/user-db-interface';
import { UsersRepository } from '../users/users.repository';
import { PostOutputDataWithPagination, PostsPaginationParams } from '../posts/types/interfaces';

const commentsRepository = new CommentsRepository();
const usersRepository = new UsersRepository();
export class CommentsService {
  private mapToCreateComment = (
    input: CreateCommentsBody,
    user: WithId<UserDbInterface>
  ): CommentsDbInterface => {
    return {
      content: input.content,
      postId: new ObjectId(input.postId),
      commentatorInfo: {
        userId: user._id,
        userLogin: user.login,
      },
      createdAt: new Date(),
    };
  };
  private mapToOutputComment = (comment: WithId<CommentsDbInterface>): CommentsOutputData => {
    return {
      id: comment._id.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
      commentatorInfo: {
        userId: comment.commentatorInfo.userId.toString(),
        userLogin: comment.commentatorInfo.userLogin,
      },
    };
  };
  addCommentForPost = async (input: CreateCommentsBody) => {
    const user = await usersRepository.getUserById(input.userId);
    if (!user) {
      return null;
    }
    const newComment = this.mapToCreateComment(input, user);
    const { id: commentId } = await commentsRepository.add(newComment);
    const comment = await commentsRepository.getCommentById(commentId);

    if (!comment) {
      return null;
    }

    return this.mapToOutputComment(comment);
  };

  findByQueryParams = async (
    queryParams: CommentsPaginationParams,
    postId: string
  ): Promise<CommentsOutputDataWithPagination> => {
    const items = await commentsRepository.find(queryParams, postId);
    const totalCount = await commentsRepository.getTotalCount(postId);

    return {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount: totalCount,
      items: items.map((item) => this.mapToOutputComment(item)),
    };
  };
}
