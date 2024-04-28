import { Router } from 'express';
import routes from '../../common/routes';
import {
  addComment,
  deleteComment,
  getCommentById,
  updateComment,
} from './types/comments.controller';

const commentsRouter = Router();

commentsRouter.get(routes.commentById, getCommentById);
commentsRouter.post(routes.comments, addComment);
commentsRouter.put(routes.commentBySpecifiedId, updateComment);
commentsRouter.delete(routes.commentBySpecifiedId, deleteComment);

export default commentsRouter;
