import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/errorMiddleware';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware);

export default app;
