import { pool } from '../config/db';
import { CreateUserParams } from '../types/auth.types';

export const createUser = async ({
  id,
  name,
  email,
  passwordHash,
  verificationToken,
  status,
  isBlocked,
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
      is_blocked,
      created_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  await pool.query(query, [
    id,
    name,
    email,
    passwordHash,
    verificationToken,
    status,
    isBlocked,
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

export async function findUserByEmail(email: string) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  return result.rows[0];
}

export async function updateLastLogin(userId: string) {
  await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [
    userId,
  ]);
}

export async function findUserById(id: string) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

  return result.rows[0];
}

export async function getAllUsers() {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      status,
      is_blocked,
      created_at,
      last_login
    FROM users
    ORDER BY last_login DESC NULLS LAST
    `
  );

  return result.rows;
}

export async function blockUsers(ids: number[]) {
  await pool.query(
    `
    UPDATE users
    SET is_blocked = TRUE
    WHERE id = ANY($1)
    `,
    [ids]
  );
}
export async function unblockUsers(ids: number[]) {
  await pool.query(
    `
    UPDATE users
    SET is_blocked = FALSE
    WHERE id = ANY($1)
    `,
    [ids]
  );
}
export async function deleteUsers(ids: number[]) {
  await pool.query(
    `
    DELETE FROM users
    WHERE id = ANY($1)
    `,
    [ids]
  );
}
export async function deleteUnverifiedUsers() {
  await pool.query(`
    DELETE FROM users
    WHERE status = 'unverified'
  `);
}
