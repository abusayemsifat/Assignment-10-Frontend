import { useEffect, useState } from 'react';
import api from '../../services/api';

const defaultStats = [
  { icon: '🐾', value: '12,000+', label: 'Pets Rehomed'     },
  { icon: '🏪', value: '850+',    label: 'Active Listings'  },
  { icon: '👥', value: '3,200+',  label: 'Registered Users' },
  { icon: '⭐', value: '4.9',     label: 'Average Rating'   },
];

const StatsSection = () => {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    api.get('/stats/admin')
      .then(({ data }) => {
        const s = data.stats;
        if (s) {
          setStats([
            { icon: '🐾', value: `${s.totalServices?.toLocaleString() || '850'}+`, label: 'Active Listings'  },
            { icon: '👥', value: `${s.totalUsers?.toLocaleString()    || '3,200'}+`, label: 'Happy Members'  },
            { icon: '📦', value: `${s.totalOrders?.toLocaleString()   || '5,000'}+`, label: 'Orders Placed'  },
            { icon: '⭐', value: '4.9',                                               label: 'Average Rating' },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="section-title">PawMart by the Numbers</h2>
        <p className="section-subtitle">
          Trusted by thousands of pet lovers across the country
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="card bg-base-100 shadow-md p-8 text-center card-hover">
              <div className="text-5xl mb-3">{s.icon}</div>
              <p className="text-3xl font-extrabold text-primary">{s.value}</p>
              <p className="text-sm text-base-content/60 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;