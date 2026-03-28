import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../context/useAuth';

const CTASection = () => {
  const { user } = useAuth();

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-sky-500/10 to-primary/5" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto relative"
      >
        <div className="bg-gradient-to-br from-primary to-sky-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden group">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
          </div>
          
          {/* Floating icons */}
          <motion.div
            className="absolute -top-10 -left-10 text-8xl opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            🐕
          </motion.div>
          <motion.div
            className="absolute -bottom-10 -right-10 text-8xl opacity-10"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            🐈
          </motion.div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-7xl mb-6 inline-block"
            >
              {user ? '🐾' : '🎉'}
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              {user
                ? 'Ready to List Your Pet or Product?'
                : 'Join PawMart Today — It\'s Free!'
              }
            </h2>
            
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              {user
                ? 'Reach thousands of pet lovers in your area. Create your listing in minutes and find the perfect home for your pet.'
                : 'Connect with a community of passionate pet lovers. Adopt, sell, and discover everything your pet needs.'
              }
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {user ? (
                <Link to="/dashboard/add-service">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-white text-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      + Add Listing
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-white text-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
                    >
                      Get Started Free →
                    </motion.button>
                  </Link>
                  <Link to="/explore">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/60 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all duration-300 text-lg"
                    >
                      Browse Listings
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;