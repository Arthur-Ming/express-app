import { UserDbInterface } from '../../db/dbTypes/user-db-interface';
import { userCollection } from '../../db/collections/user.collection';
import { ObjectId } from 'mongodb';
import { LoginUserBody, UsersPaginationParams } from './types/interfaces';
import { blogCollection } from '../../db/collections/blog.collection';

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
    return await userCollection.countDocuments(filter(queryParams));
  };
  add = async (newUser: UserDbInterface) => {
    const insertOneResult = await userCollection.insertOne(newUser);
    return { id: insertOneResult.insertedId.toString() };
  };

  findById = async (userId: string) => {
    const foundUser = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  find = async (queryParams: UsersPaginationParams) => {
    const foundBlogs = await userCollection
      .find(filter(queryParams))
      .sort(queryParams.sortBy, queryParams.sortDirection)
      .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
      .limit(queryParams.pageSize)
      .toArray();
    return foundBlogs;
  };
  remove = async (userId: string): Promise<boolean> => {
    const deleteResult = await userCollection.deleteOne({ _id: new ObjectId(userId) });
    return deleteResult.deletedCount === 1;
  };

  login = async ({ loginOrEmail, password }: LoginUserBody) => {
    const foundUser = await userCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
      password: password,
    });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  getUserByLoginOrEmail = async (loginOrEmail: string) => {
    const foundUser = await userCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  getUserByLoginOrEmailAlt = async (login: string, email: string) => {
    const foundUser = await userCollection.findOne({
      $or: [{ email: email }, { login: login }],
    });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  getUserByLogin = async (login: string) => {
    const foundUser = await userCollection.findOne({ login: login });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  getUserByEmail = async (email: string) => {
    const foundUser = await userCollection.findOne({ email: email });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };

  getUserById = async (userId: string) => {
    const foundUser = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!foundUser) {
      return null;
    }

    return foundUser;
  };
  updatePassword = async (userId: string, newPasswordHash: string) => {
    const updateResult = await userCollection.updateOne(
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
