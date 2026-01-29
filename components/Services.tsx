
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLenis } from './SmoothScroll';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import {
  Shield, Target, Search, Check, ChevronDown, ChevronUp,
  Users, Grid, ClipboardCheck, Presentation,
  ArrowRight, Download, Mail, CheckCircle2,
  BarChart3, PieChart, Briefcase, FileText, Zap, Layers, Compass, Filter
} from 'lucide-react';

// --- VISUAL COMPONENTS ---

const FullServiceVisual = () => (
  <div className="relative w-full h-64 bg-brand-navy/50 rounded-xl border border-brand-border overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent-rgb),0.05)_0%,transparent_60%)]" />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="w-32 h-32 border border-dashed border-brand-teal/30 rounded-full absolute"
    />
    <div className="relative z-10 grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="w-12 h-12 bg-brand-card border border-brand-teal/20 rounded-lg flex items-center justify-center shadow-lg"
        >
          {i === 1 && <Briefcase size={20} className="text-brand-teal" />}
          {i === 2 && <Users size={20} className="text-brand-blue" />}
          {i === 3 && <BarChart3 size={20} className="text-brand-white" />}
          {i === 4 && <Zap size={20} className="text-brand-teal" />}
        </motion.div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-brand-teal rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]">
          <Shield size={16} className="text-brand-navy" />
        </div>
      </div>
    </div>
  </div>
);

const ExecutionVisual = () => (
  <div className="relative w-full h-64 bg-brand-navy/50 rounded-xl border border-brand-border overflow-hidden flex items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-1 bg-gradient-to-b from-transparent via-brand-teal to-transparent h-16"
      />
      <div className="w-40 h-32 bg-brand-card border border-brand-teal/30 rounded-lg relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-x-0 top-0 h-1 bg-brand-teal/50" />
        <Filter size={32} className="text-brand-teal opacity-20 absolute" />
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ y: [20, -20] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
              className="w-2 h-2 rounded-full bg-brand-teal"
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-brand-teal font-bold text-xs uppercase tracking-widest">
        <Target size={14} /> Conversion
      </div>
    </div>
  </div>
);

const AdvisoryVisual = () => (
  <div className="relative w-full h-64 bg-brand-navy/50 rounded-xl border border-brand-border overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent-rgb),0.02)_0%,transparent_60%)]" />

    <div className="relative w-48 h-48 rounded-full border border-brand-border/30 flex items-center justify-center bg-brand-card/10 backdrop-blur-sm shadow-inner">
      {/* Compass Marks */}
      <div className="absolute top-0 w-0.5 h-3 bg-brand-teal/50" />
      <div className="absolute bottom-0 w-0.5 h-3 bg-brand-muted/30" />
      <div className="absolute left-0 w-3 h-0.5 bg-brand-muted/30" />
      <div className="absolute right-0 w-3 h-0.5 bg-brand-muted/30" />

      {/* Inner Circle */}
      <div className="absolute inset-8 rounded-full border border-dashed border-brand-border/20" />

      {/* Needle Container */}
      <motion.div
        animate={{ rotate: [0, 60, 20, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full flex items-center justify-center"
      >
        {/* Needle */}
        <div className="w-1 h-32 relative">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-teal to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-brand-teal to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[12px] border-b-brand-teal transform -translate-y-full" />
        </div>
      </motion.div>

      {/* Center Cap */}
      <div className="absolute w-4 h-4 bg-brand-navy border-2 border-brand-teal rounded-full z-10 shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />
    </div>

    {/* Floating Cards */}
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-8 right-12 bg-brand-card border border-brand-teal/30 p-2 rounded-lg shadow-lg z-20 flex items-center gap-2"
    >
      <div className="w-2 h-2 bg-brand-teal rounded-full" />
      <div className="h-1 w-8 bg-brand-muted/50 rounded" />
    </motion.div>

    <motion.div
      animate={{ y: [8, -8, 8] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-brand-card border border-brand-border p-2 rounded-lg shadow-lg z-20"
    >
      <PieChart size={16} className="text-brand-muted" />
    </motion.div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  // --- DATA ---

  const comparisonData = [
    { feature: "Strategy Development", full: true, exec: false, advisory: true, execText: "Client provides", advText: "Guidance only" },
    { feature: "Package Design", full: true, exec: false, advisory: true, execText: "Client provides", advText: "Recommendations" },
    { feature: "Pipeline Development", full: true, exec: true, advisory: true, advText: "Target lists only" },
    { feature: "Sales Execution", full: true, exec: true, advisory: false, advText: "Client handles" },
    { feature: "Sponsor Management", full: true, exec: false, advisory: false, execText: "Client handles", advText: "Client handles" },
    { feature: "Reporting", full: "Comprehensive", exec: "Pipeline focused", advisory: "Strategic reviews" },
    { feature: "Your Team's Role", full: "Minimal oversight", exec: "Strategic direction", advisory: "Full execution" },
  ];

  const processSteps = [
    { id: 1, title: "Discovery Call", duration: "45 mins", desc: "A focused conversation to understand your conference, current performance, and objectives. No pitch — just a practical discussion.", outcome: "Mutual understanding & alignment" },
    { id: 2, title: "Proposal", desc: "We develop a tailored proposal outlining the recommended engagement model, scope, deliverables, timeline, and commercial terms.", outcome: "Clear agreement on structure" },
    { id: 3, title: "Onboarding", desc: "Structured kickoff to immerse our team in your brand, audience, and commercial context. We gather all needed info to hit the ground running.", outcome: "Team fully briefed & ready" },
    { id: 4, title: "Execution", desc: "Active delivery against the agreed scope — whether full ownership, sales execution, or advisory. Transparent progress tracking throughout.", outcome: "Revenue growth & development" },
    { id: 5, title: "Reporting", desc: "Ongoing visibility into performance with structured reporting cadences. You always know where revenue stands and what's in the pipeline.", outcome: "Complete transparency" },
  ];

  return (
    <div className="pt-20 bg-brand-navy min-h-screen font-sans">

      {/* SECTION 1: HERO */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-24 relative overflow-hidden z-10 bg-brand-navy">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--blue-rgb),0.1)_0%,transparent_70%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl relative z-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white mb-6 leading-tight">
            Sponsorship Services Built <br />
            Around Your <span className="gradient-text">Revenue Goals</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-text max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Whether you need full commercial ownership or strategic guidance, SponsrBridge offers
            flexible engagement models designed to maximise your conference's sponsorship potential.
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: OVERVIEW */}
      <section className="py-20 bg-brand-section border-y border-brand-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="text-center mb-12">
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">Our Services</span>
            <h2 className="text-3xl font-bold text-brand-white mt-2">Three Ways to Work With SponsrBridge</h2>
            <p className="text-brand-muted mt-4 max-w-2xl mx-auto">Every conference has different needs. We offer three distinct engagement models designed to deliver measurable growth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { id: 'model-01', icon: Shield, title: 'Full-Service Management', desc: 'Complete commercial ownership — we operate as your embedded sponsorship revenue team.' },
              { id: 'model-02', icon: Target, title: 'Sales Execution Partnership', desc: 'Dedicated sales execution for organisers with defined strategy needing experienced closers.' },
              { id: 'model-03', icon: Search, title: 'Strategic Commercial Advisory', desc: 'Senior-level guidance and market intelligence for teams with in-house sales capability.' }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, borderColor: 'rgba(var(--accent-rgb),0.3)' }}
                className="bg-brand-card p-6 rounded-xl border border-brand-border flex flex-col h-full cursor-pointer transition-colors group"
                onClick={() => scrollToSection(card.id)}
              >
                <div className="w-12 h-12 bg-brand-navy border border-brand-border rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-teal group-hover:text-brand-navy transition-colors">
                  <card.icon size={24} className={card.id === 'model-01' ? 'text-brand-teal' : 'text-brand-white group-hover:text-brand-navy'} />
                </div>
                <h3 className="text-xl font-bold text-brand-white mb-3">{card.title}</h3>
                <p className="text-sm text-brand-muted mb-6 flex-grow">{card.desc}</p>
                <div className="flex items-center text-brand-teal text-sm font-bold uppercase tracking-wider">
                  Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: MODEL 01 */}
      <section id="model-01" className="py-24 bg-brand-navy relative scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 grid lg:grid-cols-5 gap-6 lg:gap-8 lg:gap-16">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <span className="text-brand-teal text-xs font-bold uppercase tracking-widest bg-brand-teal/10 px-3 py-1 rounded">Service Model 01</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-white mt-4 mb-2">Full-Service Sponsorship Management</h2>
              <p className="text-xl text-brand-teal font-medium italic">Your Embedded Sponsorship Revenue Team</p>
            </div>
            <p className="text-brand-text leading-relaxed text-lg">
              For conference organisers who want to hand over complete sponsorship responsibility to a dedicated commercial partner. We own the entire sponsorship function — from strategy and package design through pipeline development, sales execution, and sponsor relationship management.
            </p>

            <div className="space-y-4">
              <h4 className="text-brand-white font-bold">What's Included:</h4>
              <div className="space-y-2">
                {[
                  { title: "Strategy & Positioning", content: "Comprehensive sponsorship revenue strategy, audience analysis, value proposition design, and competitive benchmarking." },
                  { title: "Package Development", content: "Outcome-led sponsorship programme design, modular package architecture, and commercial documentation." },
                  { title: "Pipeline & Sales Execution", content: "Target identification, full sales cycle management (outreach to contract), proposal negotiation, and forecasting." },
                  { title: "Relationship Management", content: "Sponsor onboarding, delivery coordination, post-event reporting, ROI documentation, and renewal strategy." }
                ].map((item, i) => (
                  <div key={i} className="border border-brand-border rounded-lg overflow-hidden bg-brand-card">
                    <button
                      onClick={() => toggleAccordion(`m1-${i}`)}
                      className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-brand-navy/50 transition-colors"
                    >
                      <span className="font-bold text-brand-white">{item.title}</span>
                      {activeAccordion === `m1-${i}` ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <AnimatePresence>
                      {activeAccordion === `m1-${i}` && (
                        <motion.div
                          initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-sm text-brand-muted">{item.content}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <FullServiceVisual />

            <div className="bg-brand-card p-6 rounded-xl border border-brand-border">
              <h4 className="text-sm font-bold text-brand-muted uppercase tracking-widest mb-4">Key Deliverables</h4>
              <ul className="space-y-3">
                {["Strategic Revenue Blueprint", "Custom Sponsorship Portfolio", "Qualified Sponsor Pipeline (30-50)", "Monthly Performance Reports", "Handover Documentation"].map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-white">
                    <CheckCircle2 size={16} className="text-brand-teal mt-0.5 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-section p-6 rounded-xl border border-brand-border">
              <h4 className="text-sm font-bold text-brand-muted uppercase tracking-widest mb-2">Best For</h4>
              <ul className="text-sm text-brand-text space-y-2 list-disc list-inside">
                <li>Organisers without dedicated in-house sales</li>
                <li>Events where sponsorship is underperforming</li>
                <li>Teams needing to offload commercial ownership</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Commercial Model Footer */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 mt-12">
          <div className="bg-brand-card border-l-4 border-brand-teal p-6 rounded-r-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-brand-white font-bold mb-1">Commercial Model</h4>
              <p className="text-sm text-brand-muted max-w-2xl">Custom pricing combining a performance-based fee aligned with secured revenue and a monthly retainer for continuity. Our success is tied directly to yours.</p>
            </div>
            <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-brand-teal text-brand-navy font-bold rounded-lg hover:bg-brand-accent-hover transition-colors whitespace-nowrap">
              Discuss Full-Service
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: MODEL 02 */}
      <section id="model-02" className="py-24 bg-brand-section relative scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 grid lg:grid-cols-5 gap-6 lg:gap-8 lg:gap-16">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <span className="text-brand-teal text-xs font-bold uppercase tracking-widest bg-brand-teal/10 px-3 py-1 rounded">Service Model 02</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-white mt-4 mb-2">Sales Execution Partnership</h2>
              <p className="text-xl text-brand-teal font-medium italic">Experienced Closers for Your Sponsorship Pipeline</p>
            </div>
            <p className="text-brand-text leading-relaxed text-lg">
              For conference organisers who have a defined sponsorship strategy but need dedicated sales expertise to convert pipeline into revenue. We become your outsourced sales function — executing against your commercial framework with discipline and professionalism.
            </p>

            <div className="space-y-4">
              <h4 className="text-brand-white font-bold">What's Included:</h4>
              <div className="space-y-2">
                {[
                  { title: "Pipeline Development", content: "Sponsor prospect research, prioritisation, decision-maker identification, contact mapping, and qualification." },
                  { title: "Sales Execution", content: "Structured outreach campaigns, discovery conversations, needs qualification, proposal development, and negotiation." },
                  { title: "Pipeline Management", content: "Active tracking, regular progress reporting, forecasting, and deal documentation/handover." }
                ].map((item, i) => (
                  <div key={i} className="border border-brand-border rounded-lg overflow-hidden bg-brand-card">
                    <button
                      onClick={() => toggleAccordion(`m2-${i}`)}
                      className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-brand-navy/50 transition-colors"
                    >
                      <span className="font-bold text-brand-white">{item.title}</span>
                      {activeAccordion === `m2-${i}` ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <AnimatePresence>
                      {activeAccordion === `m2-${i}` && (
                        <motion.div
                          initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-sm text-brand-muted">{item.content}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ExecutionVisual />

            <div className="bg-brand-card p-6 rounded-xl border border-brand-border">
              <h4 className="text-sm font-bold text-brand-muted uppercase tracking-widest mb-4">Key Deliverables</h4>
              <ul className="space-y-3">
                {["Qualified Sponsor Pipeline", "Weekly Pipeline Status Reports", "Closed Sponsorship Agreements", "Revenue Forecasts"].map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-white">
                    <CheckCircle2 size={16} className="text-brand-teal mt-0.5 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* WHAT YOU PROVIDE */}
            <div className="bg-brand-navy p-6 rounded-xl border border-brand-border border-dashed">
              <h4 className="text-sm font-bold text-brand-white uppercase tracking-widest mb-4">What You Provide</h4>
              <ul className="space-y-2 text-sm text-brand-muted">
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5" />Defined packages & pricing</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5" />Brand positioning direction</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5" />Target priorities</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5" />Approval on proposals</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Commercial Model Footer */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 mt-12">
          <div className="bg-brand-card border-l-4 border-brand-blue p-6 rounded-r-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-brand-white font-bold mb-1">Commercial Model</h4>
              <p className="text-sm text-brand-muted max-w-2xl">Custom pricing based on scope, typically combining a retainer for dedicated sales resource with performance incentives on closed deals.</p>
            </div>
            <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-brand-blue text-brand-white font-bold rounded-lg hover:bg-brand-accent-hover transition-colors whitespace-nowrap">
              Discuss Sales Partnership
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: MODEL 03 */}
      <section id="model-03" className="py-24 bg-brand-navy relative scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 grid lg:grid-cols-5 gap-6 lg:gap-8 lg:gap-16">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <span className="text-brand-teal text-xs font-bold uppercase tracking-widest bg-brand-teal/10 px-3 py-1 rounded">Service Model 03</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-white mt-4 mb-2">Strategic Commercial Advisory</h2>
              <p className="text-xl text-brand-teal font-medium italic">Senior-Level Guidance Without Execution Overhead</p>
            </div>
            <p className="text-brand-text leading-relaxed text-lg">
              For conference organisers with in-house sales capability who need strategic direction, market intelligence, and expert perspective to strengthen sponsorship performance. We provide senior commercial guidance while your team handles execution.
            </p>

            <div className="space-y-4">
              <h4 className="text-brand-white font-bold">What's Included:</h4>
              <div className="space-y-2">
                {[
                  { title: "Strategic Review & Guidance", content: "Periodic commercial strategy reviews, sponsorship positioning advisory, package architecture recommendations, and sales process optimisation." },
                  { title: "Market Intelligence", content: "Competitive landscape analysis, sponsor demand insights, pricing benchmarks, and curated target sponsor recommendations." },
                  { title: "Ongoing Access", content: "Regular strategy calls with senior partners, ad-hoc consultation on challenges, and access to SponsrBridge intelligence resources." }
                ].map((item, i) => (
                  <div key={i} className="border border-brand-border rounded-lg overflow-hidden bg-brand-card">
                    <button
                      onClick={() => toggleAccordion(`m3-${i}`)}
                      className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-brand-navy/50 transition-colors"
                    >
                      <span className="font-bold text-brand-white">{item.title}</span>
                      {activeAccordion === `m3-${i}` ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <AnimatePresence>
                      {activeAccordion === `m3-${i}` && (
                        <motion.div
                          initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-sm text-brand-muted">{item.content}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <AdvisoryVisual />

            <div className="bg-brand-card p-6 rounded-xl border border-brand-border">
              <h4 className="text-sm font-bold text-brand-muted uppercase tracking-widest mb-4">Key Deliverables</h4>
              <ul className="space-y-3">
                {["Commercial Strategy Assessment", "Market & Competitive Analysis", "Strategic Recommendations Report", "Curated Sponsor Target Lists"].map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-white">
                    <CheckCircle2 size={16} className="text-brand-teal mt-0.5 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* YOUR TEAM HANDLES */}
            <div className="bg-brand-navy p-6 rounded-xl border border-brand-border border-dashed">
              <h4 className="text-sm font-bold text-brand-white uppercase tracking-widest mb-4">Your Team Handles</h4>
              <ul className="space-y-2 text-sm text-brand-muted">
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5" />Day-to-day sales execution</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5" />Sponsor outreach & relationships</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5" />Proposal dev & negotiation</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5" />Pipeline management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Commercial Model Footer */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 mt-12">
          <div className="bg-brand-card border-l-4 border-brand-teal p-6 rounded-r-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-brand-white font-bold mb-1">Commercial Model</h4>
              <p className="text-sm text-brand-muted max-w-2xl">Custom quarterly retainer covering defined advisory deliverables and access to senior commercial expertise.</p>
            </div>
            <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-brand-teal text-brand-navy font-bold rounded-lg hover:bg-brand-accent-hover transition-colors whitespace-nowrap">
              Discuss Advisory
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: ADDITIONAL SERVICES */}
      <section id="addons" className="py-24 bg-brand-section/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="text-center mb-16">
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">Additional Services</span>
            <h2 className="text-3xl font-bold text-brand-white mt-2">Complementary Revenue Services</h2>
            <p className="text-brand-muted mt-4 max-w-2xl mx-auto">Beyond our core sponsorship services, we offer additional support to maximise overall commercial performance.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Users, title: "Delegate Sales", desc: "Targeted outreach to drive paid attendee registrations and fill seats.", items: ["Audience segmentation", "Campaign execution", "Pipeline tracking"] },
              { icon: Grid, title: "Exhibitor Sales", desc: "Disciplined sales approach for exhibition booths and floor space.", items: ["Prospect identification", "Outreach & qualification", "Booth negotiation"] },
              { icon: ClipboardCheck, title: "Sponsorship Audit", desc: "Diagnostic of your current programme to find gaps and pricing opportunities.", items: ["Performance analysis", "Package review", "Actionable report"] },
              { icon: Presentation, title: "Team Training", desc: "Upskill your internal team with practical sponsorship sales workshops.", items: ["Sales playbooks", "Interactive workshops", "Coaching sessions"] },
            ].map((addon, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-brand-card p-6 rounded-xl border border-brand-border hover:border-brand-teal/30 transition-all group"
              >
                <div className="w-12 h-12 bg-brand-navy border border-brand-border rounded-lg flex items-center justify-center mb-4 text-brand-teal group-hover:bg-brand-teal group-hover:text-brand-navy transition-colors">
                  <addon.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-brand-white mb-2">{addon.title}</h3>
                <p className="text-sm text-brand-muted mb-4 h-14 overflow-hidden">{addon.desc}</p>
                <ul className="space-y-1 pt-4 border-t border-brand-border/50">
                  {addon.items.map((it, idx) => (
                    <li key={idx} className="text-xs text-brand-text flex items-center gap-2">
                      <div className="w-1 h-1 bg-brand-teal rounded-full" /> {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-brand-muted italic">Available as standalone engagements or add-ons.</div>
        </div>
      </section>

      {/* SECTION 7: PROCESS */}
      <section className="py-24 bg-brand-navy overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="text-center mb-16">
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">Our Process</span>
            <h2 className="text-3xl font-bold text-brand-white mt-2">From First Conversation to Revenue Results</h2>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-8 left-0 w-full h-1 bg-brand-border z-0">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-brand-blue to-brand-teal"
              />
            </div>

            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="relative z-10 flex flex-col lg:items-center lg:text-center"
                >
                  <div className="w-16 h-16 bg-brand-navy border-2 border-brand-teal rounded-full flex items-center justify-center text-xl font-bold text-brand-white mb-6 shadow-lg">
                    {step.id}
                  </div>
                  <h3 className="text-lg font-bold text-brand-white mb-2">{step.title}</h3>
                  <p className="text-xs text-brand-teal font-bold uppercase mb-3">{step.duration || "Phase " + step.id}</p>
                  <p className="text-sm text-brand-muted mb-4">{step.desc}</p>
                  <div className="mt-auto bg-brand-card/50 p-3 rounded border border-brand-border text-xs text-brand-white w-full">
                    <span className="text-brand-teal font-bold">Outcome:</span> {step.outcome}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: COMPARISON */}
      <section className="py-24 bg-brand-section/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="text-center mb-16">
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">Compare Models</span>
            <h2 className="text-3xl font-bold text-brand-white mt-2">Which Model Is Right for You?</h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-brand-border bg-brand-navy shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-card/80 text-brand-white">
                  <th className="p-6 font-bold border-b border-brand-border">Feature</th>
                  <th className="p-6 font-bold border-b border-brand-border text-center text-brand-teal w-1/4 bg-brand-teal/5">Full-Service</th>
                  <th className="p-6 font-bold border-b border-brand-border text-center w-1/4">Sales Execution</th>
                  <th className="p-6 font-bold border-b border-brand-border text-center w-1/4">Advisory</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-brand-card/30 transition-colors border-b border-brand-border/50 last:border-0">
                    <td className="p-6 font-medium text-brand-white">{row.feature}</td>
                    <td className="p-6 text-center bg-brand-teal/5 border-x border-brand-border/30">
                      {typeof row.full === 'string' ? (
                        <span className="text-sm font-bold text-brand-white">{row.full}</span>
                      ) : row.full ? (
                        <div className="flex justify-center"><Check className="text-brand-teal" /> <span className="ml-2 text-sm">Included</span></div>
                      ) : (
                        <span className="text-sm text-brand-muted">Not included</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {typeof row.exec === 'string' ? (
                        <span className="text-sm font-bold text-brand-white">{row.exec}</span>
                      ) : row.exec ? (
                        <div className="flex justify-center"><Check className="text-brand-teal" /> <span className="ml-2 text-sm">Included</span></div>
                      ) : (
                        <span className="text-sm text-brand-muted">{row.execText || "Client handles"}</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {typeof row.advisory === 'string' ? (
                        <span className="text-sm font-bold text-brand-white">{row.advisory}</span>
                      ) : row.advisory ? (
                        <div className="flex justify-center text-sm"><Check className="text-brand-teal mr-2" /> {row.advText || "Included"}</div>
                      ) : (
                        <span className="text-sm text-brand-muted">{row.advText || "Client handles"}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-8">
            {['Full-Service', 'Sales Execution', 'Advisory'].map((model, idx) => (
              <div key={idx} className="bg-brand-card p-6 rounded-xl border border-brand-border">
                <h3 className="text-xl font-bold text-brand-white mb-4 text-center border-b border-brand-border pb-4">{model}</h3>
                <div className="space-y-4">
                  {comparisonData.map((row, i) => {
                    let val: any;
                    if (idx === 0) val = row.full;
                    else if (idx === 1) val = row.exec;
                    else val = row.advisory;

                    let display;
                    if (typeof val === 'string') display = <span className="font-bold text-brand-white">{val}</span>;
                    else if (val === true) display = <span className="text-brand-teal flex items-center gap-1"><Check size={14} /> {idx === 2 && row.advText ? row.advText : "Included"}</span>;
                    else display = <span className="text-brand-muted">{idx === 1 ? row.execText : idx === 2 ? row.advText : "Not included"}</span>;

                    return (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-brand-muted">{row.feature}</span>
                        <div className="text-right">{display}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-brand-text mb-6">Not sure which model fits? We'll help you identify the right approach.</p>
            <button onClick={() => navigate('/contact')} className="px-8 py-4 border border-brand-teal text-brand-teal font-bold rounded-lg hover:bg-brand-teal/10 transition-colors">
              Book a Discovery Call
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: CTA */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-teal text-brand-navy relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Sponsorship Revenue?</h2>
          <p className="text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto opacity-90">
            Let's start with a conversation about your conference, your challenges, and your revenue goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-10 py-5 bg-brand-navy text-brand-teal font-bold rounded-xl text-lg hover:brightness-110 shadow-2xl transition-all w-full sm:w-auto"
            >
              Book a Discovery Call
            </button>
            <button
              onClick={() => scrollToSection('model-01')}
              className="px-10 py-5 bg-transparent border-2 border-brand-navy text-brand-navy font-bold rounded-xl text-lg hover:bg-brand-navy/10 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Download size={20} /> Services Overview
            </button>
          </div>
          <div className="mt-8 text-sm font-bold">
            Prefer email? <a href="mailto:hello@sponsrbridge.io" className="underline hover:text-brand-white">hello@sponsrbridge.io</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
