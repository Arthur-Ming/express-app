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

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y>;
export type ParamsId = { id: string };
