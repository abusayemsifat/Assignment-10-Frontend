import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { register, loginWithGoogle, syncWithBackend } = useAuth();
  const navigate = useNavigate();

  const [form,     setForm]     = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  const update = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name     = 'Name is required';
    if (!form.email)          e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password)       e.password = 'Password is required';
    else if (form.password.length < 6)         e.password = 'Min 6 characters';
    else if (!/[A-Z]/.test(form.password))     e.password = 'Need one uppercase letter';
    else if (!/[a-z]/.test(form.password))     e.password = 'Need one lowercase letter';
    if (form.password !== form.confirm)        e.confirm  = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const cred = await register(form.email, form.password);
      await updateProfile(auth.currentUser, { displayName: form.name });
      await syncWithBackend({ ...cred.user, displayName: form.name });
      toast.success('Account created! Welcome to PawMart 🐾');
      navigate('/');
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use'
        ? 'This email is already registered'
        : 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      await syncWithBackend(result.user);
      toast.success('Welcome to PawMart! 🐾');
      navigate('/');
    } catch {
      toast.error('Google sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🐾</div>
            <h1 className="text-2xl font-extrabold">Create Account</h1>
            <p className="text-base-content/60 text-sm mt-1">
              Join thousands of pet lovers
            </p>
          </div>

          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full gap-2 mb-4"
            disabled={loading}
          >
            <FcGoogle size={20} /> Continue with Google
          </button>

          <div className="divider text-xs text-base-content/40">
            or register with email
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {[
              { name: 'name',     label: 'Full Name',        type: 'text',     placeholder: 'John Doe',         auto: 'name'         },
              { name: 'email',    label: 'Email',            type: 'email',    placeholder: 'you@example.com',  auto: 'email'        },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium mb-1.5">
                  {f.label} <span className="text-error">*</span>
                </label>
                <input
                  type={f.type}
                  value={form[f.name]}
                  onChange={update(f.name)}
                  placeholder={f.placeholder}
                  autoComplete={f.auto}
                  className={`input-field ${errors[f.name] ? 'border-error' : ''}`}
                />
                {errors[f.name] && (
                  <p className="text-xs text-error mt-1">{errors[f.name]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Password <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  placeholder="Min 6 chars, 1 uppercase"
                  autoComplete="new-password"
                  className={`input-field pr-10 ${errors.password ? 'border-error' : ''}`}
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

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Confirm Password <span className="text-error">*</span>
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                value={form.confirm}
                onChange={update('confirm')}
                placeholder="Repeat password"
                autoComplete="new-password"
                className={`input-field ${errors.confirm ? 'border-error' : ''}`}
              />
              {errors.confirm && (
                <p className="text-xs text-error mt-1">{errors.confirm}</p>
              )}
            </div>

            <div className="bg-base-200 rounded-xl p-3 text-xs space-y-1">
              <p className={form.password.length >= 6       ? 'text-success' : 'text-base-content/50'}>✓ At least 6 characters</p>
              <p className={/[A-Z]/.test(form.password)     ? 'text-success' : 'text-base-content/50'}>✓ One uppercase letter</p>
              <p className={/[a-z]/.test(form.password)     ? 'text-success' : 'text-base-content/50'}>✓ One lowercase letter</p>
              <p className={form.password === form.confirm && form.confirm ? 'text-success' : 'text-base-content/50'}>✓ Passwords match</p>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading
                ? <span className="loading loading-spinner loading-sm" />
                : 'Create Account'
              }
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;