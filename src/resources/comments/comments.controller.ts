import { Request, Response } from 'express';

import { httpStatutes } from '../../common/httpStatutes';
import { CommentsService } from './comments.service';
import { CommentsInputBody, CommentsPaginationParams } from './types/interfaces';

const commentsService = new CommentsService();
export const getCommentById = async (req: Request, res: Response) => {
  // const users = await usersService.findByQueryParams(req.query as UsersPaginationParams);
  res.status(httpStatutes.OK_200).json('get comments');
};

export const getCommentForSpecifiedPostId = async (
  req: Request<{ postId: string }, {}, {}, CommentsPaginationParams>,
  res: Response
) => {
  const comments = await commentsService.findByQueryParams(req.query, req.params.postId);

  res.status(httpStatutes.OK_200).json(comments);
};

export const addComment = async (
  req: Request<{ postId: string }, {}, CommentsInputBody>,
  res: Response
) => {
  const addedComment = await commentsService.addCommentForPost({
    content: req.body.content,
    postId: req.params.postId,
    userId: res.locals.userId,
  });
  if (!addedComment) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.CREATED_201).json(addedComment);
};
export const updateComment = async (req: Request, res: Response) => {
  // const users = await usersService.findByQueryParams(req.query as UsersPaginationParams);
  res.status(httpStatutes.OK_200).json('update comments');
};

export const deleteComment = async (req: Request, res: Response) => {
  // const users = await usersService.findByQueryParams(req.query as UsersPaginationParams);
  res.status(httpStatutes.OK_200).json('delete comments');
};
