import { ObjectId } from 'mongodb';

interface CommentatorInfo {
  userId: ObjectId;
  userLogin: string;
}
export interface CommentsDbInterface {
  content: string;
  createdAt: Date;
  commentatorInfo: CommentatorInfo;
  postId: ObjectId;
}
