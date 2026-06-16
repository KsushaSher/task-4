import { Request, Response } from 'express';
import { registerUser } from '../services/authService';
import { DatabaseError } from 'pg';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json(result);
    console.log('BODY:', req.body);
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
