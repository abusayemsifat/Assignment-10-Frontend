import { Link } from 'react-router-dom';

const team = [
  { name: 'James Herriot',  role: 'Founder & CEO',      emoji: '👨‍💼', bio: 'Lifelong animal lover with 15 years in the pet industry.' },
  { name: 'Mary Brancker',  role: 'Head of Operations',  emoji: '👩‍💼', bio: 'Former shelter director, passionate about rehoming.' },
  { name: 'Brian Sinclair', role: 'Lead Veterinarian',   emoji: '👨‍⚕️', bio: 'DVM with specialization in small animal medicine.' },
  { name: 'Alex Thompson',  role: 'Product Lead',        emoji: '🧑‍💻', bio: 'Tech entrepreneur building impactful marketplaces.' },
];

const values = [
  { icon: '❤️', title: 'Animal Welfare First', desc: 'Every decision we make puts the wellbeing of animals at the forefront.' },
  { icon: '🤝', title: 'Trusted Community',    desc: 'We verify sellers and build trust through transparent reviews.' },
  { icon: '🌱', title: 'Responsible Ownership',desc: 'We promote responsible ownership and adoption over impulse buying.' },
  { icon: '🔒', title: 'Safe Transactions',    desc: 'Your security matters — we protect every interaction on our platform.' },
];

const About = () => (
  <div>
    <div className="bg-gradient-to-r from-primary to-sky-700 text-white py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About PawMart</h1>
      <p className="text-white/80 text-lg max-w-2xl mx-auto">
        We are on a mission to connect every pet with a loving home — and every
        pet owner with the products and care they need.
      </p>
    </div>

    <section className="max-w-5xl mx-auto px-4 md:px-8 py-16 text-center">
      <h2 className="section-title">Our Story</h2>
      <p className="text-base-content/70 leading-relaxed text-lg max-w-3xl mx-auto">
        PawMart was founded in 2020 when our founder James Herriot noticed how
        difficult it was for local shelters to connect animals with caring
        families. What started as a simple listing board grew into a full
        marketplace serving thousands of pet lovers across the country. Today,
        we are proud to have helped over 12,000 pets find their forever homes.
      </p>
    </section>

    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="section-title">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {values.map(v => (
            <div key={v.title} className="card bg-base-100 shadow-sm p-6 text-center card-hover">
              <div className="text-5xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-base-content/60 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <h2 className="section-title">Meet the Team</h2>
      <p className="section-subtitle">
        Passionate people building a better world for pets
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map(m => (
          <div key={m.name} className="card bg-base-100 shadow-md p-6 text-center card-hover">
            <div className="text-6xl mb-4">{m.emoji}</div>
            <h3 className="font-bold text-lg">{m.name}</h3>
            <p className="text-primary text-sm font-medium mb-2">{m.role}</p>
            <p className="text-xs text-base-content/60">{m.bio}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-base-200 py-14 text-center px-4">
      <h2 className="text-3xl font-extrabold mb-3">Ready to join PawMart?</h2>
      <p className="text-base-content/60 mb-6">
        Start browsing pets and products, or list your own today.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link to="/explore">
          <button className="btn btn-primary btn-lg">Explore Listings</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-outline btn-lg">Create Account</button>
        </Link>
      </div>
    </section>
  </div>
);

export default About;