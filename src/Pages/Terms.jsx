import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using PawMart, you confirm that you are at least 18 years old and agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of these terms, you may not access the service.',
  },
  {
    title: '2. User Accounts',
    body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use. We reserve the right to suspend accounts that violate these terms.',
  },
  {
    title: '3. Listing Rules',
    body: 'All listings must accurately represent the item or animal being sold or offered for adoption. You must have the legal right to sell or rehome the animal or product. Fraudulent, misleading, or illegal listings are strictly prohibited and will result in immediate account termination and potential legal action.',
  },
  {
    title: '4. Animal Welfare',
    body: 'PawMart is deeply committed to animal welfare. Any listing that facilitates animal cruelty, the illegal trade of protected or exotic species, puppy mills, or irresponsible breeding practices will be immediately removed. Violating accounts will be permanently banned and reported to relevant authorities.',
  },
  {
    title: '5. Prohibited Activities',
    body: 'You may not use PawMart to engage in fraud, spam, harassment, impersonation, or any illegal activity. You may not attempt to reverse engineer, scrape data from, or disrupt the platform. You may not use automated bots or scripts to interact with the platform.',
  },
  {
    title: '6. Transactions',
    body: 'PawMart is a marketplace platform only. We do not process payments between users directly. Transactions occur directly between buyers and sellers. We strongly recommend using secure, traceable payment methods and meeting in safe public locations for in-person exchanges.',
  },
  {
    title: '7. Intellectual Property',
    body: 'All content on PawMart including logos, designs, code, and written content is protected by intellectual property laws. Users retain ownership of their uploaded content but grant PawMart a worldwide, non-exclusive license to display, distribute, and promote that content on the platform.',
  },
  {
    title: '8. Limitation of Liability',
    body: 'PawMart provides a platform for users to connect and transact. We are not responsible for the quality, safety, or legality of items listed, or the truth or accuracy of listings. We are not liable for any damages arising from transactions between users.',
  },
  {
    title: '9. Termination',
    body: 'We reserve the right to terminate or suspend your account at any time without notice if we believe you have violated these terms. Upon termination, your right to use the platform ceases immediately.',
  },
  {
    title: '10. Changes to Terms',
    body: 'PawMart reserves the right to modify these terms at any time. We will provide notice of significant changes. Continued use of the platform after changes constitutes your acceptance of the updated terms.',
  },
  {
    title: '11. Governing Law',
    body: 'These Terms shall be governed by and construed in accordance with the laws of the United States. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Pet City, USA.',
  },
  {
    title: '12. Contact',
    body: 'Questions about these Terms? Contact us at legal@pawmart.com or write to 123 Paw Street, Pet City, USA 10001.',
  },
];

const Terms = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-5xl mb-4">📋</div>
        <h1 className="text-4xl font-extrabold mb-3">Terms of Service</h1>
        <p className="text-white/70 text-sm">Last updated: March 1, 2025</p>
      </motion.div>
    </div>

    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-10 text-sm text-amber-700 dark:text-amber-300">
        <strong>Please read carefully.</strong> By using PawMart you agree to these terms. If you do not agree, please do not use the platform.
      </div>

      <div className="space-y-10">
        {sections.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <h2 className="text-xl font-bold mb-3 text-base-content">{s.title}</h2>
            <p className="text-base-content/60 leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 p-6 bg-base-200 rounded-2xl text-center">
        <p className="text-sm text-base-content/60 mb-4">
          Have questions about our terms?
        </p>
        <Link to="/contact">
          <button className="btn btn-primary btn-sm">Contact Us</button>
        </Link>
      </div>
    </div>
  </div>
);

export default Terms;