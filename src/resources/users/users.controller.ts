import { Request, Response } from 'express';
import { httpStatutes } from '../../common/httpStatutes';
import { RequestWithBody } from '../blogs/types/types';
import { UserInputBody } from './types/interfaces';
import { UsersService } from './users.service';

const usersService = new UsersService();
export const getUsers = (req: Request<{}, {}, {}, {}>, res: Response) => {
  res.status(httpStatutes.OK_200).json('get users');
};

export const addUser = async (req: RequestWithBody<UserInputBody>, res: Response) => {
  const addedUser = await usersService.addUser(req.body);

  if (!addedUser) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.CREATED_201).json(addedUser);
};

export const deleteUser = (req: Request<{}, {}, {}, {}>, res: Response) => {
  res.status(httpStatutes.OK_200).json('delete users');
};
