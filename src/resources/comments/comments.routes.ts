import { Router } from 'express';
import routes from '../../common/routes';
import {
  addComment,
  deleteComment,
  getCommentById,
  getCommentForSpecifiedPostId,
  likeComment,
  updateComment,
} from './comments.controller';
import { commentInputBodyValidation } from './commentsValidation/commentInputBodyValidation';
import { checkByJWTAuthorization } from '../../utils/authorization';
import { paramsPostIdValidation } from './commentsValidation/paramsPostIdValidation';
import { commentsQueryParamsValidation } from './commentsValidation/commentsQueryParamsValidation';
import { paramsIdValidation } from './commentsValidation/paramsIdValidation';
import { paramsSpecifiedIdValidation } from './commentsValidation/paramsSpecifiedIdValidation';
import { likeCommentValidation } from './commentsValidation/likeCommentValidation';

const commentsRouter = Router();

commentsRouter.get(
  routes.commentBySpecifiedPostId,
  paramsPostIdValidation,
  commentsQueryParamsValidation,

  getCommentForSpecifiedPostId
);
commentsRouter.get(routes.commentById, paramsIdValidation, getCommentById);
commentsRouter.post(
  routes.commentBySpecifiedPostId,
  checkByJWTAuthorization,
  paramsPostIdValidation,
  commentInputBodyValidation,
  addComment
);
commentsRouter.put(
  routes.commentBySpecifiedId,
  checkByJWTAuthorization,
  paramsSpecifiedIdValidation,
  commentInputBodyValidation,
  updateComment
);
commentsRouter.put(
  routes.commentsLikes,
  checkByJWTAuthorization,
  likeCommentValidation,
  likeComment
);
commentsRouter.delete(
  routes.commentBySpecifiedId,
  checkByJWTAuthorization,
  paramsSpecifiedIdValidation,
  deleteComment
);

export default commentsRouter;
