import { Request, Response } from 'express';
import { db } from '../../db/db';

export const getPosts = (req: Request, res: Response) => {
  res.status(200).json('getPosts');
};

export const getPostById = (req: Request, res: Response) => {
  res.status(200).json('getPostById');
};

export const addPost = (req: Request, res: Response) => {
  res.status(200).json('addPost');
};

export const updatePost = (req: Request, res: Response) => {
  res.status(200).json('updatePost');
};

export const deletePost = (req: Request, res: Response) => {
  res.status(200).json('deletePost');
};
