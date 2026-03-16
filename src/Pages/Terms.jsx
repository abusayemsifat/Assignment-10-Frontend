const sections = [
  { title: '1. Acceptance of Terms',     body: 'By accessing or using PawMart, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.' },
  { title: '2. User Accounts',           body: 'You are responsible for maintaining the confidentiality of your account and password. You must be at least 18 years old to use PawMart.' },
  { title: '3. Listing Rules',           body: 'All listings must accurately represent the item or animal being offered. Fraudulent, misleading, or illegal listings are strictly prohibited.' },
  { title: '4. Animal Welfare',          body: 'Any listing that facilitates animal cruelty, illegal trade of protected species, or irresponsible breeding will be removed and the account banned.' },
  { title: '5. Prohibited Activities',   body: 'You may not use PawMart to engage in fraud, spam, harassment, or any illegal activity.' },
  { title: '6. Intellectual Property',   body: 'All content on PawMart including logos, designs, and code is protected by intellectual property laws.' },
  { title: '7. Limitation of Liability', body: 'PawMart is a marketplace platform only. Users are encouraged to verify sellers and use safe payment methods.' },
  { title: '8. Changes to Terms',        body: 'PawMart reserves the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance.' },
  { title: '9. Contact',                 body: 'Questions about these Terms? Contact us at legal@pawmart.com.' },
];

const Terms = () => (
  <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
    <h1 className="text-3xl font-extrabold mb-2">Terms of Service</h1>
    <p className="text-base-content/50 text-sm mb-8">Last updated: March 1, 2025</p>
    {sections.map(s => (
      <div key={s.title} className="mb-8">
        <h2 className="text-xl font-bold mb-2">{s.title}</h2>
        <p className="text-base-content/70 leading-relaxed">{s.body}</p>
      </div>
    ))}
  </div>
);

export default Terms;