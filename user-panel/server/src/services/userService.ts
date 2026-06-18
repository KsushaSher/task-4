import { getAllUsers } from '../repositories/userRepository';
import * as userRepository from '../repositories/userRepository';

export const getUsersService = async () => {
  const users = await getAllUsers();

  return users;
};

export const blockUsersService = async (ids: number[]) => {
  await userRepository.blockUsers(ids);
};

export const unblockUsersService = async (ids: number[]) => {
  await userRepository.unblockUsers(ids);
};

export const deleteUsersService = async (ids: number[]) => {
  await userRepository.deleteUsers(ids);
};

export const deleteUnverifiedUsersService = async () => {
  await userRepository.deleteUnverifiedUsers();
};
