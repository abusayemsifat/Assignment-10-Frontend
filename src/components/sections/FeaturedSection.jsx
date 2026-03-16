import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ServiceCard from '../ui/ServiceCard';
import { SkeletonGrid } from '../ui/SkeletonCard';

const FeaturedSection = () => {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.get('/services/featured')
      .then(r => setServices(r.data.services || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="section-title">Featured Listings</h2>
      <p className="section-subtitle">
        Handpicked pets and products from our trusted community
      </p>

      {loading ? (
        <SkeletonGrid count={8} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(s => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link to="/explore">
          <button className="btn btn-outline btn-primary btn-lg">
            View All Listings
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedSection;