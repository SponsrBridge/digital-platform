
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, CheckCircle, TrendingUp, Users, Target, FileText, Check, X, CreditCard, DollarSign } from 'lucide-react';
import BookingFlow from './BookingFlow';
import { useLenis } from './SmoothScroll';

const WaveBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.svg
        className="absolute bottom-0 left-0 w-[200%] h-64 opacity-20"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        animate={{ x: ["0%", "-50%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <path fill="var(--color-blue)" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </motion.svg>
    </div>
  );
};

// --- PIPELINE VISUAL COMPONENT ---
const PipelineVisual = () => {
  const [revenue, setRevenue] = useState(845000);
  const [activeStage, setActiveStage] = useState(0);

  // Simulated deals moving through the pipeline
  const stages = [
    { id: 'strategy', label: 'Strategy', icon: Target, color: 'text-brand-muted' },
    { id: 'outreach', label: 'Outreach', icon: Users, color: 'text-brand-blue' },
    { id: 'negotiation', label: 'Negotiation', icon: FileText, color: 'text-brand-white' },
    { id: 'closed', label: 'Closed Won', icon: CheckCircle, color: 'text-brand-teal' },
  ];

  const [deals, setDeals] = useState([
    { id: 1, name: 'TechGiant Corp', value: 45000, stage: 2 },
    { id: 2, name: 'FinServ Ltd', value: 25000, stage: 1 },
    { id: 3, name: 'CloudSystems', value: 60000, stage: 0 },
  ]);

  useEffect(() => {
    // Animation loop to simulate pipeline movement
    const interval = setInterval(() => {
      setDeals(prevDeals => {
        const newDeals = prevDeals.map(deal => {
          // If closed, reset to start to loop animation
          if (deal.stage === 3) {
            // Trigger revenue bump
            setRevenue(prev => prev + (Math.floor(Math.random() * 5) * 100));
            return { ...deal, stage: 0, id: Math.random() }; // Reset
          }
          // Move forward
          return { ...deal, stage: deal.stage + 1 };
        });
        return newDeals;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full p-6 flex flex-col">
      {/* Header / Revenue Counter */}
      <div className="flex justify-between items-end mb-8 pb-4 border-b border-brand-border/50">
        <div>
          <p className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-1">Total Pipeline Value</p>
          <div className="text-3xl font-bold text-brand-white tabular-nums flex items-center gap-2">
            <motion.span
              key={revenue}
              initial={{ opacity: 0.5, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-teal"
            >
              ${revenue.toLocaleString()}
            </motion.span>
            <TrendingUp size={16} className="text-brand-teal/50" />
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="flex items-center justify-end gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
            <p className="text-[10px] font-bold text-brand-teal uppercase">Engine Active</p>
          </div>
          <p className="text-xs text-brand-muted">Real-time Attribution</p>
        </div>
      </div>

      {/* Pipeline Lanes */}
      <div className="grid grid-cols-4 gap-2 h-full">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex flex-col h-full relative">
            {/* Lane Header */}
            <div className="flex items-center gap-2 mb-4 opacity-70">
              <stage.icon size={14} className={stage.color} />
              <span className="text-[10px] font-bold text-brand-muted uppercase hidden sm:block">{stage.label}</span>
            </div>

            {/* Lane Track */}
            <div className="flex-grow bg-brand-navy/30 rounded-lg border border-brand-border/30 relative p-2">
              {/* Deal Cards */}
              <AnimatePresence>
                {deals.filter(d => d.stage === index).map(deal => (
                  <motion.div
                    layoutId={`deal-${deal.id}`}
                    key={`${deal.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-brand-card border border-brand-border p-3 rounded-md shadow-lg mb-2 relative overflow-hidden group"
                  >
                    {/* Card Glow for Closed Won */}
                    {index === 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-brand-teal/20"
                      />
                    )}
                    <div className="flex justify-between items-start mb-1 relative z-10">
                      <div className="w-6 h-6 rounded bg-brand-navy/50 flex items-center justify-center text-[10px] font-bold text-brand-muted">
                        {deal.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-mono text-brand-teal/80 font-bold">${(deal.value / 1000).toFixed(0)}k</span>
                    </div>
                    <p className="text-[10px] font-bold text-brand-white truncate relative z-10">{deal.name}</p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Background Track Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-2 opacity-10">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-px w-full bg-brand-white/20" />)}
              </div>
            </div>

            {/* Connector Arrow */}
            {index < 3 && (
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-brand-border">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3], x: [0, 2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  <ArrowDown className="-rotate-90 w-4 h-4" />
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const lenis = useLenis();
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const phrases = ["Sponsorship Engine", "Revenue Architecture", "Commercial Blueprint"];
  const longestPhrase = "Commercial Blueprint";
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseTime = 1500;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const i = loopNum % phrases.length;
    const fullText = phrases[i];
    if (isDeleting) {
      timer = setTimeout(() => setText(prev => fullText.substring(0, prev.length - 1)), deletingSpeed);
    } else {
      timer = setTimeout(() => setText(prev => fullText.substring(0, prev.length + 1)), typingSpeed);
    }
    if (!isDeleting && text === fullText) {
      clearTimeout(timer);
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(prev => prev + 1);
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo('#how-it-works', { offset: -100 });
    } else {
      const element = document.getElementById('how-it-works');
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-navy transition-colors duration-300">
      <WaveBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center h-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="lg:col-span-3 space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6x font-bold leading-tight text-brand-white">
            <span className="block mb-1 lg:mb-0">The</span>
            <span className="relative inline-grid grid-cols-1 grid-rows-1">
              <span className="invisible row-start-1 col-start-1 h-0 lg:h-auto whitespace-nowrap">{longestPhrase}</span>
              <span className="text-brand-teal row-start-1 col-start-1 whitespace-nowrap">{text}<span className="animate-pulse font-light text-brand-teal">|</span></span>
            </span>
            <br />Behind <br className="hidden lg:block" /><span className="gradient-text">High-Performing B2B Conferences</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-text leading-relaxed max-w-2xl font-light">
            SponsrBridge operates as your embedded sponsorship team, owning strategy, sales execution, and relationships under a single commercial mandate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              onClick={() => setIsBookingModalOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(var(--accent-rgb),0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-brand-teal text-brand-navy font-bold rounded-lg text-center transition-colors duration-300"
            >
              Book a Revenue Strategy Call
            </motion.button>
            <motion.a
              href="#how-it-works"
              onClick={scrollToHowItWorks}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--accent-rgb),0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-brand-teal/50 text-brand-teal font-bold rounded-lg text-center transition-all duration-300 cursor-pointer"
            >
              See How It Works
            </motion.a>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="pt-8 border-t border-brand-border my-8 flex flex-wrap gap-4 md:gap-8 text-sm text-brand-muted">
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-teal" /><span>Embedded sponsorship teams</span></div>
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-teal" /><span>Outcome-led design</span></div>
          </motion.div>
        </motion.div>

        {/* NEW HERO VISUAL: REVENUE PIPELINE ENGINE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-2 relative h-[450px] w-full flex items-center justify-center"
        >
          <div className="relative w-full h-full bg-brand-card/50 rounded-2xl border border-brand-border shadow-2xl overflow-hidden backdrop-blur-sm group">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--blue-rgb),0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--blue-rgb),0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            {/* Ambient Glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 blur-[80px] rounded-full pointer-events-none"
            />

            {/* Pipeline Component */}
            <PipelineVisual />

            {/* Decorative Bottom Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue opacity-50"></div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsBookingModalOpen(false)} className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border border-brand-border">
              <button onClick={() => setIsBookingModalOpen(false)} className="absolute top-4 right-4 z-10 p-2 text-brand-muted hover:text-brand-white bg-brand-navy/50 rounded-full border border-brand-border"><X size={20} /></button>
              <div className="bg-brand-navy h-full overflow-y-auto">
                <BookingFlow compact />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-teal/50"><ArrowDown size={32} /></motion.div>
    </section>
  );
};

export default Hero;
