import { Request, Response } from 'express';
import {
  PostInputData,
  PostInputDataForSpecificBlog,
  PostOutputData,
  PostsPaginationParams,
} from './types/interfaces';
import { PostsRepository } from './posts.repository';
import { httpStatutes } from '../../common/httpStatutes';
import { PostsService } from './posts.service';
import {
  ParamsId,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from './types/types';
import { PostsQueryRepo } from './posts.queryRepo';
import { extractTokenPayload } from '../../utils/extractTokenPayload';

const postsRepository = new PostsRepository();
const postsQueryRepo = new PostsQueryRepo();
const postsService = new PostsService();
export const getPosts = async (
  req: Request<{ blogId?: string }, {}, {}, PostsPaginationParams>,
  res: Response
) => {
  const userId = extractTokenPayload(req.headers);
  const posts = await postsQueryRepo.find(req.query, req.params.blogId, userId);
  res.status(httpStatutes.OK_200).json(posts);
};

export const getPostById = async (
  req: RequestWithParams<ParamsId>,
  res: Response<PostOutputData>
) => {
  const userId = extractTokenPayload(req.headers);
  const foundPost = await postsQueryRepo.findById(req.params.id, userId);
  if (!foundPost) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.OK_200).json(foundPost);
};

export const addPost = async (
  req: RequestWithBody<PostInputData>,
  res: Response<PostOutputData>
) => {
  const createdPost = await postsService.addPost(req.body);

  if (!createdPost) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  const post = await postsQueryRepo.findById(createdPost._id.toString());
  if (!post) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.CREATED_201).json(post);
};

export const addPostForSpecificBlog = async (
  req: RequestWithParamsAndBody<{ blogId: string }, PostInputDataForSpecificBlog>,
  res: Response<PostOutputData>
) => {
  const createdPost = await postsService.addPostForSpecificBlog(req.params.blogId, req.body);

  if (!createdPost) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  const post = await postsQueryRepo.findById(createdPost._id.toString());
  if (!post) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.CREATED_201).json(post);
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
export const likePost = async (req: Request<{ postId: string }>, res: Response) => {
  const userId = res.locals.userId;

  const like = await postsRepository.addLike(userId, req.params.postId, req.body.likeStatus);
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
