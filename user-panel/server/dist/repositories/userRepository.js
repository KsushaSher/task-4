"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnverifiedUsers = exports.deleteUsers = exports.unblockUsers = exports.blockUsers = exports.getAllUsers = exports.findUserById = exports.updateLastLogin = exports.findUserByEmail = exports.verifyUserEmail = exports.findByVerificationToken = exports.createUser = void 0;
const db_1 = require("../config/db");
const createUser = async ({ id, name, email, passwordHash, verificationToken, status, isBlocked, createdAt, }) => {
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
    await db_1.pool.query(query, [
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
exports.createUser = createUser;
const findByVerificationToken = async (token) => {
    const result = await db_1.pool.query(`
      SELECT *
      FROM users
      WHERE verification_token = $1
    `, [token]);
    return result.rows[0];
};
exports.findByVerificationToken = findByVerificationToken;
const verifyUserEmail = async (userId) => {
    await db_1.pool.query(`
      UPDATE users
      SET
        status = 'active',
        verification_token = NULL
      WHERE id = $1
    `, [userId]);
};
exports.verifyUserEmail = verifyUserEmail;
const findUserByEmail = async (email) => {
    const result = await db_1.pool.query('SELECT * FROM users WHERE email = $1', [
        email,
    ]);
    return result.rows[0];
};
exports.findUserByEmail = findUserByEmail;
const updateLastLogin = async (userId) => {
    await db_1.pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [
        userId,
    ]);
};
exports.updateLastLogin = updateLastLogin;
const findUserById = async (id) => {
    const result = await db_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};
exports.findUserById = findUserById;
const getAllUsers = async () => {
    const result = await db_1.pool.query(`
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
    `);
    return result.rows;
};
exports.getAllUsers = getAllUsers;
const blockUsers = async (ids) => {
    await db_1.pool.query(`
    UPDATE users
    SET is_blocked = TRUE
    WHERE id = ANY($1)
    `, [ids]);
};
exports.blockUsers = blockUsers;
const unblockUsers = async (ids) => {
    await db_1.pool.query(`
    UPDATE users
    SET is_blocked = FALSE
    WHERE id = ANY($1)
    `, [ids]);
};
exports.unblockUsers = unblockUsers;
const deleteUsers = async (ids) => {
    await db_1.pool.query(`
    DELETE FROM users
    WHERE id = ANY($1)
    `, [ids]);
};
exports.deleteUsers = deleteUsers;
const deleteUnverifiedUsers = async () => {
    await db_1.pool.query(`
    DELETE FROM users
    WHERE status = 'unverified'
  `);
};
exports.deleteUnverifiedUsers = deleteUnverifiedUsers;
