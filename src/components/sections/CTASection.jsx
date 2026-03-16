import { Link } from 'react-router-dom';
import useAuth from '../../context/useAuth';

const CTASection = () => {
  const { user } = useAuth();

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-sky-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
        <div className="text-6xl mb-4">🐶</div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          {user
            ? 'Ready to List Your Pet or Product?'
            : 'Join PawMart Today — It\'s Free!'
          }
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          {user
            ? 'Reach thousands of pet lovers in your area. Create your listing in minutes and find the perfect home for your pet.'
            : 'Connect with a community of passionate pet lovers. Adopt, sell, and discover everything your pet needs.'
          }
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {user ? (
            <Link to="/dashboard/add-service">
              <button className="btn bg-white text-primary font-bold hover:bg-white/90 border-0 btn-lg">
                + Add Listing
              </button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <button className="btn bg-white text-primary font-bold hover:bg-white/90 border-0 btn-lg">
                  Get Started Free
                </button>
              </Link>
              <Link to="/explore">
                <button className="btn btn-outline text-white border-white/60 hover:bg-white/10 btn-lg">
                  Browse Listings
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;