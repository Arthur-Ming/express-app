import { body, param } from 'express-validator';
import {
  inputCheckErrorsMiddleware,
  paramsIdCheckErrorsMiddleware,
} from '../../../utils/inputCheckErrorsMiddleware';
import { BlogsRepository } from '../../blogs/blogs.repository';
const blogsRepository = new BlogsRepository();
export const postsInputValidation = [
  body('title').isString().trim().isLength({ min: 3, max: 30 }),
  body('shortDescription').isString().trim().isLength({ min: 3, max: 100 }),
  body('content').isString().trim().isLength({ min: 3, max: 1000 }),
  inputCheckErrorsMiddleware,
];
export const postsForSpecificBlogInputValidation = [
  body('title').isString().trim().isLength({ min: 3, max: 30 }),
  body('shortDescription').isString().trim().isLength({ min: 3, max: 100 }),
  body('content').isString().trim().isLength({ min: 3, max: 1000 }),
  inputCheckErrorsMiddleware,
];

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
