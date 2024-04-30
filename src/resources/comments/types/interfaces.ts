import { CommentsBodyFieldsEnum } from './enum';

interface CommentatorInfo {
  userId: string;
  userLogin: string;
}

export interface CommentsOutputData {
  id: string;
  content: string;
  createdAt: Date;
  commentatorInfo: CommentatorInfo;
}

export interface CommentsInputBody {
  [CommentsBodyFieldsEnum.content]: string;
}
