import { Request, Response } from 'express';
import { BlogsRepository } from './blogs.repository';
import { BlogInputData, BlogOutputData } from './interfaces';

type RequestWithBody<T> = Request<{}, {}, T>;
type RequestWithParams<T> = Request<T>;
type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y>;
type ParamsId = { id: string };

const blogsRepository = new BlogsRepository();
export const getBlogs = async (req: Request, res: Response) => {
  const f = await blogsRepository.find();
  console.log(f);
  res.status(200).json(f);
};

export const getBlogById = async (
  req: RequestWithParams<ParamsId>,
  res: Response<BlogOutputData>
) => {
  const foundBlog = await blogsRepository.findById(req.params.id);
  if (!foundBlog) {
    res.sendStatus(404);
    return;
  }
  res.status(200).json(foundBlog);
};

export const addBlog = async (req: RequestWithBody<BlogInputData>, res: Response) => {
  const f = await blogsRepository.create(req.body);

  const foundBlog = await blogsRepository.findById(f.id);

  if (!foundBlog) {
    res.sendStatus(404);
    return;
  }
  res.status(201).json(foundBlog);
};

export const updateBlog = async (
  req: RequestWithParamsAndBody<ParamsId, BlogInputData>,
  res: Response<void>
) => {
  const isUpdated = await blogsRepository.update(req.params.id, req.body);
  if (!isUpdated) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
};

export const deleteBlog = async (req: RequestWithParams<ParamsId>, res: Response<void>) => {
  const isDeleted = await blogsRepository.remove(req.params.id);
  if (!isDeleted) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
};
