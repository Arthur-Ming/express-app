import { Router } from 'express';
import routes from '../../common/routes';
import { addBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from './blogs.controller';
import { checkBasicAuthorization } from '../../utils/authorization';
import { queryParamsValidation } from './blogsValidation/queryParamsValidation';
import { paramsIdValidation } from './blogsValidation/paramsIdValidation';
import { blogsInputBodyValidation } from './blogsValidation/blogsInputBodyValidation';

const blogsRouter = Router();

blogsRouter.get(routes.blogs, queryParamsValidation, getBlogs);
blogsRouter.get(routes.blogById, paramsIdValidation, getBlogById);
blogsRouter.post(routes.blogs, /* checkBasicAuthorization,*/ blogsInputBodyValidation, addBlog);
blogsRouter.put(
  routes.blogById,
  /*checkBasicAuthorization,*/
  paramsIdValidation,
  blogsInputBodyValidation,
  updateBlog
);
blogsRouter.delete(routes.blogById, /*checkBasicAuthorization,*/ paramsIdValidation, deleteBlog);

export default blogsRouter;
