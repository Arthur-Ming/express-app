import { param, validationResult } from 'express-validator';
import { paramIdCheckErrorsMiddleware } from '../../../utils/paramIdCheckErrorsMiddleware';
import { CommentsRepository } from '../comments.repository';
import { NextFunction, Request, Response } from 'express';
import { httpStatutes } from '../../../common/httpStatutes';
const commentsRepository = new CommentsRepository();

export const paramSpecifiedIdCheckErrorsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await commentsRepository.findCommentById(req.params.commentId);

  if (!comment) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }

  if (comment.userId.toString() !== res.locals.userId) {
    res.sendStatus(httpStatutes.Forbidden_403);
    return;
  }
  next();
};
export const paramsSpecifiedIdValidation = [
  param('commentId').isMongoId(),
  paramIdCheckErrorsMiddleware,
  // param('commentId').custom(async (commentId, { req, location }) => {
  //   const comment = await commentsRepository.getCommentById(commentId);
  //
  //   if (!comment) {
  //     throw new Error(`blog with id ${comment} not found`);
  //   }
  //
  //   return true;
  // }),
  paramSpecifiedIdCheckErrorsMiddleware,
];
