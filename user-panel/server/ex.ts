import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'user_management',
  user: 'anna',
  password: '123456',
});

pool.query('SELECT NOW()').then(console.log).catch(console.error);
