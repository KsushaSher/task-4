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
