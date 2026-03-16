const partners = [
  { name: 'PetSmart',    emoji: '🏪' },
  { name: 'ASPCA',       emoji: '🐕' },
  { name: 'PetFinder',   emoji: '🔍' },
  { name: 'Royal Canin', emoji: '👑' },
  { name: "Hill's Pet",  emoji: '⛰️' },
  { name: 'Banfield Vet',emoji: '🏥' },
];

const PartnersSection = () => (
  <section className="py-14 border-y border-base-200">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <p className="text-center text-sm font-semibold text-base-content/40 uppercase tracking-widest mb-8">
        Trusted by leading pet brands &amp; organisations
      </p>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
        {partners.map(p => (
          <div
            key={p.name}
            className="flex items-center gap-2 text-base-content/50 hover:text-base-content transition-colors"
          >
            <span className="text-3xl">{p.emoji}</span>
            <span className="font-bold text-lg">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;