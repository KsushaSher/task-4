export type UserStatus = 'unverified' | 'active' | 'blocked';

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: 'unverified' | 'active';
  is_blocked: boolean;
  created_at: string;
  last_login: string | null;
}

export interface UsersTableProps {
  users: User[];
  selectedIds: number[];
  toggleUser: (id: number) => void;
  toggleSelectAll: () => void;
}
