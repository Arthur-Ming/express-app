import { CommentsOutputData, CreateCommentsBody } from './types/interfaces';
import { CommentsRepository } from './comments.repository';
import { CommentsDbInterface } from '../../db/dbTypes/comments-db-interface';
import { ObjectId, WithId } from 'mongodb';
import { UserDbInterface } from '../../db/dbTypes/user-db-interface';
import { UsersRepository } from '../users/users.repository';

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
      userId: user._id,
      createdAt: new Date(),
    };
  };

  private mapToOutput = (
    comment: WithId<CommentsDbInterface>,
    user: WithId<UserDbInterface>
  ): CommentsOutputData => {
    return {
      id: comment._id.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
      commentatorInfo: {
        userLogin: user.login,
        userId: user._id.toString(),
      },
    };
  };
  addCommentForPost = async (input: CreateCommentsBody) => {
    const user = await usersRepository.getUserById(input.userId);
    if (!user) {
      return null;
    }
    const newComment = this.mapToCreateComment(input, user);
    const comment = await commentsRepository.add(newComment);

    if (!comment) {
      return null;
    }

    return this.mapToOutput(comment, user);
  };
}
