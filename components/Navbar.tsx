
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Page = 'home' | 'about' | 'services' | 'contact' | 'faq' | 'insights' | 'privacy' | 'terms';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: NavItem[] = [
  { label: 'Services', href: 'services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'About Us', href: 'about' },
  { label: 'Contact', href: 'contact' },
];

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (['about', 'services', 'contact', 'faq', 'insights', 'privacy', 'terms'].includes(href)) {
      e.preventDefault();
      onNavigate(href as Page);
      setMobileMenuOpen(false);
      return;
    }

    if (currentPage !== 'home') {
      e.preventDefault();
      onNavigate('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navBackground = isDark 
    ? 'rgba(13, 17, 23, 0.8)' 
    : 'rgba(255, 255, 255, 0.85)';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-transparent ${
        scrolled ? 'py-4 shadow-lg border-brand-border/10' : 'py-6'
      }`}
      style={{ backgroundColor: navBackground }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-brand-white rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm flex items-center justify-center group-hover:bg-brand-teal transition-colors duration-300">
            <Zap className="text-brand-navy w-5 h-5 fill-current" />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-brand-white">SPONSRBRIDGE</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm font-medium transition-colors relative group ${
                (item.href === currentPage) 
                ? 'text-brand-teal' 
                : 'text-brand-text hover:text-brand-teal'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-teal transition-all ${
                (item.href === currentPage) ? 'w-full' : 'w-0 group-hover:w-full'
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
            href="contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(121,243,222,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-brand-teal text-brand-navy font-semibold rounded transition-colors whitespace-nowrap"
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
                  className={`text-lg font-medium ${
                    (item.href === currentPage) ? 'text-brand-teal' : 'text-brand-text hover:text-brand-teal'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full text-center px-6 py-3 bg-brand-teal text-brand-navy font-bold rounded mt-4"
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
