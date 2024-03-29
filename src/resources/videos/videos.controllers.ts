import { Request, Response } from 'express';
import { db } from '../../db/db';
import { add, getById, removeById, updateById } from './videos.service';
import { inputValidation, updateValidation } from './validation/helpers';

export const getVideos = (req: Request, res: Response) => {
  res.status(200).json(db.videos);
};

export const getVideoById = (req: Request, res: Response) => {
  const videoId = req.params.id;
  const foundVideo = getById(Number(videoId));
  if (!foundVideo) {
    res.sendStatus(404);
    return;
  }
  res.status(200).json(foundVideo);
};

export const addVideo = (req: Request, res: Response) => {
  const body = req.body;
  const errors = inputValidation(body);
  if (errors.errorsMessages.length) {
    res.status(400).json(errors);
    return;
  }
  const newVideo = add(body);
  res.status(201).json(newVideo);
};

export const updateVideo = (req: Request, res: Response) => {
  const videoId = req.params.id;
  const foundVideo = getById(Number(videoId));
  if (!foundVideo) {
    res.sendStatus(404);
    return;
  }
  const body = req.body;
  const errors = updateValidation(body);
  if (errors.errorsMessages.length) {
    res.status(400).json(errors);
    return;
  }
  updateById(Number(videoId), body);
  res.sendStatus(204);
};

export const removeVideo = (req: Request, res: Response) => {
  const videoId = req.params.id;
  const foundVideo = getById(Number(videoId));
  if (!foundVideo) {
    res.sendStatus(404);
    return;
  }
  removeById(Number(videoId));
  res.sendStatus(204);
};
