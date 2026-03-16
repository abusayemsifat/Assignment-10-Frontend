import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    bg:    'from-sky-900 to-blue-800',
    tag:   'Find Your Perfect Companion',
    title: 'Adopt a Pet, Gain a Best Friend',
    sub:   'Browse hundreds of pets available for loving homes. Dogs, cats, birds and more — your new family member is waiting.',
    cta:   { label: 'Explore Pets', to: '/explore?category=pets' },
    emoji: '🐕',
  },
  {
    bg:    'from-orange-700 to-amber-600',
    tag:   'Premium Pet Products',
    title: 'Everything Your Pet Deserves',
    sub:   'Shop quality food, accessories and care products curated by veterinary experts for your pet\'s health and happiness.',
    cta:   { label: 'Shop Now', to: '/explore?category=food' },
    emoji: '🛍️',
  },
  {
    bg:    'from-emerald-800 to-teal-700',
    tag:   'Expert Vet Care',
    title: 'Professional Pet Care at Your Doorstep',
    sub:   'Connect with certified veterinarians and pet care specialists. Book appointments and get expert advice online.',
    cta:   { label: 'Find Care', to: '/explore?category=care+products' },
    emoji: '🏥',
  },
];

const stats = [
  { value: '12,000+', label: 'Happy Pets'      },
  { value: '850+',    label: 'Active Listings' },
  { value: '3,200+',  label: 'Happy Owners'    },
  { value: '4.9★',    label: 'Average Rating'  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section
      className={`relative min-h-[65vh] flex flex-col justify-center bg-gradient-to-br ${slide.bg} text-white overflow-hidden transition-all duration-700`}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-9xl select-none">{slide.emoji}</div>
        <div className="absolute bottom-10 right-10 text-8xl select-none">{slide.emoji}</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {slide.tag}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            {slide.title}
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
            {slide.sub}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={slide.cta.to}>
              <button className="btn bg-white text-gray-900 font-bold btn-lg hover:bg-white/90 border-0 shadow-lg">
                {slide.cta.label}
              </button>
            </Link>
            <Link to="/about">
              <button className="btn btn-outline btn-lg text-white border-white/60 hover:bg-white/10">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map(s => (
            <div
              key={s.label}
              className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-center"
            >
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-sm text-white/70 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;