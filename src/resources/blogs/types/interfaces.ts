import { BlogsQueryParamsEnum, BlogsSortDirection } from './enum';

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

export interface BlogsQueryParams {
  [BlogsQueryParamsEnum.searchNameTerm]: string;
  [BlogsQueryParamsEnum.sortBy]: string;
  [BlogsQueryParamsEnum.sortDirection]: BlogsSortDirection;
  [BlogsQueryParamsEnum.pageNumber]: number;
  [BlogsQueryParamsEnum.pageSize]: number;
}
