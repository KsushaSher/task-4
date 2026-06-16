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

export const findByVerificationToken = async (token: string) => {
  const result = await pool.query(
    `
      SELECT *
      FROM users
      WHERE verification_token = $1
    `,
    [token]
  );

  return result.rows[0];
};

export const verifyUserEmail = async (userId: string) => {
  await pool.query(
    `
      UPDATE users
      SET
        status = 'active',
        verification_token = NULL
      WHERE id = $1
    `,
    [userId]
  );
};
