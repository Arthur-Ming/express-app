import { ObjectId } from 'mongodb';

export interface CommentsDbInterface {
  content: string;
  createdAt: Date;
  userId: ObjectId;
  postId: ObjectId;
}
