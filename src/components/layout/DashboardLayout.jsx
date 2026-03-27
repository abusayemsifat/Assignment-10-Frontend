import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../context/useAuth';
import toast from 'react-hot-toast';

const adminLinks = [
  { to: '/dashboard',              label: 'Overview',     icon: '📊', color: 'text-blue-500'   },
  { to: '/dashboard/manage-users', label: 'Manage Users', icon: '👥', color: 'text-purple-500' },
  { to: '/dashboard/manage-items', label: 'Manage Items', icon: '🐾', color: 'text-blue-500'   },
  { to: '/dashboard/orders',       label: 'Orders',       icon: '📦', color: 'text-amber-500'  },
  { to: '/dashboard/categories',   label: 'Categories',   icon: '🏷️', color: 'text-rose-500'   },
  { to: '/dashboard/profile',      label: 'Profile',      icon: '👤', color: 'text-teal-500'   },
  { to: '/dashboard/settings',     label: 'Settings',     icon: '⚙️', color: 'text-gray-500'   },
];

const userLinks = [
  { to: '/dashboard',             label: 'Overview',    icon: '📊', color: 'text-blue-500'  },
  { to: '/dashboard/my-services', label: 'My Services', icon: '🐾', color: 'text-blue-500'  },
  { to: '/dashboard/add-service', label: 'Add Service', icon: '➕', color: 'text-green-500' },
  { to: '/dashboard/my-orders',   label: 'My Orders',   icon: '📦', color: 'text-amber-500' },
  { to: '/dashboard/profile',     label: 'Profile',     icon: '👤', color: 'text-teal-500'  },
  { to: '/dashboard/settings',    label: 'Settings',    icon: '⚙️', color: 'text-gray-500'  },
];

const Sidebar = ({ user, isAdmin, links, onClose, onLogout }) => (
  <aside className="w-64 min-h-screen flex flex-col bg-base-100 border-r border-base-200">

    {/* Logo */}
    <div className="px-6 py-5 border-b border-base-200">
      <NavLink to="/" className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="text-white text-sm">🐾</span>
        </div>
        <span className="font-extrabold text-lg bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          PawMart
        </span>
      </NavLink>

      {/* User info */}
      <div className="flex items-center gap-3 p-3 bg-base-200 rounded-xl">
        {user?.photoURL ? (
          <img src={user.photoURL} className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/20" alt="avatar" />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/30">
            {(user?.displayName || 'U')[0].toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate">{user?.displayName || 'User'}</p>
          <span className={`inline-block px-2 py-0.5 rounded-lg text-xs font-semibold mt-0.5 ${
            isAdmin
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
          }`}>
            {isAdmin ? 'Admin' : 'User'}
          </span>
        </div>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      <p className="text-xs font-bold text-base-content/30 uppercase tracking-widest px-3 mb-3">
        {isAdmin ? 'Administration' : 'My Account'}
      </p>
      {links.map(l => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.to === '/dashboard'}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`text-base transition-none ${isActive ? 'grayscale-0' : ''}`}>
                {l.icon}
              </span>
              <span>{l.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Footer */}
    <div className="px-3 py-4 border-t border-base-200 space-y-0.5">
      <NavLink
        to="/"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-base-content/60 hover:bg-base-200 hover:text-base-content transition-colors"
      >
        <span>🏠</span>
        <span>Back to Site</span>
      </NavLink>
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 w-full transition-colors"
      >
        <span>🚪</span>
        <span>Logout</span>
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
      <div className="hidden lg:block flex-shrink-0 sticky top-0 h-screen">
        <Sidebar
          user={user}
          isAdmin={isAdmin}
          links={links}
          onClose={function() {}}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full lg:hidden"
            >
              <Sidebar
                user={user}
                isAdmin={isAdmin}
                links={links}
                onClose={() => setOpen(false)}
                onLogout={handleLogout}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-base-100 border-b border-base-200 sticky top-0 z-30">
          <button
            onClick={() => setOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-base-200 transition-colors"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span className="block h-0.5 bg-base-content rounded-full" />
              <span className="block h-0.5 bg-base-content rounded-full w-3/4" />
              <span className="block h-0.5 bg-base-content rounded-full" />
            </div>
          </button>
          <span className="font-extrabold text-lg bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            🐾 Dashboard
          </span>
        </div>

        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 p-4 md:p-8 overflow-auto"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;