import { Request, Response } from 'express';
import { httpStatutes } from '../../common/httpStatutes';
import { ParamsId, RequestWithBody, RequestWithParams } from '../blogs/types/types';
import {
  UserInputBody,
  UserOutputDataWithPagination,
  UsersPaginationParams,
} from './types/interfaces';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

const usersService = new UsersService();
const usersRepository = new UsersRepository();
export const getUsers = async (
  req: Request<{}, {}, {}, UsersPaginationParams>,
  res: Response<UserOutputDataWithPagination>
) => {
  const users = await usersService.findByQueryParams(req.query as UsersPaginationParams);
  res.status(httpStatutes.OK_200).json(users);
};

export const addUser = async (req: RequestWithBody<UserInputBody>, res: Response) => {
  const addedUser = await usersService.addUser(req.body);

  if (!addedUser) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.status(httpStatutes.CREATED_201).json(addedUser);
};

export const deleteUser = async (req: RequestWithParams<ParamsId>, res: Response) => {
  const isDeleted = await usersRepository.remove(req.params.id);
  if (!isDeleted) {
    res.sendStatus(httpStatutes.NOT_FOUND_404);
    return;
  }
  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
};
