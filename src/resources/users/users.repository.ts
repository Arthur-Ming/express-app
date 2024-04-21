import { UserDbInterface } from '../../db/dbTypes/user-db-interface';
import { userCollection } from '../../db/user.collection';
import { blogCollection } from '../../db/blog.collection';
import { ObjectId } from 'mongodb';

export class UsersRepository {
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
}
