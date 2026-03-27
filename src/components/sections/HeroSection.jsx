import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const slides = [
  {
    gradient: 'from-[#0f172a] via-[#1e3a8a] to-[#1d4ed8]',
    accent:   '#60a5fa',
    tag:      'Find Your Perfect Companion',
    title:    'Adopt a Pet,\nGain a Best Friend',
    sub:      'Browse hundreds of pets available for loving homes. Dogs, cats, birds and more — your new family member is waiting.',
    cta:      { label: 'Explore Pets', to: '/explore?category=pets' },
    emoji:    '🐕',
    badge:    '12,000+ pets rehomed',
  },
  {
    gradient: 'from-[#0f172a] via-[#1e3a5a] to-[#0369a1]',
    accent:   '#38bdf8',
    tag:      'Premium Pet Products',
    title:    'Everything Your\nPet Deserves',
    sub:      'Shop quality food, accessories and care products curated by veterinary experts for your pet\'s health.',
    cta:      { label: 'Shop Products', to: '/explore?category=food' },
    emoji:    '🛍️',
    badge:    '850+ quality products',
  },
  {
    gradient: 'from-[#0f172a] via-[#064e3b] to-[#065f46]',
    accent:   '#34d399',
    tag:      'Expert Vet Care',
    title:    'Professional Care\nat Your Doorstep',
    sub:      'Connect with certified veterinarians and pet care specialists. Book appointments and get expert advice.',
    cta:      { label: 'Find Care', to: '/explore?category=care+products' },
    emoji:    '🏥',
    badge:    '200+ verified vets',
  },
];

const stats = [
  { value: '12K+',  label: 'Pets Rehomed'   },
  { value: '850+',  label: 'Active Listings' },
  { value: '3.2K+', label: 'Happy Owners'   },
  { value: '4.9★',  label: 'App Rating'     },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const titleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // GSAP entrance for stats
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const slide = slides[current];

  const titleVariants = {
    enter:  (d) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
    exit:   (d) => ({ x: d * -60, opacity: 0, transition: { duration: 0.4 } }),
  };

  return (
    <section className={`relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br ${slide.gradient} transition-all duration-1000`}>

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          key={current + '-blob1'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: slide.accent }}
        />
        <motion.div
          key={current + '-blob2'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: slide.accent }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={titleVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  {slide.badge}
                </div>

                {/* Tag */}
                <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: slide.accent }}>
                  {slide.tag}
                </p>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 whitespace-pre-line">
                  {slide.title}
                </h1>

                {/* Sub */}
                <p className="text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-md">
                  {slide.sub}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Link to={slide.cta.to}>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-7 py-3.5 bg-white text-gray-900 font-bold rounded-xl shadow-2xl hover:shadow-white/20 transition-all text-sm"
                    >
                      {slide.cta.label} →
                    </motion.button>
                  </Link>
                  <Link to="/about">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all text-sm backdrop-blur-sm"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="flex items-center gap-3 mt-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: i === current ? '32px' : '8px', background: 'rgba(255,255,255,0.3)' }}
                >
                  {i === current && (
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ background: slide.accent }}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right — stats grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/12 transition-colors"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">{s.value}</p>
                <p className="text-sm text-white/50 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-base-100 to-transparent" />
    </section>
  );
};

export default HeroSection;