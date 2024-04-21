import { UserInputBody } from './types/interfaces';
import { mapToCreateUser } from './helpers/mapToCreateUser';
import { UsersRepository } from './users.repository';
import { mapToOutput } from './helpers/mapToOutput';

const usersRepository = new UsersRepository();
export class UsersService {
  addUser = async (input: UserInputBody) => {
    const newUser = mapToCreateUser(input);
    const { id: addedUserId } = await usersRepository.add(newUser);
    const addedUser = await usersRepository.findById(addedUserId);
    return addedUser ? mapToOutput(addedUser) : null;
  };
}
