import bcrypt from 'bcrypt';
import { createUser } from '../repositories/userRepository';
import { sendVerificationEmail } from './emailService';
import { getUniqIdValue } from '../utils/getUniqIdValue';
import {
  findByVerificationToken,
  verifyUserEmail,
} from '../repositories/userRepository';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

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
