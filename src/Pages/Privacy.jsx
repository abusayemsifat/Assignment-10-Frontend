import { motion } from 'framer-motion';

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide when creating an account such as your name, email address, and profile photo. We also collect listing data when you post a service, order data when you place or receive an order, and usage data such as pages visited and interactions to improve our service.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'Your information is used to operate and improve PawMart, communicate with you about your account and listings, process orders securely, and send optional newsletters only with your explicit consent. We do not sell your personal data to any third parties under any circumstances.',
  },
  {
    title: '3. Data Security',
    body: 'We use industry-standard security measures including bcrypt password hashing with a salt factor of 12, JWT authentication with expiry, HTTPS encryption on all connections, and secure MongoDB Atlas storage. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.',
  },
  {
    title: '4. Cookies',
    body: 'PawMart uses cookies and local storage to maintain your session, remember your preferences such as theme selection, and analyse site traffic. You can control cookie settings through your browser at any time.',
  },
  {
    title: '5. Third-Party Services',
    body: 'We use Firebase by Google for authentication services and MongoDB Atlas for data storage. Both services maintain their own privacy policies and security standards. We may also use analytics tools to understand how users interact with PawMart.',
  },
  {
    title: '6. Your Rights',
    body: 'You have the right to access, update, or delete your personal data at any time through your profile settings in the dashboard. You may also contact us directly to request a full data export or permanent account deletion.',
  },
  {
    title: '7. Children\'s Privacy',
    body: 'PawMart is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.',
  },
  {
    title: '8. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website. Your continued use of PawMart after changes constitutes acceptance of the updated policy.',
  },
  {
    title: '9. Contact Us',
    body: 'For any privacy-related questions or requests, contact us at privacy@pawmart.com or write to us at 123 Paw Street, Pet City, USA 10001. We aim to respond to all privacy requests within 48 hours.',
  },
];

const Privacy = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-4xl font-extrabold mb-3">Privacy Policy</h1>
        <p className="text-white/70 text-sm">Last updated: March 1, 2025</p>
      </motion.div>
    </div>

    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 mb-10 text-sm text-blue-700 dark:text-blue-300">
        <strong>Summary:</strong> We collect only what we need, never sell your data, and give you full control over your information. Read below for full details.
      </div>

      <div className="space-y-10">
        {sections.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <h2 className="text-xl font-bold mb-3 text-base-content">{s.title}</h2>
            <p className="text-base-content/60 leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Privacy;