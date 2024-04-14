import { Request, Response } from 'express';
import {
  ParamsId,
  PostInputData,
  PostOutputData,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from './interfaces';
import { PostsRepository } from './posts.repository';
import { httpStatutes } from '../../common/httpStatutes';

const postsRepository = new PostsRepository();
export const getPosts = async (req: Request, res: Response) => {
  const posts = await postsRepository.find();
  res.status(httpStatutes.OK_200).json(posts);
};

export const getPostById = async (
  req: RequestWithParams<ParamsId>,
  res: Response<PostOutputData>
) => {
  const foundPost = await postsRepository.findById(req.params.id);
  if (!foundPost) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.OK_200).json(foundPost);
};

export const addPost = async (req: RequestWithBody<PostInputData>, res: Response) => {
  const { id: createdPostId } = await postsRepository.add(req.body);

  const foundPost = await postsRepository.findById(createdPostId);

  if (!foundPost) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.CREATED_201).json(foundPost);
};

export const updatePost = async (
  req: RequestWithParamsAndBody<ParamsId, PostInputData>,
  res: Response<void>
) => {
  const isUpdated = await postsRepository.update(req.params.id, req.body);
  if (!isUpdated) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};

export const deletePost = async (req: RequestWithParams<ParamsId>, res: Response<void>) => {
  const isDeleted = await postsRepository.remove(req.params.id);
  if (!isDeleted) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};
