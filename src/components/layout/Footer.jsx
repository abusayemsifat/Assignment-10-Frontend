import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-base-200 text-base-content pt-12 pb-6">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

        <div>
          <Link
            to="/"
            className="text-2xl font-extrabold text-primary flex items-center gap-2"
          >
            🐾 PawMart
          </Link>
          <p className="text-sm text-base-content/60 mt-3 leading-relaxed">
            PawMart connects pet lovers across the country. Buy, sell, and
            discover pets, food, accessories, and expert care — all in one place.
          </p>
        </div>

        <div>
          <h6 className="font-bold text-sm uppercase tracking-widest mb-4">
            Quick Links
          </h6>
          <ul className="space-y-2 text-sm">
            {[
              ['/',        'Home'   ],
              ['/explore', 'Explore'],
              ['/about',   'About'  ],
              ['/blog',    'Blog'   ],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-base-content/60 hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="font-bold text-sm uppercase tracking-widest mb-4">
            Categories
          </h6>
          <ul className="space-y-2 text-sm">
            {['Pets', 'Food & Treats', 'Accessories', 'Care Products'].map(c => (
              <li key={c}>
                <Link
                  to={`/explore?category=${c.toLowerCase()}`}
                  className="text-base-content/60 hover:text-primary transition-colors"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="font-bold text-sm uppercase tracking-widest mb-4">
            Contact Us
          </h6>
          <ul className="space-y-3 text-sm text-base-content/60">
            <li>📍 123 Paw Street, Pet City, USA</li>
            <li>
              📞{' '}
              <a href="tel:+11234567890" className="hover:text-primary">
                +1 (123) 456-7890
              </a>
            </li>
            <li>
              ✉️{' '}
              <a href="mailto:hello@pawmart.com" className="hover:text-primary">
                hello@pawmart.com
              </a>
            </li>
          </ul>
          <div className="mt-4 space-y-2 text-sm">
            <Link
              to="/privacy"
              className="block text-base-content/60 hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="block text-base-content/60 hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 pt-6 text-center text-sm text-base-content/50">
        © {new Date().getFullYear()} PawMart. All rights reserved. Made with 🐾
      </div>
    </div>
  </footer>
);

export default Footer;