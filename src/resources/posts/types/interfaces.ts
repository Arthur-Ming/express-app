import { PostsQueryParamsEnum, PostsSortDirection } from './enum';
import { WithId } from 'mongodb';
import { PostDbInterface } from '../../../db/dbTypes/post-db-interface';
import { BlogDbInterface } from '../../../db/dbTypes/blog-db-interface';

export interface PostInputDataForSpecificBlog {
  title: string;
  shortDescription: string;
  content: string;
}

export interface PostInputData extends PostInputDataForSpecificBlog {
  blogId: string;
}

export interface PostOutputData {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
}

export interface PostsPaginationParams {
  [PostsQueryParamsEnum.sortBy]: string;
  [PostsQueryParamsEnum.sortDirection]: PostsSortDirection;
  [PostsQueryParamsEnum.pageNumber]: number;
  [PostsQueryParamsEnum.pageSize]: number;
}

export interface PostJoinedBlogDB extends WithId<PostDbInterface> {
  blogName: BlogDbInterface['name'];
}
