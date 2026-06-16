import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// export async function hashPassword(password: string) {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);
// }
