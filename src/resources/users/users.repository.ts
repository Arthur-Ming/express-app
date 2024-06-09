import { UserDbInterface } from '../../db/dbTypes/user-db-interface';
import { Users } from '../../db/collections/user.collection';
import { ObjectId } from 'mongodb';
import { LoginUserBody, UsersPaginationParams } from './types/interfaces';

const filter = ({ searchEmailTerm, searchLoginTerm }: UsersPaginationParams) => {
  return {
    $or: [
      {
        login: {
          $regex: searchLoginTerm,
          $options: 'i',
        },
      },
      {
        email: {
          $regex: searchEmailTerm,
          $options: 'i',
        },
      },
    ],
  };
};
export class UsersRepository {
  getTotalCount = async (queryParams: UsersPaginationParams) => {
    return Users.countDocuments(filter(queryParams));
  };
  add = async (newUserDTO: UserDbInterface) => {
    const newUser = await Users.create(newUserDTO);
    return newUser;
  };

  findById = async (userId: string) => {
    const foundUser = await Users.findById(userId);

    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  find = async (queryParams: UsersPaginationParams) => {
    const foundUsers = await Users.find(
      filter(queryParams),
      {},
      {
        sort: { [queryParams.sortBy]: queryParams.sortDirection === 'asc' ? 1 : -1 },
        skip: (queryParams.pageNumber - 1) * queryParams.pageSize,
        limit: queryParams.pageSize,
      }
    );
    return foundUsers;
  };
  remove = async (userId: string): Promise<boolean> => {
    const deleteResult = await Users.deleteOne({ _id: new ObjectId(userId) });
    return deleteResult.deletedCount === 1;
  };

  login = async ({ loginOrEmail, password }: LoginUserBody) => {
    const foundUser = await Users.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
      password: password,
    });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  getUserByLoginOrEmail = async (loginOrEmail: string) => {
    const foundUser = await Users.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  getUserByLoginOrEmailAlt = async (login: string, email: string) => {
    const foundUser = await Users.findOne({
      $or: [{ email: email }, { login: login }],
    });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  getUserByLogin = async (login: string) => {
    const foundUser = await Users.findOne({ login: login });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  getUserByEmail = async (email: string) => {
    const foundUser = await Users.findOne({ email: email });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  getUserById = async (userId: string) => {
    const foundUser = await Users.findOne({ _id: new ObjectId(userId) });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };
  updatePassword = async (userId: string, newPasswordHash: string) => {
    const updateResult = await Users.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          password: newPasswordHash,
        },
      }
    );
    return updateResult.matchedCount === 1;
  };
}
