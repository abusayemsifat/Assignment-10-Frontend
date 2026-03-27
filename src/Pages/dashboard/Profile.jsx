import { useState } from 'react';
import useAuth from '../../context/useAuth';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { getInitials } from '../../utils/helpers';
import auth from '../../Firebase/firebase.config';

const Profile = () => {
  const { user, dbUser, updateUserProfile, syncWithBackend } = useAuth();

  const [form,     setForm]     = useState({ name: user?.displayName || '', photoURL: user?.photoURL || '' });
  const [pwForm,   setPwForm]   = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving,   setSaving]   = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [tab,      setTab]      = useState('profile');
  const [errors,   setErrors]   = useState({});
  const [pwErrors, setPwErrors] = useState({});

  // Helper function to validate URL length
  const isUrlTooLong = (url) => {
    // Firebase has a limit of around 200-300 characters for photoURL
    return url && url.length > 250;
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    
    // Validate name
    if (!form.name.trim()) { 
      setErrors({ name: 'Name is required' }); 
      return; 
    }
    
    // Validate photo URL length
    if (form.photoURL && isUrlTooLong(form.photoURL)) {
      toast.error('Photo URL is too long. Please use a shorter URL or upload to a service like Imgur.');
      setErrors({ photoURL: 'URL is too long (max 250 characters)' });
      return;
    }
    
    setSaving(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('You must be logged in to update profile');
      }
      
      // Update Firebase profile (will handle long URLs gracefully)
      await updateUserProfile(form.name, form.photoURL);
      
      // Update backend database
      await api.put('/users/profile', { 
        name: form.name, 
        photoURL: form.photoURL 
      });
      
      // Sync with backend to refresh user data
      await syncWithBackend(currentUser);
      
      toast.success('Profile updated successfully! 🎉');
      setErrors({});
      
      // Refresh to show updated data
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
    } catch (error) {
      console.error('Profile update error:', error);
      
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Please re-authenticate to update your profile');
      } else if (error.code === 'auth/invalid-profile-attribute') {
        toast.error('Photo URL is invalid or too long. Please use a shorter URL.');
      } else if (error.message === 'No user logged in') {
        toast.error('Session expired. Please log in again.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to update profile');
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    const e2 = {};
    if (!pwForm.currentPassword)    e2.currentPassword = 'Required';
    if (!pwForm.newPassword)        e2.newPassword     = 'Required';
    else if (pwForm.newPassword.length < 6)       e2.newPassword = 'Min 6 characters';
    else if (!/[A-Z]/.test(pwForm.newPassword))   e2.newPassword = 'Need one uppercase letter';
    if (pwForm.newPassword !== pwForm.confirmPassword) e2.confirmPassword = 'Passwords do not match';
    setPwErrors(e2);
    if (Object.keys(e2).length) return;

    setPwSaving(true);
    try {
      await api.put('/users/password', {
        currentPassword: pwForm.currentPassword,
        newPassword:     pwForm.newPassword,
      });
      toast.success('Password updated successfully! 🔒');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold mb-1">My Profile</h1>
      <p className="text-base-content/50 text-sm mb-6">
        Manage your account information and security
      </p>

      <div className="card bg-base-100 shadow-sm p-6 mb-6 flex items-center gap-5">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
            onError={e => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary text-2xl font-extrabold flex items-center justify-center border-4 border-primary/20">
            {getInitials(user?.displayName || user?.email)}
          </div>
        )}
        <div>
          <p className="text-xl font-bold">{user?.displayName || 'User'}</p>
          <p className="text-sm text-base-content/50">{user?.email}</p>
          {dbUser?.role && (
            <span className={`badge badge-sm mt-1 ${dbUser.role === 'admin' ? 'badge-primary' : 'badge-secondary'}`}>
              {dbUser.role}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-base-200 rounded-xl p-1 w-fit">
        {['profile', 'password'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
              tab === t ? 'bg-base-100 shadow-sm' : 'text-base-content/50'
            }`}
          >
            {t === 'profile' ? 'Profile Info' : 'Password'}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="card bg-base-100 shadow-sm p-6">
          <form onSubmit={handleProfileSave} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Full Name <span className="text-error">*</span>
              </label>
              <input
                value={form.name}
                onChange={e => {
                  setForm(f => ({ ...f, name: e.target.value }));
                  setErrors({});
                }}
                className={`input-field ${errors.name ? 'border-error' : ''}`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-xs text-error mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                value={user?.email}
                disabled
                className="input-field opacity-60 cursor-not-allowed"
              />
              <p className="text-xs text-base-content/40 mt-1">
                Email cannot be changed
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Photo URL
              </label>
              <input
                value={form.photoURL}
                onChange={e => {
                  setForm(f => ({ ...f, photoURL: e.target.value }));
                  setErrors({});
                }}
                className={`input-field ${errors.photoURL ? 'border-error' : ''}`}
                placeholder="https://example.com/photo.jpg"
              />
              {errors.photoURL && (
                <p className="text-xs text-error mt-1">{errors.photoURL}</p>
              )}
              {form.photoURL && (
                <>
                  <img
                    src={form.photoURL}
                    alt="preview"
                    className="w-16 h-16 rounded-full object-cover mt-2 border border-base-300"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  {form.photoURL.length > 200 && (
                    <p className="text-xs text-warning mt-1">
                      ⚠️ URL is {form.photoURL.length} characters long. Try to keep it under 250 characters.
                    </p>
                  )}
                </>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving
                ? <span className="loading loading-spinner loading-sm" />
                : 'Save Changes'
              }
            </button>
          </form>
        </div>
      )}

      {tab === 'password' && (
        <div className="card bg-base-100 shadow-sm p-6">
          <form onSubmit={handlePasswordSave} className="space-y-5">
            {[
              { name: 'currentPassword', label: 'Current Password', placeholder: '••••••••'                  },
              { name: 'newPassword',     label: 'New Password',     placeholder: 'Min 6 chars, 1 uppercase'  },
              { name: 'confirmPassword', label: 'Confirm Password', placeholder: 'Repeat new password'       },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium mb-1.5">
                  {f.label} <span className="text-error">*</span>
                </label>
                <input
                  type="password"
                  value={pwForm[f.name]}
                  onChange={e => {
                    setPwForm(p => ({ ...p, [f.name]: e.target.value }));
                    setPwErrors(er => ({ ...er, [f.name]: '' }));
                  }}
                  placeholder={f.placeholder}
                  className={`input-field ${pwErrors[f.name] ? 'border-error' : ''}`}
                />
                {pwErrors[f.name] && (
                  <p className="text-xs text-error mt-1">{pwErrors[f.name]}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={pwSaving}
            >
              {pwSaving
                ? <span className="loading loading-spinner loading-sm" />
                : 'Update Password'
              }
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;