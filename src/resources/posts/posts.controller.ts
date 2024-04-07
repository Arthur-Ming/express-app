import { Request, Response } from 'express';
import { PostInputData, PostOutputData } from './interfaces';
import { PostsRepository } from './posts.repository';

type RequestWithBody<T> = Request<{}, {}, T>;
type RequestWithParams<T> = Request<T>;
type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y>;
type ParamsId = { id: string };

const postsRepository = new PostsRepository();
export const getPosts = async (req: Request, res: Response) => {
  const posts = await postsRepository.find();
  res.status(200).json(posts);
};

export const getPostById = async (
  req: RequestWithParams<ParamsId>,
  res: Response<PostOutputData>
) => {
  const foundPost = await postsRepository.findById(req.params.id);
  if (!foundPost) {
    res.sendStatus(404);
    return;
  }
  res.status(200).json(foundPost);
};

export const addPost = async (req: RequestWithBody<PostInputData>, res: Response) => {
  const { id: createdPostId } = await postsRepository.create(req.body);

  const foundPost = await postsRepository.findById(createdPostId);

  if (!foundPost) {
    res.sendStatus(404);
    return;
  }
  res.status(201).json(foundPost);
};

export const updatePost = async (
  req: RequestWithParamsAndBody<ParamsId, PostInputData>,
  res: Response<void>
) => {
  const isUpdated = await postsRepository.update(req.params.id, req.body);
  if (!isUpdated) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
};

export const deletePost = async (req: RequestWithParams<ParamsId>, res: Response<void>) => {
  const isDeleted = await postsRepository.remove(req.params.id);
  if (!isDeleted) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
};
