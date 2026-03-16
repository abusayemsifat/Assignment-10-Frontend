import { CATEGORIES } from '../../../utils/helpers';

const icons  = { pets: '🐾', food: '🦴', accessories: '🎀', 'care products': '💊' };
const colors = [
  'bg-sky-100 text-sky-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-emerald-100 text-emerald-700',
];

const Categories = () => (
  <div>
    <h1 className="text-2xl font-extrabold mb-1">Categories</h1>
    <p className="text-base-content/50 text-sm mb-8">
      Manage your service categories
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {CATEGORIES.map((c, i) => (
        <div key={c} className={`card ${colors[i % 4]} p-6 text-center shadow-sm`}>
          <div className="text-5xl mb-3">{icons[c] || '🏷️'}</div>
          <h3 className="font-bold capitalize">{c}</h3>
          <p className="text-xs mt-1 opacity-70">Active category</p>
        </div>
      ))}
    </div>

    <div className="mt-8 card bg-base-100 shadow-sm p-6">
      <p className="text-base-content/60 text-sm">
        Categories are fixed. To add custom categories, update the{' '}
        <code className="bg-base-200 px-1 rounded">CATEGORIES</code> array in{' '}
        <code className="bg-base-200 px-1 rounded">utils/helpers.js</code> and
        update the backend validation accordingly.
      </p>
    </div>
  </div>
);

export default Categories;