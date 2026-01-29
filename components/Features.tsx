
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate, AnimatePresence, Variants } from 'framer-motion';
import { AlertTriangle, TrendingUp, Clock, Ban, Compass, Package, Target, Handshake, Repeat, PieChart, Globe, BookOpen, BarChart, Layers, Filter, Users, ArrowDown, RefreshCw, GitMerge } from 'lucide-react';
import { StatItem, ServiceCard, StepItem } from '../types';

// --- DATA ---
const stats: StatItem[] = [
  { value: "67", label: "Organisers cite sponsorship sales as primary challenge", suffix: "%" },
  { value: "40", label: "Value typically captured without structured sales", suffix: "%" },
  { value: "3-6", label: "Average sponsorship sales cycle", suffix: " Months" },
  { value: "75-150", label: "Revenue commonly left unrealised", prefix: "$", suffix: "K+" },
];

const capabilities: ServiceCard[] = [
  { icon: Compass, title: "Sponsorship Strategy", description: "Audience analysis, competitive positioning, and pricing benchmarks." },
  { icon: Package, title: "Package Engineering", description: "Outcome-led, modular programmes designed to align with sponsor objectives." },
  { icon: Target, title: "Sponsor Pipeline", description: "30-50 high-potential sponsors qualified using commercial intelligence." },
  { icon: Handshake, title: "Sales Execution", description: "Full lifecycle management from outreach to contract closure." },
  { icon: Repeat, title: "Renewal Management", description: "Delivery coordination and post-event reporting to secure future revenue." },
  { icon: PieChart, title: "Reporting", description: "Structured pipeline activity, forecasts, and clear accountability." },
];

const processSteps: StepItem[] = [
  {
    id: 1,
    title: "Commercial Strategy",
    purpose: "Define value & monetization logic",
    items: ["Audience composition & buying power", "Historical performance analysis", "Competitive positioning"],
    deliverable: "Strategic Revenue Blueprint"
  },
  {
    id: 2,
    title: "Package Engineering",
    purpose: "Translate demand into sellable programmes",
    items: ["Outcome-led design (not generic tiers)", "Sales-flexible structure", "Defensible differentiation"],
    deliverable: "Sponsorship Portfolio"
  },
  {
    id: 3,
    title: "Pipeline & Execution",
    purpose: "Convert interest into revenue",
    items: ["Target identification & qualification", "Personalised outreach", "Negotiation & contracting"],
    deliverable: "Predictable Sponsor Pipeline"
  },
  {
    id: 4,
    title: "Relationship Mgmt",
    purpose: "Protect revenue & drive renewals",
    items: ["Onboarding & delivery", "Post-event reporting", "Expansion conversations"],
    deliverable: "Long-term Relationships"
  },
];

const whyUs = [
  { icon: Globe, title: "Global Market Expertise", desc: "Deep knowledge of B2B conference markets across NA, Europe, and APAC." },
  { icon: BookOpen, title: "Proven Methodology", desc: "Repeatable approach refined through hundreds of engagements." },
  { icon: Handshake, title: "Dedicated Ownership", desc: "No rotating teams. Dedicated commercial partners." },
  { icon: BarChart, title: "Complete Transparency", desc: "Full visibility into pipeline and revenue forecasts." },
];

// --- ANIMATION VARIANTS ---
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// --- SUB-COMPONENTS ---

const Counter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!inView) return;

    const node = nodeRef.current;
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        if (node) node.textContent = Math.round(value).toString();
      }
    });

    return () => controls.stop();
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
};

const SectionHeading = ({ title, subtitle, center = false }: { title: string, subtitle?: string, center?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className={`mb-12 ${center ? 'text-center' : 'text-left'}`}
  >
    <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-brand-text max-w-3xl mx-auto">{subtitle}</p>}
  </motion.div>
);

const PhaseVisual = ({ stepId }: { stepId: number }) => {
  const visualContent = () => {
    switch (stepId) {
      case 1: // Commercial Strategy
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-brand-teal/30 to-transparent"></div>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent absolute"></div>
            </div>
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring" }}
              className="w-12 h-12 bg-brand-navy border-2 border-brand-teal rounded-full flex items-center justify-center relative z-10"
            >
              <Compass className="text-brand-teal w-6 h-6" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30, y: -20 }} animate={{ opacity: 1, x: 30, y: -20 }} transition={{ delay: 0.2 }}>
              <div className="absolute w-8 h-8 bg-brand-card border border-brand-border rounded flex items-center justify-center">
                <Target className="w-4 h-4 text-brand-blue" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30, y: 20 }} animate={{ opacity: 1, x: -30, y: 20 }} transition={{ delay: 0.3 }}>
              <div className="absolute w-8 h-8 bg-brand-card border border-brand-border rounded flex items-center justify-center">
                <BarChart className="w-4 h-4 text-brand-blue" />
              </div>
            </motion.div>
          </div>
        );
      case 2: // Package Engineering
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="flex flex-col gap-2 transform -rotate-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                className="w-32 h-8 bg-brand-card border border-brand-teal/20 rounded flex items-center px-3 gap-2 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-brand-teal/50"></div>
                <div className="h-1 w-16 bg-brand-border rounded"></div>
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="w-32 h-8 bg-brand-navy border border-brand-teal rounded flex items-center px-3 gap-2 shadow-lg z-10"
              >
                <div className="w-2 h-2 rounded-full bg-brand-teal"></div>
                <div className="h-1 w-20 bg-brand-border rounded"></div>
                <Package className="w-3 h-3 text-brand-teal ml-auto" />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                className="w-32 h-8 bg-brand-card border border-brand-teal/20 rounded flex items-center px-3 gap-2 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-brand-teal/50"></div>
                <div className="h-1 w-12 bg-brand-border rounded"></div>
              </motion.div>
            </div>
          </div>
        );
      case 3: // Pipeline & Execution
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-1">
            <motion.div initial={{ width: "20%" }} animate={{ width: "80%" }} transition={{ duration: 0.5 }} className="h-2 bg-brand-border rounded-full" />
            <motion.div initial={{ width: "20%" }} animate={{ width: "60%" }} transition={{ duration: 0.5, delay: 0.1 }} className="h-2 bg-brand-blue/60 rounded-full" />
            <motion.div initial={{ width: "20%" }} animate={{ width: "40%" }} transition={{ duration: 0.5, delay: 0.2 }} className="h-2 bg-brand-blue rounded-full" />
            <motion.div initial={{ width: "20%" }} animate={{ width: "20%" }} transition={{ duration: 0.5, delay: 0.3 }} className="h-2 bg-brand-teal rounded-full" />
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <ArrowDown className="w-5 h-5 text-brand-teal mt-2" />
            </motion.div>
          </div>
        );
      case 4: // Relationship Mgmt
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-24 h-24 rounded-full border border-dashed border-brand-border"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 w-16 h-16 bg-brand-navy border border-brand-teal/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]"
            >
              <RefreshCw className="w-6 h-6 text-brand-teal" />
            </motion.div>
            <div className="absolute top-2 right-8">
              <Users className="w-4 h-4 text-brand-muted" />
            </div>
            <div className="absolute bottom-4 left-8">
              <Handshake className="w-4 h-4 text-brand-muted" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-32 bg-gradient-to-br from-brand-navy to-brand-section rounded-xl border border-brand-border flex items-center justify-center overflow-hidden mb-6">
      {visualContent()}
    </div>
  );
};

export const ChallengesSection: React.FC = () => (
  <section className="py-24 bg-brand-section transition-colors duration-300">
    <div className="container mx-auto px-4 sm:px-6 lg:px-24 grid md:grid-cols-2 gap-6 md:gap-8 md:gap-12 lg:gap-16 items-center">
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-6">
          Strong Conferences Still Leave <br />
          <span className="text-brand-teal">Sponsorship Revenue on the Table</span>
        </h2>
        <p className="text-brand-text mb-8 leading-relaxed">
          You can deliver an exceptional agenda, attract senior decision-makers, and still underperform commercially.
          For most B2B conferences, sponsorship revenue falls short not because of weak demand — but because
          sponsorship sales lack ownership, structure, and consistent execution.
        </p>
        <ul className="space-y-4 mb-8">
          {[
            "Prospecting that drains leadership time",
            "Static packages that fail to align with buyers",
            "Unpredictable revenue making planning difficult",
            "Warm interest lost to inconsistent follow-up"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <AlertTriangle className="text-brand-teal w-5 h-5 flex-shrink-0 mt-1" />
              <span className="text-brand-muted">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-xl font-semibold text-brand-teal italic border-l-4 border-brand-teal pl-4">
          This is the revenue gap SponsrBridge closes.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {stats.map((stat, i) => {
          const isRange = stat.value.includes('-');
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-brand-card p-6 rounded-lg border-l-4 border-brand-teal shadow-lg hover:bg-brand-card/80 transition-colors h-full flex flex-col justify-center"
            >
              <div className="text-3xl xl:text-4xl font-bold text-brand-white mb-3 flex items-baseline flex-wrap gap-x-1">
                {stat.prefix && <span>{stat.prefix}</span>}

                {isRange ? (
                  <div className="flex items-baseline">
                    <Counter to={parseInt(stat.value.split('-')[0])} />
                    <span className="mx-1.5 text-brand-teal/80">-</span>
                    <Counter to={parseInt(stat.value.split('-')[1])} />
                  </div>
                ) : (
                  <Counter to={parseInt(stat.value)} />
                )}

                {stat.suffix && <span className="text-2xl xl:text-3xl text-brand-muted font-semibold ml-0.5">{stat.suffix}</span>}
              </div>
              <div className="text-sm text-brand-text font-medium leading-snug">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export const WhatWeDoSection: React.FC = () => (
  <section id="services" className="py-24 bg-brand-navy transition-colors duration-300">
    <div className="container mx-auto px-4 sm:px-6 lg:px-24">
      <SectionHeading
        center
        title="We Design and Run Your Sponsorship Revenue Engine"
        subtitle="Not inventory sales. Not ad hoc outreach. A complete commercial operating model that transforms sponsorship from a secondary function into a strategic revenue capability."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
      >
        {capabilities.map((card, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(var(--accent-rgb),0.1)" }}
            className="group bg-brand-card border border-brand-border p-8 rounded-xl cursor-default hover:border-brand-teal/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-brand-navy/30 mb-6 group-hover:bg-brand-teal/10 transition-colors duration-300">
              <card.icon className="w-8 h-8 text-brand-teal group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)] transition-all duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-brand-white mb-3">{card.title}</h3>
            <p className="text-brand-muted text-sm leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 text-center">
        <p className="text-lg text-brand-teal font-medium bg-brand-teal/10 inline-block px-6 py-3 rounded-full">
          In short — we operate as your embedded sponsorship revenue team.
        </p>
      </div>
    </div>
  </section>
);

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="how-it-works" className="py-24 bg-brand-section relative overflow-hidden transition-colors duration-300 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 relative z-10">
        <SectionHeading
          title="How SponsrBridge Works"
          subtitle="A four-phase operating model designed to produce predictable revenue."
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          {/* Steps Navigation */}
          <div className="lg:w-1/3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {processSteps.map((step) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 p-4 rounded-lg border text-left transition-all min-w-[260px] lg:min-w-0 ${activeStep === step.id
                    ? 'bg-brand-card border-brand-teal shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]'
                    : 'bg-transparent border-brand-border hover:border-brand-muted'
                  }`}
              >
                <span className={`text-2xl font-bold ${activeStep === step.id ? 'text-brand-teal' : 'text-brand-muted'}`}>
                  0{step.id}
                </span>
                <span className={`font-semibold ${activeStep === step.id ? 'text-brand-white' : 'text-brand-muted'}`}>
                  {step.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Step Content */}
          <div className="lg:w-2/3 min-h-[500px]">
            <AnimatePresence mode="wait">
              {processSteps.map((step) => (
                activeStep === step.id && (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-brand-card p-8 md:p-12 rounded-2xl border border-brand-border h-full flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px flex-1 bg-gradient-to-r from-brand-blue to-brand-teal"></div>
                      <span className="text-brand-teal font-bold tracking-wider uppercase text-sm">Phase 0{step.id}</span>
                    </div>

                    <h3 className="text-3xl font-bold text-brand-white mb-2">{step.title}</h3>
                    <p className="text-lg text-brand-teal/80 mb-8 font-medium">{step.purpose}</p>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <h4 className="text-brand-white font-semibold mb-4 border-b border-brand-border pb-2">What We Do</h4>
                        <ul className="space-y-3">
                          {step.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-brand-muted">
                              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col">
                        <PhaseVisual stepId={step.id} />

                        <h4 className="text-brand-white font-semibold mb-3 border-b border-brand-border pb-2">Key Deliverable</h4>
                        <div className="bg-brand-navy p-4 rounded-lg border border-brand-teal/20 text-center flex-grow flex items-center justify-center">
                          <span className="text-brand-teal font-semibold">{step.deliverable}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyUsSection: React.FC = () => (
  <section className="py-24 bg-brand-navy transition-colors duration-300">
    <div className="container mx-auto px-4 sm:px-6 lg:px-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-4">Why Organisers Choose SponsrBridge</h2>
        <p className="text-brand-muted">We close the execution gap between strategy and revenue.</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
      >
        {whyUs.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ x: 10 }}
            className="flex gap-6 p-6 rounded-xl hover:bg-brand-card transition-colors duration-300 group cursor-default"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-brand-card border border-brand-border rounded-lg flex items-center justify-center group-hover:border-brand-teal transition-colors">
                <item.icon className="text-brand-teal w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-white mb-2">{item.title}</h3>
              <p className="text-brand-muted leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
