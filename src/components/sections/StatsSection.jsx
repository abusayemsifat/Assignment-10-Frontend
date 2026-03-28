import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import api from '../../services/api';

const defaultStats = [
  { icon: '🐾', value: '12,000+', label: 'Pets Rehomed', numericValue: 12000 },
  { icon: '🏪', value: '850+',    label: 'Active Listings', numericValue: 850 },
  { icon: '👥', value: '3,200+',  label: 'Registered Users', numericValue: 3200 },
  { icon: '⭐', value: '4.9',     label: 'Average Rating', numericValue: 4.9 },
];

const StatsSection = () => {
  const [stats, setStats] = useState(defaultStats);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    api.get('/stats/admin')
      .then(({ data }) => {
        const s = data.stats;
        if (s) {
          setStats([
            { icon: '🐾', value: `${s.totalServices?.toLocaleString() || '850'}+`, label: 'Active Listings', numericValue: s.totalServices || 850 },
            { icon: '👥', value: `${s.totalUsers?.toLocaleString() || '3,200'}+`, label: 'Happy Members', numericValue: s.totalUsers || 3200 },
            { icon: '📦', value: `${s.totalOrders?.toLocaleString() || '5,000'}+`, label: 'Orders Placed', numericValue: s.totalOrders || 5000 },
            { icon: '⭐', value: '4.9', label: 'Average Rating', numericValue: 4.9 },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="section-title">PawMart by the Numbers</h2>
        <p className="section-subtitle">
          Trusted by thousands of pet lovers across the country
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="card bg-base-100 shadow-md p-8 text-center card-hover transition-all duration-300 hover:shadow-xl">
              <div className="text-5xl mb-3">{s.icon}</div>
              <p className="text-3xl font-extrabold text-primary">
                {inView ? (
                  <CountUp
                    end={s.numericValue}
                    duration={2}
                    suffix={s.value.includes('+') ? '+' : ''}
                    decimals={s.label === 'Average Rating' ? 1 : 0}
                  />
                ) : (
                  s.value
                )}
              </p>
              <p className="text-sm text-base-content/60 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;