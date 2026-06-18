import { Pool } from 'pg';
import dotenv from 'dotenv';

// export const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   database: 'user_management',
//   user: 'anna',
//   password: '123456',
// });

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
