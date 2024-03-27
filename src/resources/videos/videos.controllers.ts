import { Request, Response } from 'express';
import { db } from '../../db/db';

export const getVideos = (req: Request, res: Response) => {
  res.status(200).json(db.videos);
};

export const getVideosById = (req: Request, res: Response) => {
  res.json('videos by Id' + req.params.id);
};

export const addVideo = (req: Request, res: Response) => {
  res.json('videos by Id' + req.params.id);
};

export const updateVideo = (req: Request, res: Response) => {
  res.json('videos by Id' + req.params.id);
};

export const removeVideo = (req: Request, res: Response) => {
  res.json('videos by Id' + req.params.id);
};
