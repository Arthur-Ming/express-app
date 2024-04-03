import { Request, Response } from 'express';
import { blogsRepository } from './blogs.repository';

export const getBlogs = (req: Request, res: Response) => {
  res.status(200).json(blogsRepository.find());
};

export const getBlogById = (req: Request, res: Response) => {
  const foundVideo = blogsRepository.findById(req.params.id);
  if (!foundVideo) {
    res.sendStatus(404);
    return;
  }
  res.status(200).json(foundVideo);
};

export const addBlog = (req: Request, res: Response) => {
  const newBlog = blogsRepository.create(req.body);

  const foundVideo = blogsRepository.findById(newBlog.id);
  if (!foundVideo) {
    res.sendStatus(404);
    return;
  }
  res.status(201).json(foundVideo);
};

export const updateBlog = (req: Request, res: Response) => {
  if (!blogsRepository.update(req.params.id, req.body)) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
};

export const deleteBlog = (req: Request, res: Response) => {
  if (!blogsRepository.remove(req.params.id)) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
};
