import { NextFunction, Request, Response } from 'express';
import { httpStatutes } from '../../../common/httpStatutes';
import { PostsRepository } from '../posts.repository';
const postsRepository = new PostsRepository();
export const checkPostExisting = async (req: Request, res: Response, next: NextFunction) => {
  const post = await postsRepository.findById(req.params.postId);

  if (!post) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }

  next();
};
