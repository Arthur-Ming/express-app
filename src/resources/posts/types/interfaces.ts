import { PostsQueryParamsEnum, PostsSortDirection } from './enum';
import { WithId } from 'mongodb';
import { PostDbInterface } from '../../../db/dbTypes/post-db-interface';
import { BlogDbInterface } from '../../../db/dbTypes/blog-db-interface';
import { PostsLikes } from '../../../db/collections/postsLikes.collection';
import { PostsLikesDbInterface } from '../../../db/dbTypes/posts-likes-db-interface';
import { UserDbInterface } from '../../../db/dbTypes/user-db-interface';
import { LikeStatus } from '../../../db/dbTypes/likes-db-interface';

export interface PostInputDataForSpecificBlog {
  title: string;
  shortDescription: string;
  content: string;
}

export interface PostInputData extends PostInputDataForSpecificBlog {
  blogId: string;
}
export interface NewestLikes {
  addedAt: string;
  userId: string | null;
  login: string | null;
}
export interface LikesInfo {
  likesCount: number;
  dislikesCount: number;
  myStatus: LikeStatus;
  newestLikes: NewestLikes[];
}

export interface PostOutputData {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
  extendedLikesInfo: LikesInfo;
}

export interface PostsPaginationParams {
  [PostsQueryParamsEnum.sortBy]: string;
  [PostsQueryParamsEnum.sortDirection]: PostsSortDirection;
  [PostsQueryParamsEnum.pageNumber]: number;
  [PostsQueryParamsEnum.pageSize]: number;
}
interface ExtendedLikesInfo extends WithId<PostsLikesDbInterface> {
  likeAuthor: WithId<UserDbInterface> | null;
}
export interface PostJoinedBlogDB extends WithId<PostDbInterface> {
  blogName: BlogDbInterface['name'];
  likes: WithId<ExtendedLikesInfo>[];
}
