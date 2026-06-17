import type { UsersTableProps } from '../types/user';

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created</th>
            <th>Last Login</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={
                    user.status === 'active'
                      ? 'badge bg-success'
                      : user.status === 'blocked'
                        ? 'badge bg-danger'
                        : 'badge bg-warning text-dark'
                  }
                >
                  {user.status}
                </span>
              </td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td>
                {user.last_login
                  ? new Date(user.last_login).toLocaleString()
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
