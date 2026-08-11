import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-brand-navy text-slate-300 border-t border-white/10">
      {/* Top CTA Banner */}
      <div className="border-b border-white/10 py-10 bg-brand-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">Ready to Secure Your Premium Plot?</h3>
            <p className="text-sm text-slate-400 mt-1">Get in touch with our investment officers today for customized downpayment plans.</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/contact" className="px-6 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-navy font-bold text-xs uppercase tracking-wider rounded-lg transition">
              Call Representative
            </Link>
            <Link to="/projects" className="px-6 py-3 gold-gradient hover:gold-gradient-hover text-brand-navy font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition">
              Explore Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="gold-gradient p-2 rounded-lg text-white font-bold">FT</span>
              <span className="text-xl font-bold tracking-tight text-white">
                FAISAL <span className="text-brand-gold font-normal">TOWN</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Faisal Town Group is a premier corporate developer creating state-of-the-art residential societies and commercial landmarks. We focus on transparent practices, quality development, and delivering outstanding returns.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-brand-gold hover:text-brand-navy rounded-lg text-slate-400 transition" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-brand-gold hover:text-brand-navy rounded-lg text-slate-400 transition" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-brand-gold hover:text-brand-navy rounded-lg text-slate-400 transition" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-brand-gold hover:text-brand-navy rounded-lg text-slate-400 transition" aria-label="Linkedin">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-8 after:bg-brand-gold pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-gold hover:translate-x-1 inline-block transition">
                  Corporate Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-gold hover:translate-x-1 inline-block transition">
                  Societies & Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-gold hover:translate-x-1 inline-block transition">
                  Contact & Locations
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand-gold hover:translate-x-1 inline-block transition">
                  Agent/Customer Login
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-gold hover:translate-x-1 inline-block transition">
                  Online Member Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-8 after:bg-brand-gold pb-2">
              Corporate Office
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">
                  Faisal Tower, Main G.T. Road, Sector A, Faisal Town, Islamabad, Pakistan.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-slate-400">+92 (51) 111-555-666</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-slate-400">info@faisaltowngroup.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-8 after:bg-brand-gold pb-2">
              Newsletter
            </h4>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Subscribe to receive development progress reports, master plan updates, and new launch rates.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold transition"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-brand-gold hover:bg-brand-gold-light text-brand-navy rounded-md transition flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-brand-gold mt-2 animate-pulse">Thank you for subscribing!</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-brand-navy-dark border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Faisal Town Group. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
