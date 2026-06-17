import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.types';
import { getUsersService } from '../services/userService';

export async function getUsers(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUsersService();

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
}
