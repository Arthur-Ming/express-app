import { Router } from 'express';
import routes from '../../common/routes';
import {
  addPost,
  addPostForSpecificBlog,
  deletePost,
  getPostById,
  getPosts,
  likePost,
  updatePost,
} from './posts.controller';
import { checkBasicAuthorization, checkByJWTAuthorization } from '../../utils/authorization';
import { postsForSpecificBlogIdValidation } from './postsValidation/postsForSpecificBlogIdValidation';
import { postsInputBodyValidation } from './postsValidation/postsInputBodyValidation';
import { postsQueryParamsValidation } from './postsValidation/postsQueryParamsValidation';
import { postsInputBlogIdValidation } from './postsValidation/postsInputBlogIdValidation';
import { postParamsIdValidation } from './postsValidation/postParamsIdValidation';
import { likePostValidation } from './postsValidation/likePostValidation';

const postsRouter = Router();

postsRouter.get(routes.posts, postsQueryParamsValidation, getPosts);
postsRouter.get(routes.postById, postParamsIdValidation, getPostById);
postsRouter.get(
  routes.postForBlog,
  postsForSpecificBlogIdValidation,
  postsQueryParamsValidation,
  getPosts
);
postsRouter.post(
  routes.posts,
  checkBasicAuthorization,
  postsInputBlogIdValidation,
  postsInputBodyValidation,
  addPost
);

postsRouter.post(
  routes.postForBlog,
  checkBasicAuthorization,
  postsForSpecificBlogIdValidation,
  postsInputBodyValidation,
  addPostForSpecificBlog
);
postsRouter.put(
  routes.postById,
  checkBasicAuthorization,
  postParamsIdValidation,
  postsInputBlogIdValidation,
  postsInputBodyValidation,
  updatePost
);
postsRouter.put(routes.postsLikes, checkByJWTAuthorization, likePostValidation, likePost);
postsRouter.delete(routes.postById, postParamsIdValidation, checkBasicAuthorization, deletePost);

export default postsRouter;
