import { CommentsSortDirection } from './enum';

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

export interface CommentsOutputDataWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: CommentsOutputData[];
}
