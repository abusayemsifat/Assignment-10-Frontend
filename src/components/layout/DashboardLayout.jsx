import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import toast from 'react-hot-toast';

const adminLinks = [
  { to: '/dashboard',              label: 'Overview',     icon: '📊' },
  { to: '/dashboard/manage-users', label: 'Manage Users', icon: '👥' },
  { to: '/dashboard/manage-items', label: 'Manage Items', icon: '🐾' },
  { to: '/dashboard/orders',       label: 'Orders',       icon: '📦' },
  { to: '/dashboard/categories',   label: 'Categories',   icon: '🏷️' },
  { to: '/dashboard/profile',      label: 'Profile',      icon: '👤' },
  { to: '/dashboard/settings',     label: 'Settings',     icon: '⚙️' },
];

const userLinks = [
  { to: '/dashboard',             label: 'Overview',    icon: '📊' },
  { to: '/dashboard/my-services', label: 'My Services', icon: '🐾' },
  { to: '/dashboard/add-service', label: 'Add Service', icon: '➕' },
  { to: '/dashboard/my-orders',   label: 'My Orders',   icon: '📦' },
  { to: '/dashboard/profile',     label: 'Profile',     icon: '👤' },
  { to: '/dashboard/settings',    label: 'Settings',    icon: '⚙️' },
];

const linkCls = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
    isActive
      ? 'bg-primary text-white shadow-md'
      : 'text-base-content hover:bg-base-200'
  }`;

const Sidebar = ({ user, isAdmin, links, onClose, onLogout }) => (
  <aside className="w-64 min-h-screen bg-base-100 border-r border-base-200 flex flex-col">
    <div className="p-5 border-b border-base-200">
      <NavLink to="/" className="text-xl font-extrabold text-primary">
        🐾 PawMart
      </NavLink>
      <div className="mt-3 flex items-center gap-3">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            className="w-9 h-9 rounded-full object-cover"
            alt="avatar"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-sm">
            {(user?.displayName || 'U')[0].toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-semibold text-sm truncate max-w-[120px]">
            {user?.displayName || 'User'}
          </p>
          <span
            className={`badge badge-xs ${
              isAdmin ? 'badge-primary' : 'badge-secondary'
            }`}
          >
            {isAdmin ? 'Admin' : 'User'}
          </span>
        </div>
      </div>
    </div>

    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {links.map(l => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.to === '/dashboard'}
          className={linkCls}
          onClick={onClose}
        >
          <span>{l.icon}</span>
          <span>{l.label}</span>
        </NavLink>
      ))}
    </nav>

    <div className="p-4 border-t border-base-200">
      <NavLink
        to="/"
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-base-200 transition-colors mb-1"
      >
        🏠 Back to Site
      </NavLink>
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-error hover:bg-error/10 w-full transition-colors"
      >
        🚪 Logout
      </button>
    </div>
  </aside>
);

const DashboardLayout = () => {
  const { user, dbUser, logout } = useAuth();
  const navigate    = useNavigate();
  const [open, setOpen] = useState(false);

  const isAdmin = dbUser?.role === 'admin';
  const links   = isAdmin ? adminLinks : userLinks;

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Desktop sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar
          user={user}
          isAdmin={isAdmin}
          links={links}
          onClose={() => {}}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10">
            <Sidebar
              user={user}
              isAdmin={isAdmin}
              links={links}
              onClose={() => setOpen(false)}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-base-100 border-b border-base-200 sticky top-0 z-30">
          <button
            onClick={() => setOpen(true)}
            className="btn btn-ghost btn-circle btn-sm"
          >
            ☰
          </button>
          <span className="font-bold text-primary">🐾 Dashboard</span>
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;