import { Response, NextFunction } from 'express';
import { findUserById } from '../repositories/userRepository';
import { AuthRequest } from '../types/auth.types';

export async function checkBlockedMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    // if (user.status === 'blocked') {
    //   req.user = undefined;
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Unauthorized',
    //   });
    // }

    if (user.is_blocked) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    next();
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}
