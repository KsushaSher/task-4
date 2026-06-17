import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  id: number;
  email: string;
};

export function getCurrentUserId(): number | null {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return decoded.id;
  } catch {
    return null;
  }
}
