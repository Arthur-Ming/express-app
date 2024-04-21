import { Router } from 'express';
import routes from '../../common/routes';
import {
  addPost,
  addPostForSpecificBlog,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from './posts.controller';
import { checkAuthorization } from '../../utils/authorization';
import { postsForSpecificBlogIdValidation } from './postsValidation/postsForSpecificBlogIdValidation';
import { postsInputBodyValidation } from './postsValidation/postsInputBodyValidation';
import { postsQueryParamsValidation } from './postsValidation/postsQueryParamsValidation';
import { postsInputBlogIdValidation } from './postsValidation/postsInputBlogIdValidation';
import { postParamsIdValidation } from './postsValidation/postParamsIdValidation';

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
  checkAuthorization,
  postsInputBlogIdValidation,
  postsInputBodyValidation,
  addPost
);

postsRouter.post(
  routes.postForBlog,
  checkAuthorization,
  postsForSpecificBlogIdValidation,
  postsInputBodyValidation,
  addPostForSpecificBlog
);
postsRouter.put(
  routes.postById,
  checkAuthorization,
  postParamsIdValidation,
  postsInputBlogIdValidation,
  postsInputBodyValidation,
  updatePost
);
postsRouter.delete(routes.postById, postParamsIdValidation, checkAuthorization, deletePost);

export default postsRouter;
