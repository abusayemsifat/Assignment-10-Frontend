import { Link } from 'react-router-dom';
import { formatCurrency, truncate } from '../../utils/helpers';
import Badge from './Badge';

const ServiceCard = ({ service }) => {
  const { _id, name, description, price, category, image, location, rating } = service;

  return (
    <div className="card bg-base-100 shadow-md overflow-hidden card-hover flex flex-col h-full">
      <figure className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          onError={e => {
            e.target.src = 'https://placehold.co/400x300?text=PawMart';
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge variant="primary" className="capitalize">{category}</Badge>
        </div>
      </figure>

      <div className="card-body flex flex-col flex-1 p-4">
        <h3 className="card-title text-base font-bold line-clamp-1">{name}</h3>
        <p className="text-sm text-base-content/60 line-clamp-2 flex-1">
          {truncate(description, 90)}
        </p>

        <div className="flex items-center gap-2 text-xs text-base-content/50 mt-2">
          {location && (
            <span>📍 {location}</span>
          )}
          {rating > 0 && (
            <span className="ml-auto">⭐ {rating}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-base-200">
          <span className="text-lg font-bold text-primary">
            {price === 0 ? 'Free' : formatCurrency(price)}
          </span>
          <Link to={`/details/${_id}`}>
            <button className="btn btn-primary btn-sm">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;