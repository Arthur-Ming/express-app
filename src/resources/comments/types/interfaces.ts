import { CommentsSortDirection } from './enum';
import { CommentsDbInterface } from '../../../db/dbTypes/comments-db-interface';
import { WithId } from 'mongodb';
import {
  CommentsLikesDbInterface,
  LikeStatus,
} from '../../../db/dbTypes/comments-likes-db-interface';

export interface CommentatorInfo {
  userId: string;
  userLogin: string | null;
}

export interface LikesInfo {
  likesCount: number;
  dislikesCount: number;
  myStatus: LikeStatus;
}

export interface CommentsOutputData {
  id: string;
  content: string;
  createdAt: Date;
  commentatorInfo: CommentatorInfo;
  likesInfo: LikesInfo;
}

export interface CommentsInputBody {
  content: string;
}

export interface LikeInputBody {
  likeStatus: LikeStatus;
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
  likes: CommentsLikesDbInterface[];
}
