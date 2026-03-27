import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency, truncate } from '../../utils/helpers';

const categoryColors = {
  pets:            'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  food:            'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  accessories:     'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  'care products': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
};

const categoryIcons = {
  pets:            '🐾',
  food:            '🦴',
  accessories:     '🎀',
  'care products': '💊',
};

const ServiceCard = ({ service, index = 0 }) => {
  const { _id, name, description, price, category, image, location, rating } = service;
  const colorClass = categoryColors[category] || 'bg-gray-100 text-gray-600';
  const icon = categoryIcons[category] || '🏷️';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group relative bg-base-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300 flex flex-col h-full border border-base-200/50"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0 bg-base-200">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={e => { e.target.src = 'https://placehold.co/400x300?text=PawMart'; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${colorClass} backdrop-blur-sm`}>
            {icon} {category}
          </span>
        </div>

        {/* Rating badge */}
        {rating > 0 && (
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
            ⭐ {rating}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-base mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-base-content/50 line-clamp-2 flex-1 leading-relaxed mb-4">
          {truncate(description, 90)}
        </p>

        {/* Location */}
        {location && (
          <div className="flex items-center gap-1.5 text-xs text-base-content/40 mb-4 font-medium">
            <span>📍</span>
            <span className="truncate">{location}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-base-200">
          <div>
            <p className="text-xs text-base-content/40 font-medium mb-0.5">Price</p>
            <p className="text-lg font-extrabold text-primary">
              {price === 0 ? (
                <span className="text-emerald-500">Free</span>
              ) : (
                formatCurrency(price)
              )}
            </p>
          </div>
          <Link to={'/details/' + _id}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient text-xs px-4 py-2 rounded-xl"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;