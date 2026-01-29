
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Cpu, Briefcase, Activity, Zap, Factory, Users, Target, TrendingUp, Search, PieChart, ArrowRight, BarChart3, Newspaper } from 'lucide-react';
import { IndustryCard, ModelCard } from '../types';

// --- DATA ---
const industries: IndustryCard[] = [
  {
    name: "Technology & Software",
    sub: "SaaS, AI, Cybersecurity",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    insights: [
      { type: 'stat', label: 'Event Spend Increase', value: '+28%' },
      { type: 'news', label: 'AI Sector', value: 'Sponsors prioritizing demo-labs over booths' }
    ]
  },
  {
    name: "Finance & Professional",
    sub: "Fintech, Investment, Legal",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    insights: [
      { type: 'stat', label: 'Hedge Fund Networking', value: '82%' },
      { type: 'news', label: 'Market Shift', value: 'Focus moving to private executive dinners' }
    ]
  },
  {
    name: "Healthcare & Life Sci",
    sub: "Pharma, MedTech, Biotech",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    insights: [
      { type: 'stat', label: 'MedTech ROI', value: '4.2x' },
      { type: 'news', label: 'Compliance', value: 'Digital clinical trials lead sponsor growth' }
    ]
  },
  {
    name: "Energy & Sustainability",
    sub: "Renewables, ESG, Climate Tech",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600",
    insights: [
      { type: 'stat', label: 'Green Tech Growth', value: '15.4%' },
      { type: 'news', label: 'ESG Funding', value: 'Public-private carbon capture deals rising' }
    ]
  },
  {
    name: "Manufacturing",
    sub: "Industrial IoT, Supply Chain",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
    insights: [
      { type: 'stat', label: 'Industry 4.0 Sales', value: '$1.2B' },
      { type: 'news', label: 'Supply Chain', value: 'Resilience tech is top sponsor category' }
    ]
  },
  {
    name: "HR & Workplace",
    sub: "Talent, Employee Experience",
    icon: Users,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600",
    insights: [
      { type: 'stat', label: 'Retraction Rate', value: '-12%' },
      { type: 'news', label: 'Remote Work', value: 'Talent platforms tripling event presence' }
    ]
  },
];

const models: ModelCard[] = [
  { title: "Full-Service Management", description: "End-to-end ownership of strategy, sales, and partner management.", bestFor: "Organisers seeking a fully outsourced team." },
  { title: "Sales Execution Partnership", description: "Dedicated sales execution for organisers with defined strategy.", bestFor: "Organisers needing experienced execution." },
  { title: "Strategic Commercial Advisory", description: "Senior-level sponsorship guidance without execution.", bestFor: "In-house teams needing strategic direction." },
];

// --- VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// --- COMPONENTS ---

const ModelVisual = ({ index }: { index: number }) => {
  switch (index) {
    case 0: // Full-Service
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-24 h-24 border border-dashed border-brand-blue/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-32 h-32 border border-dashed border-brand-border rounded-full"
          />

          <div className="relative z-10 bg-brand-navy border border-brand-teal p-3 rounded-xl shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)]">
            <Briefcase className="text-brand-teal w-6 h-6" />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-24 h-24"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-brand-card border border-brand-teal/50 rounded-full flex items-center justify-center shadow-lg">
              <Users size={12} className="text-brand-white" />
            </div>
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 0 }}
            className="absolute w-24 h-24 rotate-120"
          >
            <div className="absolute -bottom-2 right-1 w-6 h-6 bg-brand-card border border-brand-blue rounded-full flex items-center justify-center shadow-lg">
              <PieChart size={12} className="text-brand-blue" />
            </div>
          </motion.div>
        </div>
      );
    case 1: // Sales Execution
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center px-8">
          <div className="w-full flex justify-between items-center mb-3">
            <div className="h-1 flex-1 bg-brand-border rounded-full overflow-hidden mr-3 relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-teal to-transparent w-1/2"
              />
            </div>
            <Target className="text-brand-teal w-5 h-5 flex-shrink-0" />
          </div>

          <div className="flex gap-2 w-full justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3, y: 0 }}
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                className={`w-8 h-10 rounded border ${i === 2 ? 'border-brand-teal bg-brand-teal/10' : 'border-brand-border bg-brand-navy/50'} flex items-center justify-center`}
              >
                {i === 2 ? <span className="text-xs font-bold text-brand-teal">$</span> : <div className="w-4 h-0.5 bg-brand-muted"></div>}
              </motion.div>
            ))}
          </div>
        </div>
      );
    case 2: // Strategic Advisory
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-32 h-24 flex items-end justify-center gap-1.5 pb-2">
            <motion.div
              animate={{ height: ["40%", "60%", "40%"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-4 bg-brand-border rounded-t-sm"
            />
            <motion.div
              animate={{ height: ["70%", "50%", "70%"] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="w-4 bg-brand-navy/50 rounded-t-sm"
            />
            <motion.div
              animate={{ height: ["50%", "80%", "50%"] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="w-4 bg-brand-blue/40 rounded-t-sm"
            />
            <motion.div
              initial={{ height: "30%" }}
              animate={{ height: "90%" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="w-4 bg-brand-teal rounded-t-sm relative group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-card border border-brand-teal px-1.5 py-0.5 rounded text-[10px] text-brand-teal font-bold shadow-lg"
              >
                +45%
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 20, opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-0 text-brand-teal/50"
            >
              <Search size={24} />
            </motion.div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

// Fixed IndustryCardItem to use React.FC so that the 'key' prop is correctly handled in mapping
const IndustryCardItem: React.FC<{ ind: IndustryCard }> = ({ ind }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col cursor-pointer overflow-hidden rounded-xl border border-brand-border/30 h-80"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60"
          style={{ backgroundImage: `url(${ind.image})` }}
        />
        <div className="absolute inset-0 bg-brand-navy/80 group-hover:bg-brand-navy/60 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center transition-colors group-hover:bg-brand-teal group-hover:text-brand-navy">
              <ind.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-white group-hover:text-brand-teal transition-colors">{ind.name}</h3>
          </div>
          <p className="text-sm text-brand-muted pl-13 border-l-2 border-brand-teal ml-5 mt-1">{ind.sub}</p>
        </div>

        {/* Dynamic Insights Section */}
        <div className="mt-auto pt-4">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-card/40 backdrop-blur-md border border-brand-teal/20 rounded-lg p-3 space-y-3 shadow-xl"
              >
                <p className="text-[10px] uppercase tracking-widest text-brand-teal font-bold mb-2 flex items-center gap-2">
                  <TrendingUp size={10} /> Market Intelligence
                </p>
                {ind.insights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2 group/insight">
                    <div className="mt-1 text-brand-teal">
                      {insight.type === 'stat' ? <BarChart3 size={12} /> : <Newspaper size={12} />}
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-muted font-medium leading-none">{insight.label}</p>
                      <p className="text-xs text-brand-white font-semibold mt-1 leading-tight">{insight.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xs text-brand-teal/60 font-medium"
            >
              Hover to reveal insights <ArrowRight size={12} className="animate-pulse" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const IndustriesSection: React.FC = () => (
  <section id="industries" className="py-24 bg-brand-navy transition-colors duration-300">
    <div className="container mx-auto px-4 sm:px-6 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-4">Sector-Specific Commercial Expertise</h2>
        <p className="text-brand-muted max-w-2xl">We partner with B2B conference organisers across complex, sponsor-driven industries, providing the market intelligence needed to win.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {industries.map((ind, i) => (
          <IndustryCardItem key={i} ind={ind} />
        ))}
      </motion.div>
    </div>
  </section>
);

const ModelCardItem: React.FC<{ model: ModelCard, index: number }> = ({ model, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect: Shift gradient vertically as user scrolls
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="bg-brand-card rounded-xl p-1 relative group overflow-hidden shadow-lg h-full"
    >
      {/* Gradient Background with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute -inset-[20%] bg-gradient-to-br from-brand-blue to-brand-teal opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-md"
      />

      <div className="bg-brand-card relative h-full rounded-lg p-8 flex flex-col z-10">
        <div className="mb-6 h-40 w-full bg-brand-section rounded-lg border border-brand-border flex items-center justify-center overflow-hidden group-hover:border-brand-teal/30 transition-colors relative">
          <ModelVisual index={index} />
        </div>

        <h3 className="text-xl font-bold text-brand-white mb-4">{model.title}</h3>
        <p className="text-brand-muted mb-6 flex-grow">{model.description}</p>
        <div className="mt-auto pt-6 border-t border-brand-border">
          <p className="text-xs uppercase tracking-wider text-brand-teal font-semibold mb-2">Best For:</p>
          <p className="text-sm text-brand-text">{model.bestFor}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const ModelsSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-brand-section transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-brand-white mb-12 text-center"
        >
          Flexible Models Designed Around Outcomes
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {models.map((model, i) => (
            <ModelCardItem key={i} model={model} index={i} />
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <a
            href="/services"
            onClick={(e) => { e.preventDefault(); navigate('/services'); }}
            className="inline-flex items-center px-8 py-4 border border-brand-teal text-brand-teal font-bold rounded-lg hover:bg-brand-teal/10 transition-colors duration-300 group"
          >
            Learn More
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
