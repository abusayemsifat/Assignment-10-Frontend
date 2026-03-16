import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../context/useAuth';
import { updateProfile } from 'firebase/auth';
import { DEMO_USER, DEMO_ADMIN } from '../utils/helpers';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const { login, loginWithGoogle, syncWithBackend } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from || '/';

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const e = {};
    if (!email)    e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await login(email, password);
      await syncWithBackend(result.user);
      toast.success('Welcome back! 🐾');
      navigate(from, { replace: true });
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      await syncWithBackend(result.user);
      toast.success('Welcome! 🐾');
      navigate(from, { replace: true });
    } catch {
      toast.error('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (type) => {
    const creds = type === 'admin' ? DEMO_ADMIN : DEMO_USER;
    setEmail(creds.email);
    setPassword(creds.password);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🐾</div>
            <h1 className="text-2xl font-extrabold">Welcome Back</h1>
            <p className="text-base-content/60 text-sm mt-1">
              Sign in to your PawMart account
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => fillDemo('user')}
              className="btn btn-outline btn-sm text-xs gap-1"
            >
              👤 Demo User
            </button>
            <button
              onClick={() => fillDemo('admin')}
              className="btn btn-outline btn-warning btn-sm text-xs gap-1"
            >
              🛡️ Demo Admin
            </button>
          </div>

          <div className="divider text-xs text-base-content/40">
            or sign in with email
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Email <span className="text-error">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setErrors(er => ({ ...er, email: '' }));
                }}
                placeholder="you@example.com"
                className={`input-field ${errors.email ? 'border-error' : ''}`}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs text-error mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium">
                  Password <span className="text-error">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setErrors(er => ({ ...er, password: '' }));
                  }}
                  placeholder="••••••••"
                  className={`input-field pr-10 ${errors.password ? 'border-error' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40"
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-error mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading
                ? <span className="loading loading-spinner loading-sm" />
                : 'Sign In'
              }
            </button>
          </form>

          <div className="divider text-xs text-base-content/40">or</div>

          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full gap-2"
            disabled={loading}
          >
            <FcGoogle size={20} /> Continue with Google
          </button>

          <p className="text-center text-sm text-base-content/60 mt-4">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;