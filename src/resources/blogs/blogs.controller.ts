import { Request, Response } from 'express';
import { BlogsRepository } from './blogs.repository';
import {
  BlogInputData,
  BlogOutputData,
  BlogOutputDataWithPagination,
  BlogsQueryParams,
} from './types/interfaces';
import { httpStatutes } from '../../common/httpStatutes';
import { BlogsService } from './blogs.service';
import {
  ParamsId,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from './types/types';

const blogsRepository = new BlogsRepository();
const blogsService = new BlogsService();
export const getBlogs = async (
  req: Request<{}, {}, {}, BlogsQueryParams>,
  res: Response<BlogOutputDataWithPagination>
) => {
  const blogs = await blogsService.findByQueryParams(req.query);
  res.status(httpStatutes.OK_200).json(blogs);
};

export const getBlogById = async (
  req: RequestWithParams<ParamsId>,
  res: Response<BlogOutputData>
) => {
  const foundBlog = await blogsService.findById(req.params.id);
  if (!foundBlog) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.OK_200).json(foundBlog);
};

export const addBlog = async (req: RequestWithBody<BlogInputData>, res: Response) => {
  const createdBlog = await blogsService.addBlog(req.body);

  if (!createdBlog) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.CREATED_201).json(createdBlog);
};

export const updateBlog = async (
  req: RequestWithParamsAndBody<ParamsId, BlogInputData>,
  res: Response
) => {
  const isUpdated = await blogsService.updateBlog(req.params.id, req.body);
  if (!isUpdated) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};

export const deleteBlog = async (req: RequestWithParams<ParamsId>, res: Response) => {
  const isDeleted = await blogsRepository.remove(req.params.id);
  if (!isDeleted) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};
