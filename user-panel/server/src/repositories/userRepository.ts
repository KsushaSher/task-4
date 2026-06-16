import { pool } from '../config/db';

interface CreateUserParams {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  verificationToken: string;
  status: string;
  createdAt: Date;
}

export const createUser = async ({
  id,
  name,
  email,
  passwordHash,
  verificationToken,
  status,
  createdAt,
}: CreateUserParams) => {
  const query = `
    INSERT INTO users (
      id,
      name,
      email,
      password_hash,
      verification_token,
      status,
      created_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  await pool.query(query, [
    id,
    name,
    email,
    passwordHash,
    verificationToken,
    status,
    createdAt,
  ]);
};
