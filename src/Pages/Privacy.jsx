const sections = [
  { title: '1. Information We Collect',    body: 'We collect information you provide when creating an account (name, email, profile photo), listing a service, or contacting us. We also collect usage data such as pages visited to improve our service.' },
  { title: '2. How We Use Your Information',body: 'Your information is used to operate PawMart, communicate with you, process orders, and send optional newsletters only with your consent. We do not sell your personal data to third parties.' },
  { title: '3. Data Security',              body: 'We use industry-standard security measures including bcrypt password hashing, JWT authentication, and HTTPS encryption to protect your data.' },
  { title: '4. Cookies',                   body: 'PawMart uses cookies to maintain your session, remember your preferences such as theme, and analyse site traffic. You can control cookie settings through your browser.' },
  { title: '5. Third-Party Services',       body: 'We use Firebase for authentication and MongoDB for data storage. Both services have their own privacy policies.' },
  { title: '6. Your Rights',               body: 'You have the right to access, update, or delete your personal data at any time through your profile settings. You may also contact us to request data deletion or export.' },
  { title: '7. Contact Us',                body: 'For any privacy-related questions, contact us at privacy@pawmart.com or write to us at 123 Paw Street, Pet City, USA 10001.' },
];

const Privacy = () => (
  <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
    <h1 className="text-3xl font-extrabold mb-2">Privacy Policy</h1>
    <p className="text-base-content/50 text-sm mb-8">Last updated: March 1, 2025</p>
    {sections.map(s => (
      <div key={s.title} className="mb-8">
        <h2 className="text-xl font-bold mb-2">{s.title}</h2>
        <p className="text-base-content/70 leading-relaxed">{s.body}</p>
      </div>
    ))}
  </div>
);

export default Privacy;