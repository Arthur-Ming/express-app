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

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y>;
export type ParamsId = { id: string };
