import { Request, Response } from 'express';
import { BlogsRepository } from './blogs.repository';
import {
  BlogInputData,
  BlogOutputData,
  BlogOutputDataWithPagination,
  ParamsId,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from './interfaces';
import { httpStatutes } from '../../common/httpStatutes';
import { BlogsService } from './blogs.service';

const blogsRepository = new BlogsRepository();
const blogsService = new BlogsService();
export const getBlogs = async (req: Request, res: Response<BlogOutputDataWithPagination>) => {
  const blogs = await blogsService.find(req.query);
  res.status(httpStatutes.OK_200).json(blogs);
};

export const getBlogById = async (
  req: RequestWithParams<ParamsId>,
  res: Response<BlogOutputData>
) => {
  const foundBlog = await blogsRepository.findById(req.params.id);
  if (!foundBlog) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.OK_200).json(foundBlog);
};

export const addBlog = async (req: RequestWithBody<BlogInputData>, res: Response) => {
  const { id: createdBlogId } = await blogsRepository.add(req.body);

  const foundBlog = await blogsRepository.findById(createdBlogId);

  if (!foundBlog) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.CREATED_201).json(foundBlog);
};

export const updateBlog = async (
  req: RequestWithParamsAndBody<ParamsId, BlogInputData>,
  res: Response
) => {
  const isUpdated = await blogsRepository.update(req.params.id, req.body);
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
