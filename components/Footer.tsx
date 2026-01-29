
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Linkedin, Twitter } from 'lucide-react';
import Logo from './Logo';
import { useLenis } from './SmoothScroll';

const Footer: React.FC = () => {
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToHash = (hash: string) => {
    if (lenis) {
      lenis.scrollTo(`#${hash}`, { offset: -80 });
    } else {
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.includes('#')) {
      const parts = href.split('#');
      const page = parts[0];
      const hash = parts[1];

      if (page) {
        // e.g. "about#our-difference" -> navigate to /about then scroll
        navigate(`/${page}`);
        setTimeout(() => scrollToHash(hash), 300);
      } else {
        // e.g. "#industries" -> home page anchor
        if (location.pathname !== '/') {
          navigate('/');
          setTimeout(() => scrollToHash(hash), 100);
        } else {
          scrollToHash(hash);
        }
      }
    } else {
      // Plain page link
      navigate(`/${href}`);
    }
  };

  return (
    <footer className="bg-brand-section pt-20 pb-8 border-t border-brand-border transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Branding */}
          <div className="lg:col-span-1">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center gap-2 mb-6">
              <Logo variant="full" size="md" />
            </a>
            <p className="text-brand-muted text-sm mb-6">
              The sponsorship engine behind high-performing B2B conferences.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-brand-muted hover:text-brand-teal transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-brand-muted hover:text-brand-teal transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-brand-white font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><a href="/about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-brand-teal transition-colors">About Us</a></li>
              <li><a href="/about#our-difference" onClick={(e) => handleLinkClick(e, 'about#our-difference')} className="hover:text-brand-teal transition-colors">The SponsrBridge Way</a></li>
              <li><a href="/contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-brand-teal transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-white font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><a href="/services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-brand-teal transition-colors text-nowrap">Full-Service Management</a></li>
              <li><a href="/services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-brand-teal transition-colors text-nowrap">Sales Execution Partnership</a></li>
              <li><a href="/services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-brand-teal transition-colors text-nowrap">Strategic Commercial Advisory</a></li>
              <li><a href="/#industries" onClick={(e) => handleLinkClick(e, '#industries')} className="hover:text-brand-teal transition-colors">Industries</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-white font-bold mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><a href="/insights" onClick={(e) => handleLinkClick(e, 'insights')} className="hover:text-brand-teal transition-colors">Blog & Insights</a></li>
              <li><a href="/faq" onClick={(e) => handleLinkClick(e, 'faq')} className="hover:text-brand-teal transition-colors">FAQ</a></li>
              <li><a href="/privacy" onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-brand-text transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-brand-text transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-brand-white font-bold mb-6">Stay Updated</h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-brand-navy border border-brand-border rounded px-4 py-2 text-sm text-brand-white focus:border-brand-teal focus:outline-none placeholder-brand-muted"
              />
              <button className="w-full bg-brand-teal text-brand-navy font-bold text-sm py-2 rounded-lg hover:bg-brand-accent-hover transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-muted">
          <p>&copy; 2025 SponsrBridge LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-brand-text">Privacy</a>
            <a href="/privacy" onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-brand-text">Cookies</a>
            <a href="/terms" onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-brand-text">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
