import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserParams {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  verificationToken: string;
  status: string;
  isBlocked: boolean;
  createdAt: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
