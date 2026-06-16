import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AuthRequest } from '../types/auth.types';

interface JwtPayload {
  userId: string;
  email: string;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing',
      });
    }

    const decoded = verifyToken(token) as JwtPayload;

    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
}
