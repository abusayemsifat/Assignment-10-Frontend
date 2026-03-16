import { Link } from 'react-router-dom';

const cats = [
  {
    label: 'Pets',
    value: 'pets',
    icon:  '🐾',
    color: 'bg-sky-100 dark:bg-sky-900/30',
    desc:  'Find adoptable pets near you',
  },
  {
    label: 'Food & Treats',
    value: 'food',
    icon:  '🦴',
    color: 'bg-amber-100 dark:bg-amber-900/30',
    desc:  'Premium nutrition for every breed',
  },
  {
    label: 'Accessories',
    value: 'accessories',
    icon:  '🎀',
    color: 'bg-rose-100 dark:bg-rose-900/30',
    desc:  'Collars, beds, toys and more',
  },
  {
    label: 'Care Products',
    value: 'care products',
    icon:  '💊',
    color: 'bg-emerald-100 dark:bg-emerald-900/30',
    desc:  'Grooming and health essentials',
  },
];

const CategoriesSection = () => (
  <section className="py-16 bg-base-200">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <h2 className="section-title">Browse by Category</h2>
      <p className="section-subtitle">
        Find exactly what you and your pet need
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {cats.map(c => (
          <Link key={c.value} to={`/explore?category=${c.value}`}>
            <div
              className={`${c.color} rounded-2xl p-6 text-center card-hover cursor-pointer group`}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform inline-block">
                {c.icon}
              </div>
              <h3 className="font-bold text-base mb-1">{c.label}</h3>
              <p className="text-xs text-base-content/60">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;