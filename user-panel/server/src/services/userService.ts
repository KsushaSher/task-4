import { getAllUsers } from '../repositories/userRepository';

export async function getUsersService() {
  const users = await getAllUsers();

  return users;
}
