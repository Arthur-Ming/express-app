import { Router } from 'express';
import routes from '../../common/routes';
import { addBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from './blogs.controller';
import {
  blogsInputValidation,
  paramsIdValidation,
  queryParamsValidation,
} from './blogsInputValidation';
import { checkAuthorization } from '../../utils/authorization';

const blogsRouter = Router();

blogsRouter.get(routes.blogs, queryParamsValidation, getBlogs);
blogsRouter.get(routes.blogById, paramsIdValidation, getBlogById);
blogsRouter.post(routes.blogs, checkAuthorization, blogsInputValidation, addBlog);
blogsRouter.put(
  routes.blogById,
  checkAuthorization,
  paramsIdValidation,
  blogsInputValidation,
  updateBlog
);
blogsRouter.delete(routes.blogById, checkAuthorization, paramsIdValidation, deleteBlog);

export default blogsRouter;
