import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cats = [
  {
    label:    'Pets',
    value:    'pets',
    icon:     '🐾',
    gradient: 'from-blue-500 to-blue-600',
    bg:       'bg-blue-50 dark:bg-blue-900/20',
    border:   'border-blue-200 dark:border-blue-800',
    count:    '2,400+ listings',
    desc:     'Find adoptable pets near you',
  },
  {
    label:    'Food & Treats',
    value:    'food',
    icon:     '🦴',
    gradient: 'from-amber-500 to-orange-500',
    bg:       'bg-amber-50 dark:bg-amber-900/20',
    border:   'border-amber-200 dark:border-amber-800',
    count:    '850+ products',
    desc:     'Premium nutrition for every breed',
  },
  {
    label:    'Accessories',
    value:    'accessories',
    icon:     '🎀',
    gradient: 'from-rose-500 to-pink-500',
    bg:       'bg-rose-50 dark:bg-rose-900/20',
    border:   'border-rose-200 dark:border-rose-800',
    count:    '1,200+ items',
    desc:     'Collars, beds, toys and more',
  },
  {
    label:    'Care Products',
    value:    'care products',
    icon:     '💊',
    gradient: 'from-emerald-500 to-teal-500',
    bg:       'bg-emerald-50 dark:bg-emerald-900/20',
    border:   'border-emerald-200 dark:border-emerald-800',
    count:    '600+ products',
    desc:     'Grooming and health essentials',
  },
];

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const CategoriesSection = () => (
  <section className="py-20 bg-base-200">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-subtitle">Find exactly what you and your pet need</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
      >
        {cats.map(c => (
          <motion.div key={c.value} variants={item}>
            <Link to={'/explore?category=' + c.value}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${c.bg} border ${c.border} rounded-2xl p-6 text-center cursor-pointer group transition-shadow duration-300 hover:shadow-xl`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${c.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {c.icon}
                </div>
                <h3 className="font-bold text-base mb-1">{c.label}</h3>
                <p className="text-xs text-base-content/50 mb-2">{c.desc}</p>
                <span className="text-xs font-semibold text-primary">{c.count}</span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CategoriesSection;