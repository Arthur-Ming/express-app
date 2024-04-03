import { Router } from 'express';
import routes from '../../common/routes';
import { addBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from './blogs.controller';

import { blogsInputValidation } from './blogsInputValidation';
import { checkAuthorization } from '../../utils/authorization';

const blogsRouter = Router();

blogsRouter.get(routes.blogs, getBlogs);
blogsRouter.get(routes.blogById, getBlogById);
blogsRouter.post(routes.blogs, checkAuthorization, ...blogsInputValidation, addBlog);
blogsRouter.put(routes.blogById, checkAuthorization, ...blogsInputValidation, updateBlog);
blogsRouter.delete(routes.blogById, checkAuthorization, deleteBlog);

export default blogsRouter;
