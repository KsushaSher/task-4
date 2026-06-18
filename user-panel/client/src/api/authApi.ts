import { API_URL_AUTH } from '../shared/constants';
import type { RegisterRequest, RegisterResponse } from '../types/auth';

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL_AUTH}/register`, {
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

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL_AUTH}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};
