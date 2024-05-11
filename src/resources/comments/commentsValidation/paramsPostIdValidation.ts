import { param } from 'express-validator';
import { paramIdCheckErrorsMiddleware } from '../../../utils/paramIdCheckErrorsMiddleware';
import { paramsIdCheckErrorsMiddleware } from '../../../utils/inputCheckErrorsMiddleware';
import { PostsRepository } from '../../posts/posts.repository';
const postsRepository = new PostsRepository();
export const paramsPostIdValidation = [
  param('postId').isMongoId(),
  param('postId').custom(async (postId) => {
    const post = await postsRepository.findById(postId);

    if (!post) {
      throw new Error(`blog with id ${postId} not found`);
    }
    return true;
  }),
  paramsIdCheckErrorsMiddleware,
];
