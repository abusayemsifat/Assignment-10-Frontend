import { useEffect, useState } from 'react';
import useAuth from '../../context/useAuth';
import api from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/helpers';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const MONTHS     = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const PIE_COLORS = ['#0ea5e9','#f97316','#22c55e','#a855f7'];

const Overview = () => {
  const { isAdmin } = useAuth();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(isAdmin ? '/stats/admin' : '/stats/user')
      .then(r => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const monthlyData = (data?.monthlyOrders || []).map(m => ({
    name:    MONTHS[m._id.month - 1],
    orders:  m.count,
    revenue: m.revenue || 0,
  }));

  const categoryData = (data?.categoryDist || []).map(c => ({
    name:  c._id || 'Unknown',
    value: c.count,
  }));

  const adminStats = [
    { icon: '👥', label: 'Total Users',    value: data?.stats?.totalUsers    || 0,                           color: 'text-primary' },
    { icon: '🐾', label: 'Total Listings', value: data?.stats?.totalServices || 0,                           color: 'text-success' },
    { icon: '📦', label: 'Total Orders',   value: data?.stats?.totalOrders   || 0,                           color: 'text-warning' },
    { icon: '💰', label: 'Revenue',        value: formatCurrency(data?.stats?.revenue || 0),                  color: 'text-error'   },
  ];

  const userStats = [
    { icon: '🐾', label: 'My Listings', value: data?.stats?.myServices || 0, color: 'text-primary' },
    { icon: '📦', label: 'My Orders',   value: data?.stats?.myOrders   || 0, color: 'text-success' },
  ];

  const stats = isAdmin ? adminStats : userStats;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1">
        {isAdmin ? 'Admin' : 'User'} Overview
      </h1>
      <p className="text-base-content/50 text-sm mb-8">
        Welcome back! Here is what is happening.
      </p>

      <div className={`grid gap-5 mb-8 ${isAdmin ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2'}`}>
        {stats.map(s => (
          <div key={s.label} className="card bg-base-100 shadow-sm p-6 flex items-center gap-4">
            <div className="text-4xl">{s.icon}</div>
            <div>
              <p className="text-xs text-base-content/50">{s.label}</p>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {isAdmin && monthlyData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card bg-base-100 shadow-sm p-5 lg:col-span-2">
            <h3 className="font-bold mb-4 text-sm">Monthly Orders</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card bg-base-100 shadow-sm p-5">
            <h3 className="font-bold mb-4 text-sm">Listings by Category</h3>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-sm text-base-content/40 mt-8">
                No data yet
              </p>
            )}
          </div>
        </div>
      )}

      {isAdmin && monthlyData.length > 0 && (
        <div className="card bg-base-100 shadow-sm p-5 mb-8">
          <h3 className="font-bold mb-4 text-sm">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} />
              <Tooltip formatter={v => formatCurrency(v)} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-base-200">
            <h3 className="font-bold text-sm">Recent Orders</h3>
          </div>
          {(data?.recentOrders || []).length === 0 ? (
            <p className="text-center text-sm text-base-content/40 py-8">
              No orders yet
            </p>
          ) : (
            <div className="divide-y divide-base-200">
              {(data?.recentOrders || []).map(o => (
                <div key={o._id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{o.productName}</p>
                    <p className="text-xs text-base-content/40">
                      {formatDate(o.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-primary">
                      {formatCurrency(o.price * o.quantity)}
                    </p>
                    <span className={`badge badge-xs ${o.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isAdmin ? (
          <div className="card bg-base-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-base-200">
              <h3 className="font-bold text-sm">Recent Users</h3>
            </div>
            {(data?.recentUsers || []).length === 0 ? (
              <p className="text-center text-sm text-base-content/40 py-8">
                No users yet
              </p>
            ) : (
              <div className="divide-y divide-base-200">
                {(data?.recentUsers || []).map(u => (
                  <div key={u._id} className="px-6 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">
                      {(u.name || 'U')[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{u.name}</p>
                      <p className="text-xs text-base-content/40 truncate">{u.email}</p>
                    </div>
                    <span className={`badge badge-xs ${u.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-base-200">
              <h3 className="font-bold text-sm">My Recent Listings</h3>
            </div>
            {(data?.recentServices || []).length === 0 ? (
              <p className="text-center text-sm text-base-content/40 py-8">
                No listings yet
              </p>
            ) : (
              <div className="divide-y divide-base-200">
                {(data?.recentServices || []).map(s => (
                  <div key={s._id} className="px-6 py-3 flex items-center gap-3">
                    <img
                      src={s.image}
                      className="w-10 h-10 rounded-xl object-cover"
                      alt=""
                      onError={e => { e.target.src = 'https://placehold.co/40'; }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{s.name}</p>
                      <p className="text-xs text-base-content/40 capitalize">
                        {s.category}
                      </p>
                    </div>
                    <p className="font-bold text-sm text-primary">
                      {s.price === 0 ? 'Free' : formatCurrency(s.price)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;