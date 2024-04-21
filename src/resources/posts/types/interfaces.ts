import { PostsQueryParamsEnum, PostsSortDirection } from './enum';

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

export interface PostOutputDataWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostOutputData[];
}

export interface PostsOutputDataWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostOutputData[];
}
