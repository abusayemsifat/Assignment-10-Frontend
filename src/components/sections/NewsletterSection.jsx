import { useState } from 'react';
import toast from 'react-hot-toast';

const NewsletterSection = () => {
  const [email,   setEmail]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      toast.success('You are subscribed! Welcome to the PawMart family.');
      setEmail('');
      setLoading(false);
    }, 800);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-sky-700 text-white">
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
        <div className="text-5xl mb-4">📬</div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Stay in the Loop
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          Get weekly pet care tips, new listing alerts, and exclusive deals
          delivered straight to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-5 py-3 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-white text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn bg-white text-primary font-bold hover:bg-white/90 border-0 px-8 rounded-xl"
          >
            {loading
              ? <span className="loading loading-spinner loading-sm" />
              : 'Subscribe'
            }
          </button>
        </form>
        <p className="text-white/50 text-xs mt-4">
          No spam. Unsubscribe anytime. 🐾
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;