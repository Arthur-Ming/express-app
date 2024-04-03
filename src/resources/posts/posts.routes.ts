import { Router } from 'express';
import routes from '../../common/routes';
import { addPost, deletePost, getPostById, getPosts, updatePost } from './posts.controller';
import { checkAuthorization } from '../../utils/authorization';

const postsRouter = Router();

postsRouter.get(routes.posts, checkAuthorization, getPosts);
postsRouter.get(routes.postById, getPostById);
postsRouter.post(routes.posts, addPost);
postsRouter.put(routes.postById, updatePost);
postsRouter.delete(routes.postById, deletePost);

export default postsRouter;
