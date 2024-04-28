import { Request, Response } from 'express';
import { UserOutputDataWithPagination, UsersPaginationParams } from '../../users/types/interfaces';
import { httpStatutes } from '../../../common/httpStatutes';

export const getCommentById = async (req: Request, res: Response) => {
  // const users = await usersService.findByQueryParams(req.query as UsersPaginationParams);
  res.status(httpStatutes.OK_200).json('get comments');
};

export const addComment = async (req: Request, res: Response) => {
  // const users = await usersService.findByQueryParams(req.query as UsersPaginationParams);
  res.status(httpStatutes.OK_200).json('add comments');
};
export const updateComment = async (req: Request, res: Response) => {
  // const users = await usersService.findByQueryParams(req.query as UsersPaginationParams);
  res.status(httpStatutes.OK_200).json('update comments');
};

export const deleteComment = async (req: Request, res: Response) => {
  // const users = await usersService.findByQueryParams(req.query as UsersPaginationParams);
  res.status(httpStatutes.OK_200).json('delete comments');
};
