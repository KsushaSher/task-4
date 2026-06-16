import app from './app';
import { pool } from './config/db';

const PORT = 8888;

pool
  .query('SELECT NOW()')
  .then((result) => {
    console.log('Database connected');
    console.log(result.rows);
  })
  .catch((error) => {
    console.error('Database error:', error);
  });

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
