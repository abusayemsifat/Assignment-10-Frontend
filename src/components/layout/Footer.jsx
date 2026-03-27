import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => (
  <footer className="bg-gray-950 text-gray-400">
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white">🐾</span>
            </div>
            <span className="font-extrabold text-xl text-white">PawMart</span>
          </Link>
          <p className="text-sm leading-relaxed mb-6 text-gray-500">
            PawMart connects pet lovers across the country. Buy, sell, and discover pets, food, accessories, and expert care — all in one place.
          </p>
          <div className="flex gap-2">
            {[
              { label: 'Facebook',  char: 'f' },
              { label: 'Twitter',   char: 't' },
              { label: 'Instagram', char: 'in'},
            ].map(s => (
              <motion.a
                key={s.label}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={s.label}
                className="w-9 h-9 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center text-xs font-bold transition-colors duration-200"
              >
                {s.char}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="font-bold text-sm text-white uppercase tracking-widest mb-5">
            Quick Links
          </h6>
          <ul className="space-y-3 text-sm">
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
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                >
                  <span className="text-blue-500 text-xs">→</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h6 className="font-bold text-sm text-white uppercase tracking-widest mb-5">
            Categories
          </h6>
          <ul className="space-y-3 text-sm">
            {[
              ['pets',           'Pets'          ],
              ['food',           'Food & Treats' ],
              ['accessories',    'Accessories'   ],
              ['care products',  'Care Products' ],
            ].map(([val, label]) => (
              <li key={val}>
                <Link
                  to={'/explore?category=' + val}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                >
                  <span className="text-blue-500 text-xs">→</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h6 className="font-bold text-sm text-white uppercase tracking-widest mb-5">
            Contact Us
          </h6>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5">📍</span>
              <span>123 Paw Street, Pet City, USA 10001</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-400">📞</span>
              <a href="tel:+11234567890" className="hover:text-white transition-colors">
                +1 (123) 456-7890
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-400">✉️</span>
              <a href="mailto:hello@pawmart.com" className="hover:text-white transition-colors">
                hello@pawmart.com
              </a>
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-2 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms"   className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} PawMart. All rights reserved.
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-1.5">
          Made with <span className="text-red-400">❤️</span> for pet lovers everywhere
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;