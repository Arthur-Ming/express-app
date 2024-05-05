import { CommentsSortDirection } from './enum';
import { CommentsDbInterface } from '../../../db/dbTypes/comments-db-interface';
import { UserDbInterface } from '../../../db/dbTypes/user-db-interface';
import { WithId } from 'mongodb';

export interface CommentatorInfo {
  userId: string;
  userLogin: string | null;
}

export interface CommentsOutputData {
  id: string;
  content: string;
  createdAt: Date;
  commentatorInfo: CommentatorInfo;
}

export interface CommentsInputBody {
  content: string;
}

export interface CreateCommentsBody {
  content: string;
  postId: string;
  userId: string;
}

export interface CommentsPaginationParams {
  sortBy: string;
  sortDirection: CommentsSortDirection;
  pageNumber: number;
  pageSize: number;
}

export interface CommentsJoinedCommentatorInfoDB extends WithId<CommentsDbInterface> {
  login?: string;
}
