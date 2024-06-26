import { param } from 'express-validator';
import { paramsIdCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';
import { BlogsRepository } from '../../blogs/blogs.repository';

const blogsRepository = new BlogsRepository();
export const postsForSpecificBlogIdValidation = [
  param('blogId').custom(async (blogId) => {
    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      throw new Error(`blog with id ${blogId} not found`);
    }
    return true;
  }),
  paramsIdCheckErrorsMiddleware,
];
