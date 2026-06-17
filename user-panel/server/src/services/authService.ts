import bcrypt from 'bcrypt';
import {
  createUser,
  findUserByEmail,
  updateLastLogin,
} from '../repositories/userRepository';
import { sendVerificationEmail } from './emailService';
import { getUniqIdValue } from '../utils/getUniqIdValue';
import {
  findByVerificationToken,
  verifyUserEmail,
} from '../repositories/userRepository';
import { comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { LoginDto, RegisterParams } from '../types/auth.types';

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterParams) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const userId = getUniqIdValue();
  const verificationToken = getUniqIdValue();

  await createUser({
    id: userId,
    name,
    email,
    passwordHash,
    verificationToken,
    status: 'unverified',
    isBlocked: false,
    createdAt: new Date(),
  });
  sendVerificationEmail(email, verificationToken).catch(console.error);

  return {
    message: 'Registration successful. Verification email sent.',
  };
};

export const verifyEmail = async (token: string) => {
  const user = await findByVerificationToken(token);

  if (!user) {
    return {
      message: 'Token already used or invalid',
    };
  }

  if (user.status === 'unverified') {
    await verifyUserEmail(user.id);
  }

  return {
    message: 'Email verified successfully',
  };
};

export async function loginService({ email, password }: LoginDto) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await comparePassword(password, user.password_hash);

  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  if (user.is_blocked) {
    throw new Error('User is blocked');
  }

  await updateLastLogin(user.id);

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
    },
  };
}
