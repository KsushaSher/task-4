import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.types';
import {
  blockUsersService,
  deleteUnverifiedUsersService,
  deleteUsersService,
  getUsersService,
  unblockUsersService,
} from '../services/userService';

export const getUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsersService();

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const blockUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ids } = req.body;

    await blockUsersService(ids);

    res.json({
      success: true,
      message: 'Users blocked',
    });
  } catch (error) {
    next(error);
  }
};

export const unblockUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ids } = req.body;

    await unblockUsersService(ids);

    res.json({
      success: true,
      message: 'Users unblocked',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ids } = req.body;

    await deleteUsersService(ids);

    res.json({
      success: true,
      message: 'Users deleted',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUnverifiedUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteUnverifiedUsersService();

    res.json({
      success: true,
      message: 'Unverified users deleted',
    });
  } catch (error) {
    next(error);
  }
};
