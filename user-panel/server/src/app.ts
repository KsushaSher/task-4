import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { errorMiddleware } from './middleware/errorMiddleware';
import { BASE_URL_CLIENT } from './utils/constants';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: BASE_URL_CLIENT,
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.use(errorMiddleware);

export default app;
