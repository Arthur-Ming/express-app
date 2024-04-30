import { Request, Response } from 'express';

import { httpStatutes } from '../../common/httpStatutes';
import { CommentsService } from './comments.service';
import { CommentsInputBody, CommentsPaginationParams } from './types/interfaces';
import { CommentsRepository } from './comments.repository';

const commentsService = new CommentsService();
const commentsRepository = new CommentsRepository();
export const getCommentById = async (req: Request<{ id: string }>, res: Response) => {
  const comment = await commentsService.getById(req.params.id);
  if (!comment) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.OK_200).json(comment);
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
export const updateComment = async (
  req: Request<{ commentId: string }, {}, CommentsInputBody>,
  res: Response
) => {
  const isUpdated = await commentsRepository.update(req.params.commentId, req.body);
  if (!isUpdated) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};

export const deleteComment = async (req: Request<{ commentId: string }>, res: Response) => {
  const isDeleted = await commentsRepository.remove(req.params.commentId);
  if (!isDeleted) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};
