import { useState } from 'react';

const faqs = [
  {
    q: 'How do I list my pet or product on PawMart?',
    a: 'After signing up and logging in, go to your dashboard and click Add Service. Fill in all the details including photos, pricing, and location. Your listing will be visible immediately.',
  },
  {
    q: 'Is PawMart free to use?',
    a: 'Browsing and adopting pets is completely free. Sellers can list pets for free as well. Premium products and accessories have standard pricing set by the seller.',
  },
  {
    q: 'How do I ensure I am buying from a trusted seller?',
    a: 'All sellers on PawMart are verified through our registration process. You can also check seller ratings, read reviews, and communicate directly before committing.',
  },
  {
    q: 'Can I return a pet if things do not work out?',
    a: 'We strongly encourage all parties to have adoption agreements. If you face challenges, please reach out to the seller directly. Our support team can also mediate if needed.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'Payments are handled directly between buyers and sellers. We recommend safe payment methods and provide guidance on secure transactions in our help center.',
  },
  {
    q: 'How can I report a suspicious listing?',
    a: 'Every listing has a Report option. You can also contact our support team at hello@pawmart.com. We take all reports seriously and investigate promptly.',
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <h2 className="section-title">Frequently Asked Questions</h2>
      <p className="section-subtitle">
        Everything you need to know about PawMart
      </p>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="card bg-base-100 shadow-sm overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-sm hover:bg-base-200 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{f.q}</span>
              <span
                className={`text-primary transition-transform duration-200 ml-4 flex-shrink-0 ${
                  open === i ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-sm text-base-content/70 leading-relaxed border-t border-base-200 pt-3">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;