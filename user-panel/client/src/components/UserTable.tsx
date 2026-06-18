import type { UsersTableProps } from '../types/user';

const UsersTable = ({
  users,
  selectedIds,
  toggleUser,
  toggleSelectAll,
}: UsersTableProps) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  users.length > 0 && selectedIds.length === users.length
                }
                onChange={toggleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created</th>
            <th>Last Login</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const displayStatus = user.is_blocked ? 'blocked' : user.status;

            return (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.id)}
                    onChange={() => toggleUser(user.id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={
                      displayStatus === 'active'
                        ? 'badge bg-success'
                        : displayStatus === 'blocked'
                          ? 'badge bg-danger'
                          : 'badge bg-warning text-dark'
                    }
                  >
                    {displayStatus}
                  </span>
                </td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>
                  {user.last_login
                    ? new Date(user.last_login).toLocaleString()
                    : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
