import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../api/usersApi';
import UsersTable from '../components/UserTable';
import type { User } from '../types/user';

export default function UsersPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        setError('');

        const data = await getUsers(token);
        setUsers(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';

        setError(message);

        if (message.toLowerCase().includes('unauthorized')) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>User Management</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="alert alert-info">Loading users...</div>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
}
