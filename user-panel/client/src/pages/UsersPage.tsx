import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ApiError,
  blockUsers,
  deleteUnverifiedUsers,
  deleteUsers,
  getUsers,
  unblockUsers,
} from '../api/usersApi';
import UsersTable from '../components/UserTable';
import type { User } from '../types/user';
import { ROUTES } from '../shared/constants/apiRoutes';
import UsersToolbar from '../components/UsersToolbar';
import { getCurrentUserId } from '../utils/getCurrentUserId';

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const loadUsers = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate(ROUTES.LOGIN);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await getUsers(token);
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);

        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('token');
          navigate(ROUTES.LOGIN);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate(ROUTES.LOGIN);
      return;
    }

    void loadUsers();
  }, [navigate, loadUsers]);

  const toggleUser = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === users.length) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(users.map((user) => user.id));
  };

  const handleBlock = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const currentUserId = getCurrentUserId();

    const blockingSelf =
      currentUserId !== null && selectedIds.includes(currentUserId);

    try {
      await blockUsers(selectedIds, token);

      setSelectedIds([]);

      if (blockingSelf) {
        localStorage.removeItem('token');
        navigate(ROUTES.LOGIN);
        return;
      }

      await loadUsers();
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);

        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('token');
          navigate(ROUTES.LOGIN);
        }
      } else {
        setError('Unknown error');
      }
    }
  };

  const handleUnblock = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      await unblockUsers(selectedIds, token);
      setSelectedIds([]);
      await loadUsers();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const currentUserId = getCurrentUserId();
    const deletingSelf =
      currentUserId !== null && selectedIds.includes(currentUserId);
    try {
      await deleteUsers(selectedIds, token);
      if (deletingSelf) {
        localStorage.removeItem('token');
        navigate(ROUTES.LOGIN);
        return;
      }
      setSelectedIds([]);
      await loadUsers();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    }
  };

  const handleDeleteUnverified = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      await deleteUnverifiedUsers(selectedIds, token);
      await loadUsers();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <UsersToolbar
        selectedCount={selectedIds.length}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        onDelete={handleDelete}
        onDeleteUnverified={handleDeleteUnverified}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="alert alert-info">Loading users...</div>
      ) : (
        <UsersTable
          users={users}
          selectedIds={selectedIds}
          toggleUser={toggleUser}
          toggleSelectAll={toggleSelectAll}
        />
      )}
    </div>
  );
}
