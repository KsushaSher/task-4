const API_URL = 'http://localhost:8888/api/users';
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function getUsers(token: string) {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || 'Failed to fetch users',
      response.status
    );
  }

  return data.users;
}

export async function blockUsers(ids: number[], token: string) {
  const response = await fetch(`${API_URL}/block`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function unblockUsers(ids: number[], token: string) {
  const response = await fetch(`${API_URL}/unblock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteUsers(ids: number[], token: string) {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete users');
  }

  return data;
}

export async function deleteUnverifiedUsers(ids: number[], token: string) {
  const response = await fetch(`${API_URL}/unverified`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
