const steps = [
  {
    num:  '01',
    icon: '🔍',
    title: 'Browse Listings',
    desc: 'Search and filter thousands of pet listings, products, and services from verified sellers and shelters.',
  },
  {
    num:  '02',
    icon: '❤️',
    title: 'Choose Your Match',
    desc: 'View detailed profiles with photos, descriptions, and seller information to find your perfect match.',
  },
  {
    num:  '03',
    icon: '📞',
    title: 'Connect & Order',
    desc: 'Message sellers directly, ask questions, and place secure orders through our platform.',
  },
  {
    num:  '04',
    icon: '🐾',
    title: 'Happy Reunited',
    desc: 'Bring your new pet home or receive your products with confidence, backed by our community guarantee.',
  },
];

const HowItWorks = () => (
  <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
    <h2 className="section-title">How PawMart Works</h2>
    <p className="section-subtitle">
      Getting started is simple — find, connect, and love your pet
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((s, i) => (
        <div key={i} className="text-center group">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary text-3xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
            {s.icon}
          </div>
          <span className="text-xs font-bold text-primary/60 tracking-widest">
            {s.num}
          </span>
          <h3 className="font-bold text-lg mt-1 mb-2">{s.title}</h3>
          <p className="text-sm text-base-content/60 leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;