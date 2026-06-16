import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.message);

  res.status(400).json({
    success: false,
    message: err.message,
  });
}
