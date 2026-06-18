import { Request, Response } from 'express';

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response
) => {
  console.error(err.message);

  res.status(400).json({
    success: false,
    message: err.message,
  });
};
