import { Request } from 'express';

export interface PostInputData {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

export type PostInputDataForSpecificBlog = Omit<PostInputData, 'blogId'>;

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
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
}

export interface PostsPaginationParamsForDB {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  pageNumber: number;
  pageSize: number;
}

export interface PostOutputDataWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostOutputData[];
}

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y>;
export type ParamsId = { id: string };

export interface PostsOutputDataWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostOutputData[];
}
