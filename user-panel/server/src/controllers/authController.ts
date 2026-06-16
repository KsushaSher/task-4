import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../services/authService';
import { DatabaseError } from 'pg';
import { verifyEmail } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json(result);
  } catch (error: unknown) {
    console.error('REGISTER ERROR:', error);
    if (error instanceof DatabaseError && error.code === '23505') {
      return res.status(409).json({
        message: 'Email already exists',
      });
    }

    return res.status(500).json({
      message: 'Server error',
    });
  }
};

export const verifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = String(req.params.token);
    const result = await verifyEmail(token);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
