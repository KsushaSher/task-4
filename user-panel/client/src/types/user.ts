export type UserStatus = 'unverified' | 'active' | 'blocked';

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
  last_login: string;
}
export interface UsersTableProps {
  users: User[];
}
