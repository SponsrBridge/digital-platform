
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { useLenis } from './SmoothScroll';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  };

  const scrollToHash = (hash: string) => {
    if (lenis) {
      lenis.scrollTo(hash, { offset: -80 });
    } else {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith('#')) {
      // Anchor link — scroll on home page
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToHash(href), 100);
      } else {
        scrollToHash(href);
      }
    } else {
      // Page link
      navigate(href);
    }
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false;
    return location.pathname === href;
  };

  const navBackground = 'rgba(var(--navy-rgb), 0.85)';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-transparent ${scrolled ? 'py-4 shadow-lg border-brand-border/10' : 'py-6'
        }`}
      style={{ backgroundColor: navBackground }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          className="flex items-center gap-2 group"
        >
          <Logo variant="full" size="md" isLightMode={!isDark} />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm font-medium transition-colors relative group ${isActive(item.href)
                ? 'text-brand-teal'
                : 'text-brand-text hover:text-brand-teal'
                }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-teal transition-all ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </a>
          ))}

          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-brand-card text-brand-text hover:text-brand-teal transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <motion.a
            href="/contact"
            onClick={(e) => handleNavClick(e, '/contact')}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(var(--accent-rgb),0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-brand-teal text-brand-navy font-bold rounded-lg transition-colors whitespace-nowrap"
          >
            Book a Call
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-brand-white"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            className="text-brand-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-brand-navy border-t border-brand-border flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col space-y-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-lg font-medium ${isActive(item.href) ? 'text-brand-teal' : 'text-brand-text hover:text-brand-teal'
                    }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className="w-full text-center px-6 py-3 bg-brand-teal text-brand-navy font-bold rounded-lg mt-4"
              >
                Book a Call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
