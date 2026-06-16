import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.types';

export async function getUsers(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    res.json({
      success: true,
      message: 'Protected route works',
      currentUser: req.user,
    });
  } catch (error) {
    next(error);
  }
}
