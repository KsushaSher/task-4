export type UserStatus = 'unverified' | 'active' | 'blocked';

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
}
