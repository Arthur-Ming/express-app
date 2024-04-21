import { body } from 'express-validator';
import { BlogsRepository } from '../../blogs/blogs.repository';
const blogsRepository = new BlogsRepository();
export const postsInputBlogIdValidation = [
  body('blogId').isMongoId(),
  body('blogId').custom(async (blogId) => {
    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      throw new Error(`blog with id ${blogId} not found`);
    }
    return true;
  }),
];
