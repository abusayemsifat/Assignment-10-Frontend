import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [scrolled,   setScrolled]   = useState(false);
  const dropRef = useRef(null);

  const links = user ? loggedInLinks : loggedOutLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    `relative text-sm font-semibold transition-colors duration-200 hover:text-primary ${
      isActive ? 'text-primary' : 'text-base-content/70'
    }`;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-base-100/90 backdrop-blur-xl shadow-lg shadow-gray-900/5 border-b border-base-200'
          : 'bg-base-100/70 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-200">
            <span className="text-white text-sm">🐾</span>
          </div>
          <span className="font-extrabold text-xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            PawMart
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={linkCls} end={l.to === '/'}>
              {({ isActive }) => (
                <span className="relative">
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-base-200 transition-colors"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-base"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {user ? (
            <div className="relative" ref={dropRef}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setDropOpen(d => !d)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-base-200 transition-colors"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-xl object-cover ring-2 ring-primary/20" />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-white text-xs font-bold flex items-center justify-center shadow-md shadow-blue-500/30">
                    {getInitials(user.displayName || user.email)}
                  </div>
                )}
                <span className="hidden md:block text-sm font-semibold max-w-[100px] truncate">
                  {user.displayName || 'User'}
                </span>
                <motion.span
                  animate={{ rotate: dropOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-base-content/40"
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-56 bg-base-100 rounded-2xl shadow-2xl shadow-gray-900/10 border border-base-200 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-base-200">
                      <p className="font-bold text-sm truncate">{user.displayName || 'User'}</p>
                      <p className="text-xs text-base-content/40 truncate">{user.email}</p>
                      {dbUser?.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-lg">
                          Admin
                        </span>
                      )}
                    </div>
                    {[
                      { to: '/dashboard/profile',      icon: '👤', label: 'My Profile'   },
                      { to: '/dashboard',              icon: '📊', label: 'Dashboard'    },
                      { to: '/dashboard/my-services',  icon: '🐾', label: 'My Services'  },
                      { to: '/dashboard/my-orders',    icon: '📦', label: 'My Orders'    },
                    ].map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-base-200 transition-colors font-medium"
                      >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-base-200 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 w-full transition-colors font-medium"
                      >
                        <span>🚪</span> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-semibold rounded-xl hover:bg-base-200 transition-colors"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-gradient text-sm px-5 py-2 rounded-xl"
                >
                  Sign Up Free
                </motion.button>
              </Link>
            </div>
          )}

          {/* Hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(o => !o)}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-base-200 transition-colors lg:hidden"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-base-content rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 bg-base-content rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-base-content rounded-full"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-base-200 bg-base-100/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `block py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-primary'
                          : 'hover:bg-base-200 text-base-content/70'
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              {!user && (
                <div className="flex gap-2 pt-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                    <button className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold border border-base-300 hover:bg-base-200 transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                    <button className="w-full btn-gradient text-sm py-2.5 px-4 rounded-xl">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;