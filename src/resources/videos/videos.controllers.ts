import { Request, Response } from 'express';
import { db } from '../../db/db';
import { add, getById, removeById } from './videos.service';
import { inputValidation } from './validation';

export const getVideos = (req: Request, res: Response) => {
  res.status(200).json(db.videos);
};

export const getVideosById = (req: Request, res: Response) => {
  const videoId = req.params.id;
  const foundVideo = getById(Number(videoId));
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
  res.json('videos by Id' + req.params.id);
};

export const removeVideo = (req: Request, res: Response) => {
  const videoId = req.params.id;
  removeById(Number(videoId));
  res.sendStatus(204);
};
