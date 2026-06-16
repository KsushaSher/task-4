import bcrypt from 'bcrypt';
import { createUser } from '../repositories/userRepository';
import { sendVerificationEmail } from './emailService';
import { getUniqIdValue } from '../utils/getUniqIdValue';

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
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASSWORD);
  console.log('BEFORE EMAIL');
  sendVerificationEmail(email, verificationToken).catch(console.error);
  console.log('AFTER EMAIL');

  return {
    message: 'Registration successful. Verification email sent.',
  };
};
