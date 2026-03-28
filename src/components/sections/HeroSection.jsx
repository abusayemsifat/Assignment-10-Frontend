import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    image:    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
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
    image:    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
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
    image:    'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&h=600&fit=crop',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    }
  };

  const slide = slides[current];

  const titleVariants = {
    enter:  (d) => ({ x: d * 60, opacity: 0, y: 20 }),
    center: { x: 0, opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
    exit:   (d) => ({ x: d * -60, opacity: 0, y: -20, transition: { duration: 0.5 } }),
  };

  const imageVariants = {
    enter: (d) => ({ x: d * -80, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
    exit: (d) => ({ x: d * 80, opacity: 0, scale: 1.1, transition: { duration: 0.6 } }),
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-gradient-to-br ${slide.gradient} transition-all duration-1000`}
    >
      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, -200],
              opacity: [0.3, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 3D Parallax blobs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      >
        <div
          className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: slide.accent, opacity: 0.2 }}
        />
        <div
          className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: slide.accent, opacity: 0.15 }}
        />
      </motion.div>

      {/* Grid pattern with parallax */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          x: mousePosition.x * 10,
          y: mousePosition.y * 10,
        }}
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            
            {/* Left content - Text Section */}
            <div className="text-center lg:text-left w-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={titleVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* Animated badge */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs md:text-sm font-semibold mb-3 md:mb-4 lg:mb-6"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {slide.badge}
                  </motion.div>

                  {/* Tag with icon */}
                  <motion.p 
                    className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-2 md:mb-3 flex items-center justify-center lg:justify-start gap-2"
                    style={{ color: slide.accent }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-lg md:text-xl">{slide.emoji}</span>
                    {slide.tag}
                  </motion.p>

                  {/* Title */}
                  <motion.h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.2] md:leading-[1.1] mb-3 md:mb-4 lg:mb-6 whitespace-pre-line"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p 
                    className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed mb-5 md:mb-6 lg:mb-8 max-w-md mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {slide.sub}
                  </motion.p>

                  {/* CTAs */}
                  <motion.div 
                    className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link to={slide.cta.to}>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative px-5 md:px-7 lg:px-8 py-2.5 md:py-3 lg:py-4 bg-white text-gray-900 font-bold rounded-xl md:rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 text-sm md:text-base overflow-hidden"
                      >
                        <span className="relative z-10">{slide.cta.label}</span>
                        <motion.span 
                          className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <motion.span 
                          className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                          style={{ right: '1rem' }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </Link>
                    <Link to="/about">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 md:px-7 lg:px-8 py-2.5 md:py-3 lg:py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl md:rounded-2xl transition-all duration-300 text-sm md:text-base backdrop-blur-sm"
                      >
                        Learn More
                      </motion.button>
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right content - Animated Image (Desktop only) */}
            <div className="hidden lg:flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative"
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-3xl"
                    style={{ background: slide.accent, opacity: 0.3 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  {/* Main image with floating animation */}
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative"
                  >
                    <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-white/20 to-transparent p-2">
                      <div className="w-full h-full rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                        <motion.img
                          src={slide.image}
                          alt={slide.tag}
                          className="w-72 h-72 lg:w-[22rem] lg:h-[22rem] rounded-full object-cover"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                    
                    {/* Decorative rings */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/20"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>

                  {/* Floating emoji */}
                  <motion.div
                    className="absolute -top-8 -right-8 text-5xl"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {slide.emoji}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Image - Small version at bottom */}
          <div className="lg:hidden flex justify-center mt-4 md:mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current + '-mobile'}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative"
              >
                {/* Glow effect for mobile */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{ background: slide.accent, opacity: 0.3 }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Small image with floating animation */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative"
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-white/20 to-transparent p-1.5">
                    <div className="w-full h-full rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.tag}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Decorative ring for mobile */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/30"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>

                {/* Small floating emoji */}
                <motion.div
                  className="absolute -top-3 -right-3 text-xl sm:text-2xl"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {slide.emoji}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide indicators - Now below image on mobile */}
          <motion.div 
            className="flex items-center justify-center lg:justify-start gap-2 mt-6 md:mt-8 lg:mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="group relative h-1 md:h-1.5 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
                style={{ 
                  width: i === current ? '28px' : '20px', 
                  background: 'rgba(255,255,255,0.2)',
                }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;