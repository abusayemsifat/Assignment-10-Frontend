import { useState, useEffect, useCallback } from 'react';
import api from '../../../services/api';
import { formatDate } from '../../../utils/helpers';
import Pagination from '../../../components/ui/Pagination';
import useDebounce from '../../../hooks/useDebounce';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users,   setUsers]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [pages,   setPages]   = useState(1);
  const [page,    setPage]    = useState(1);
  const [search,  setSearch]  = useState('');
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 400);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/users?page=${page}&limit=10&search=${debouncedSearch}`
      );
      setUsers(data.users  || []);
      setTotal(data.total  || 0);
      setPages(data.pages  || 1);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleRoleChange = async (id, newRole) => {
    const result = await Swal.fire({
      title:            `Make this user ${newRole}?`,
      icon:             'question',
      showCancelButton: true,
      confirmButtonColor: '#0ea5e9',
    });
    if (!result.isConfirmed) return;
    try {
      await api.put(`/users/${id}/role`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
      toast.success('User role updated');
    } catch {
      toast.error('Failed to update role');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title:             'Delete this user?',
      text:              'All their data will be removed.',
      icon:              'warning',
      showCancelButton:  true,
      confirmButtonColor:'#ef4444',
      confirmButtonText: 'Yes, delete',
    });
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
      setTotal(t => t - 1);
      toast.success('User deleted');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Manage Users</h1>
          <p className="text-base-content/50 text-sm">{total} total users</p>
        </div>
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search users..."
          className="input-field w-64"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 text-base-content/50">No users found</div>
      ) : (
        <>
          <div className="card bg-base-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr className="bg-base-200 text-xs">
                    <th>#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u._id} className="hover">
                      <td className="text-xs text-base-content/40">
                        {(page - 1) * 10 + i + 1}
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          {u.photoURL ? (
                            <img
                              src={u.photoURL}
                              className="w-8 h-8 rounded-full object-cover"
                              alt=""
                              onError={e => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                              {(u.name || 'U')[0].toUpperCase()}
                            </div>
                          )}
                          <span className="font-medium text-sm">{u.name}</span>
                        </div>
                      </td>
                      <td className="text-sm text-base-content/70">{u.email}</td>
                      <td>
                        <span className={`badge badge-sm ${u.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="text-xs text-base-content/50">
                        {formatDate(u.createdAt)}
                      </td>
                      <td>
                        <div className="flex gap-1 flex-wrap">
                          {u.role === 'user' ? (
                            <button
                              onClick={() => handleRoleChange(u._id, 'admin')}
                              className="btn btn-ghost btn-xs text-primary"
                            >
                              Make Admin
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRoleChange(u._id, 'user')}
                              className="btn btn-ghost btn-xs text-warning"
                            >
                              Remove Admin
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(u._id)}
                            className="btn btn-ghost btn-xs text-error"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            currentPage={page}
            totalPages={pages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default ManageUsers;