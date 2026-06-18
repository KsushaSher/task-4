export const BASE_URL_SERVER = 'http://localhost:8888/api';
export const API_URL_USERS = `${BASE_URL_SERVER}/users`;
export const API_URL_AUTH = `${BASE_URL_SERVER}/auth`;

export const ROUTES = {
  ROOT: '/',
  USERS: '/users',
  REGISTER: '/register',
  VERIFY: 'verify/:token',
  LOGIN: '/login',
  NOT_FOUND: '*',
};
