import { Router } from 'express';
import routes from '../../common/routes';
import { addBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from './blogs.controller';

import { blogsInputValidation } from './blogsInputValidation';

const blogsRouter = Router();

blogsRouter.get(routes.blogs, getBlogs);
blogsRouter.get(routes.blogById, getBlogById);
blogsRouter.post(routes.blogs, ...blogsInputValidation, addBlog);
blogsRouter.put(routes.blogById, updateBlog);
blogsRouter.delete(routes.blogById, deleteBlog);

export default blogsRouter;
