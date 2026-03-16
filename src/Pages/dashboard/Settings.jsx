import useTheme from '../../context/useTheme';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-extrabold mb-1">Settings</h1>
      <p className="text-base-content/50 text-sm mb-8">Manage your preferences</p>

      <div className="space-y-4">
        <div className="card bg-base-100 shadow-sm p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold">Appearance</p>
            <p className="text-sm text-base-content/50">
              Currently: {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </p>
          </div>
          <button onClick={toggleTheme} className="btn btn-outline btn-sm">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>

        <div className="card bg-base-100 shadow-sm p-5">
          <p className="font-semibold mb-3">Notifications</p>
          {[
            { label: 'Email notifications for new orders', checked: true  },
            { label: 'Marketing emails and newsletters',   checked: false },
            { label: 'Security alerts',                   checked: true  },
          ].map(item => (
            <label
              key={item.label}
              className="flex items-center gap-3 py-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                defaultChecked={item.checked}
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>

        <div className="card bg-base-100 shadow-sm p-5 border border-error/30">
          <p className="font-semibold text-error mb-1">Danger Zone</p>
          <p className="text-sm text-base-content/60 mb-3">
            Permanently delete your account and all data.
          </p>
          <button className="btn btn-error btn-sm btn-outline">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;