import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import useTheme from '../../context/useTheme';
import { getInitials } from '../../utils/helpers';
import toast from 'react-hot-toast';

const loggedOutLinks = [
  { to: '/',        label: 'Home'    },
  { to: '/explore', label: 'Explore' },
  { to: '/about',   label: 'About'   },
  { to: '/blog',    label: 'Blog'    },
  { to: '/contact', label: 'Contact' },
];

const loggedInLinks = [
  { to: '/',          label: 'Home'      },
  { to: '/explore',   label: 'Explore'   },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/blog',      label: 'Blog'      },
  { to: '/about',     label: 'About'     },
  { to: '/contact',   label: 'Contact'   },
];

const Navbar = () => {
  const { user, dbUser, logout } = useAuth();
  const { theme, toggleTheme }   = useTheme();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen,   setDropOpen]   = useState(false);
  const dropRef = useRef(null);

  const links = user ? loggedInLinks : loggedOutLinks;

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
    setDropOpen(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const linkCls = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-base-content'
    }`;

  return (
    <nav className="navbar bg-base-100/95 backdrop-blur-md shadow-sm sticky top-0 z-40 px-4 md:px-8">
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-primary">
          🐾 PawMart
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-6">
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkCls} end={l.to === '/'}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle btn-sm"
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {user ? (
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setDropOpen(d => !d)}
              className="btn btn-ghost btn-circle avatar"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {getInitials(user.displayName || user.email)}
                </div>
              )}
            </button>

            {dropOpen && (
              <div className="absolute right-0 top-12 w-52 bg-base-100 rounded-2xl shadow-xl border border-base-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-base-200">
                  <p className="font-semibold text-sm truncate">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-xs text-base-content/50 truncate">
                    {user.email}
                  </p>
                  {dbUser?.role === 'admin' && (
                    <span className="badge badge-primary badge-xs mt-1">
                      Admin
                    </span>
                  )}
                </div>
                <Link
                  to="/dashboard/profile"
                  onClick={() => setDropOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-base-200 transition-colors"
                >
                  👤 My Profile
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setDropOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-base-200 transition-colors"
                >
                  📊 Dashboard
                </Link>
                <Link
                  to="/dashboard/my-services"
                  onClick={() => setDropOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-base-200 transition-colors"
                >
                  🐾 My Services
                </Link>
                <Link
                  to="/dashboard/my-orders"
                  onClick={() => setDropOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-base-200 transition-colors"
                >
                  📦 My Orders
                </Link>
                <div className="border-t border-base-200 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-base-200 w-full transition-colors"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex gap-2">
            <Link to="/login">
              <button className="btn btn-ghost btn-sm">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-primary btn-sm">Sign Up</button>
            </Link>
          </div>
        )}

        <button
          onClick={() => setMobileOpen(o => !o)}
          className="btn btn-ghost btn-circle btn-sm lg:hidden"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-base-100 border-t border-base-200 shadow-xl lg:hidden z-40">
          <ul className="flex flex-col p-4 gap-1">
            {links.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `block py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-base-200'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            {!user && (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-base-200"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 px-4 rounded-xl text-sm font-medium text-primary hover:bg-primary/10"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;