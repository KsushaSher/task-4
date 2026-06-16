import type { RegisterRequest, RegisterResponse } from '../types/auth';

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await fetch('http://localhost:8888/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed');
  }

  return result;
};
