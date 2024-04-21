import { UserDbInterface } from '../../db/dbTypes/user-db-interface';
import { userCollection } from '../../db/user.collection';
import { ObjectId } from 'mongodb';
import { UsersPaginationParams } from './types/interfaces';

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
}
