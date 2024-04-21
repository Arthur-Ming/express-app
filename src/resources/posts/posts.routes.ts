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
import {
  postsForSpecificBlogIdValidation,
  postsForSpecificBlogInputValidation,
  postsInputValidation,
} from './postsInputValidation';

const postsRouter = Router();

postsRouter.get(routes.posts, getPosts);
postsRouter.get(routes.postById, getPostById);
postsRouter.get(routes.postForBlog, postsForSpecificBlogIdValidation, getPosts);
postsRouter.post(routes.posts, checkAuthorization, postsInputValidation, addPost);

postsRouter.post(
  routes.postForBlog,
  checkAuthorization,
  postsForSpecificBlogIdValidation,
  postsForSpecificBlogInputValidation,
  addPostForSpecificBlog
);
postsRouter.put(
  routes.postById,
  checkAuthorization,
  postsForSpecificBlogIdValidation,
  postsInputValidation,
  updatePost
);
postsRouter.delete(routes.postById, checkAuthorization, deletePost);

export default postsRouter;
