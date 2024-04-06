import { Request, Response } from 'express';
import { BlogsRepository } from './blogs.repository';
import { BlogInputData, BlogOutputData } from './interfaces';

type RequestWithBody<T> = Request<{}, {}, T>;
type RequestWithParams<T> = Request<T>;
type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y>;
type ParamsId = { id: string };

const blogsRepository = new BlogsRepository();
export const getBlogs = (req: Request, res: Response<BlogOutputData[]>) => {
  res.status(200).json(blogsRepository.find());
};

export const getBlogById = (req: RequestWithParams<ParamsId>, res: Response<BlogOutputData>) => {
  const foundBlog = blogsRepository.findById(req.params.id);
  if (!foundBlog) {
    res.sendStatus(404);
    return;
  }
  res.status(200).json(foundBlog);
};

export const addBlog = (req: RequestWithBody<BlogInputData>, res: Response<BlogOutputData>) => {
  const { id: newBlogId } = blogsRepository.create(req.body);

  const foundBlog = blogsRepository.findById(newBlogId);
  if (!foundBlog) {
    res.sendStatus(404);
    return;
  }
  res.status(201).json(foundBlog);
};

export const updateBlog = (
  req: RequestWithParamsAndBody<ParamsId, BlogInputData>,
  res: Response<void>
) => {
  if (!blogsRepository.update(req.params.id, req.body)) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
};

export const deleteBlog = (req: RequestWithParams<ParamsId>, res: Response<void>) => {
  if (!blogsRepository.remove(req.params.id)) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
};
