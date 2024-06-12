import { ObjectId } from 'mongodb';

export enum LikeStatus {
  None = 'None',
  Like = 'Like',
  Dislike = 'Dislike',
}

export interface CommentsLikesDbInterface {
  createdAt: Date;
  status: LikeStatus;
  authorId: ObjectId;
  commentId: ObjectId;
}
