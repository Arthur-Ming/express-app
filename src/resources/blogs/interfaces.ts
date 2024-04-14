import { Request } from 'express';

export interface BlogInputData {
  name: string;
  description: string;
  websiteUrl: string;
}

export interface BlogOutputData {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
  isMembership: boolean;
}

export interface BlogsQueryParamsRequest {
  searchNameTerm?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
}

export interface BlogsQueryParamsDB {
  searchNameTerm: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  pageNumber: number;
  pageSize: number;
}

export interface BlogOutputDataWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogOutputData[];
}

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y>;
export type ParamsId = { id: string };
