const testimonials = [
  {
    name:   'Sarah Johnson',
    role:   'Dog Mom',
    avatar: '👩',
    text:   'Found my golden retriever Max through PawMart. The process was seamless and the seller was incredibly helpful. Max is now my best friend!',
    rating: 5,
  },
  {
    name:   'Michael Chen',
    role:   'Cat Lover',
    avatar: '👨',
    text:   'I sold three litters of kittens through PawMart and every single kitten found a wonderful home. The platform makes it so easy to connect with genuine buyers.',
    rating: 5,
  },
  {
    name:   'Emily Rodriguez',
    role:   'Pet Shop Owner',
    avatar: '👩‍💼',
    text:   'PawMart has completely transformed my small pet accessories business. My sales doubled in just three months after listing here. Highly recommended!',
    rating: 5,
  },
  {
    name:   'David Park',
    role:   'First-time Owner',
    avatar: '🧑',
    text:   'As a first-time pet owner I was nervous about adoption. PawMart guided me through the whole process and I could not be happier with my new bunny.',
    rating: 5,
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-warning text-sm">★</span>
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section className="py-16 bg-base-200">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <h2 className="section-title">What Our Community Says</h2>
      <p className="section-subtitle">
        Real stories from real pet lovers who found their match on PawMart
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="card bg-base-100 shadow-md p-6 flex flex-col gap-4 card-hover"
          >
            <Stars count={t.rating} />
            <p className="text-sm text-base-content/70 leading-relaxed flex-1">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-base-200">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-xl flex items-center justify-center">
                {t.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-base-content/50">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;