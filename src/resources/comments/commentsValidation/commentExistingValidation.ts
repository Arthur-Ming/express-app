import { NextFunction, Request, Response } from 'express';
import { httpStatutes } from '../../../common/httpStatutes';
import { CommentsRepository } from '../comments.repository';
const commentsRepository = new CommentsRepository();
export const commentExistingValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await commentsRepository.findCommentById(req.params.commentId);

  if (!comment) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }

  next();
};
