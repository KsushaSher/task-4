import { getAllUsers } from '../repositories/userRepository';
import * as userRepository from '../repositories/userRepository';

export async function getUsersService() {
  const users = await getAllUsers();

  return users;
}

export async function blockUsersService(ids: number[]) {
  await userRepository.blockUsers(ids);
}

export async function unblockUsersService(ids: number[]) {
  await userRepository.unblockUsers(ids);
}

export async function deleteUsersService(ids: number[]) {
  await userRepository.deleteUsers(ids);
}

export async function deleteUnverifiedUsersService() {
  await userRepository.deleteUnverifiedUsers();
}
