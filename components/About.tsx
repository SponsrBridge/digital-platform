
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Target, Eye, Shield, Clock, Handshake, Globe, 
  ArrowRight, CheckCircle2, XCircle, Award, TrendingUp, 
  Briefcase, Zap, ChevronRight, Layers, Users
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'contact' | 'faq' | 'insights' | 'privacy' | 'terms') => void;
}

// --- VISUAL COMPONENTS ---

const AbstractBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-brand-teal/5 blur-[120px] rounded-full"
    />
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        x: [0, -40, 0],
        y: [0, -60, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-brand-blue/5 blur-[120px] rounded-full"
    />
    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px]" />
  </div>
);

const Counter = ({ from = 0, to, suffix = "", prefix = "" }: { from?: number; to: number; suffix?: string; prefix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-20px" });

  useEffect(() => {
    if (inView) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (node) node.textContent = prefix + Math.round(value).toLocaleString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, suffix, prefix]);

  return <span ref={nodeRef} className="text-4xl md:text-5xl font-bold text-brand-teal">{prefix}{from}{suffix}</span>;
};

// Normalized coordinates for a stylized world map (0-100 scale)
const worldDots = [
  // North America
  {x: 15, y: 20}, {x: 20, y: 18}, {x: 25, y: 15}, {x: 12, y: 25}, {x: 18, y: 28}, {x: 22, y: 32}, {x: 28, y: 30}, {x: 32, y: 25}, {x: 10, y: 22},
  // South America
  {x: 28, y: 55}, {x: 32, y: 60}, {x: 35, y: 52}, {x: 30, y: 70}, {x: 34, y: 75}, {x: 32, y: 85},
  // Europe
  {x: 48, y: 20}, {x: 52, y: 18}, {x: 55, y: 20}, {x: 46, y: 25}, {x: 50, y: 28}, {x: 54, y: 25},
  // Africa
  {x: 48, y: 45}, {x: 52, y: 50}, {x: 55, y: 42}, {x: 50, y: 60}, {x: 56, y: 65}, {x: 60, y: 55}, {x: 54, y: 75},
  // Asia
  {x: 65, y: 22}, {x: 70, y: 18}, {x: 75, y: 25}, {x: 80, y: 22}, {x: 68, y: 32}, {x: 74, y: 35}, {x: 82, y: 38}, {x: 88, y: 28}, {x: 92, y: 20},
  // Australia
  {x: 85, y: 70}, {x: 88, y: 75}, {x: 82, y: 80}, {x: 90, y: 72}
];

const activeCities = [
  { id: 'ny', x: 29, y: 28, label: 'New York' },
  { id: 'ldn', x: 46, y: 21, label: 'London' },
  { id: 'ber', x: 51, y: 22, label: 'Berlin' },
  { id: 'dub', x: 62, y: 38, label: 'Dubai' },
  { id: 'sha', x: 82, y: 32, label: 'Shanghai' },
];

const WorldMapVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center perspective-[1000px]">
       {/* Globe Effect Background */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-[90%] aspect-square rounded-full bg-gradient-to-br from-brand-teal/5 via-brand-blue/5 to-transparent blur-3xl" 
          />
          <div className="absolute w-[80%] aspect-square rounded-full border border-brand-teal/10 opacity-30" />
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
             className="absolute w-[85%] aspect-square rounded-full border border-dashed border-brand-teal/5 opacity-30" 
          />
       </div>

       <div className="absolute inset-0 w-full h-full">
          {/* Base Map Dots */}
          {worldDots.map((dot, i) => (
             <motion.div 
               key={i}
               className="absolute w-1 h-1 rounded-full bg-brand-muted/20"
               style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: i * 0.01 }}
             />
          ))}

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="city-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="20%" stopColor="#79F3DE" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#79F3DE" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#79F3DE" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* NY -> London */}
            <motion.path 
              d="M 29% 28% Q 38% 15% 46% 21%"
              fill="none"
              stroke="url(#city-line-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            {/* London -> Berlin */}
            <motion.path 
              d="M 46% 21% L 51% 22%"
              fill="none"
              stroke="url(#city-line-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            />
            {/* Berlin -> Dubai */}
            <motion.path 
              d="M 51% 22% Q 58% 30% 62% 38%"
              fill="none"
              stroke="url(#city-line-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            />
            {/* Dubai -> Shanghai */}
            <motion.path 
              d="M 62% 38% Q 72% 35% 82% 32%"
              fill="none"
              stroke="url(#city-line-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 3.5 }}
            />
          </svg>

          {/* Cities */}
          {activeCities.map((city, i) => (
             <div key={city.id} className="absolute" style={{ left: `${city.x}%`, top: `${city.y}%` }}>
                {/* Pulse Effect */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-brand-teal"
                />
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 + 1.25 }}
                  className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-brand-teal"
                />
                
                {/* Marker */}
                <motion.div 
                   initial={{ scale: 0 }}
                   whileInView={{ scale: 1 }}
                   transition={{ delay: 0.2 + (i * 0.2), type: "spring" }}
                   className="w-1.5 h-1.5 rounded-full bg-brand-white shadow-[0_0_10px_#fff] relative z-10"
                />
                
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: -10 }}
                  transition={{ delay: 0.5 + (i * 0.2) }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 rounded bg-brand-navy/90 border border-brand-teal/30 backdrop-blur-md shadow-lg"
                >
                   <div className="text-[10px] font-bold text-brand-teal whitespace-nowrap tracking-wide">{city.label}</div>
                   <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-teal/30 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </motion.div>
             </div>
          ))}
       </div>
    </div>
  )
}

interface PhilosophyItemProps {
  belief: { title: string; desc: string };
  index: number;
}

const PhilosophyItem: React.FC<PhilosophyItemProps> = ({ belief, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
    >
        <div className="md:w-1/2 flex justify-center relative h-64 md:h-80 w-full">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.div 
                style={{ y }}
                className="text-[140px] md:text-[220px] font-bold text-brand-section leading-none select-none opacity-50 md:opacity-100"
              >
                0{index+1}
              </motion.div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative z-10 bg-brand-card/80 border border-brand-border p-8 rounded-2xl shadow-xl max-w-md backdrop-blur-md flex flex-col justify-center h-full w-full md:w-auto"
          >
              {index === 0 && <Layers className="w-12 h-12 text-brand-teal mb-4" />}
              {index === 1 && <Handshake className="w-12 h-12 text-brand-blue mb-4" />}
              {index === 2 && <Award className="w-12 h-12 text-brand-teal mb-4" />}
              {index === 3 && <Eye className="w-12 h-12 text-brand-blue mb-4" />}
              {index === 4 && <TrendingUp className="w-12 h-12 text-brand-teal mb-4" />}
              <h3 className="text-xl font-bold text-brand-white">{belief.title}</h3>
          </motion.div>
        </div>
        <div className="md:w-1/2">
          <h3 className={`text-2xl md:text-3xl font-bold text-brand-white mb-4 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} hidden md:block`}>
            {belief.title}
          </h3>
          <p className={`text-brand-text text-lg leading-relaxed ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
              {belief.desc}
          </p>
        </div>
    </motion.div>
  );
};

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [activeDiff, setActiveDiff] = useState<'traditional' | 'sponsrbridge'>('sponsrbridge');

  // --- DATA ---
  
  const beliefs = [
    { 
      title: "Sponsorship Is a Revenue System, Not a Sales Function", 
      desc: "Most organisations treat sponsorship as ad hoc deal-making. We treat it as a commercial operating system — with strategy, structure, and repeatable processes that compound results over time." 
    },
    { 
      title: "Alignment Creates Better Outcomes for Everyone", 
      desc: "When organisers, sponsors, and sales partners share aligned incentives, everyone wins. We structure our engagements so that our success is measured by your revenue growth — not by activity metrics or billable hours." 
    },
    { 
      title: "Sponsors Deserve More Than Logo Placement", 
      desc: "Today's B2B sponsors invest in outcomes: qualified leads, executive access, thought leadership positioning. We design sponsorship programmes that deliver measurable value — which makes renewals a natural conversation, not a hard sell." 
    },
    { 
      title: "Trust Is Built Through Transparency", 
      desc: "We believe you should always know exactly where your sponsorship revenue stands. No black boxes. No surprises. Full visibility into pipeline, performance, and projections — because that's how real partnerships work." 
    },
    { 
      title: "Long-Term Relationships Beat Short-Term Deals", 
      desc: "We're not here to close one deal and move on. We build sponsor relationships designed to grow across multiple event editions — because sustainable revenue comes from partners who return, expand, and advocate." 
    }
  ];

  const values = [
    { icon: Target, title: "Commercial Rigour", desc: "We approach every engagement with discipline and precision. Strategy backed by data. Pricing grounded in market reality. Execution measured against clear targets." },
    { icon: Eye, title: "Radical Transparency", desc: "No hidden agendas. No selective reporting. You see the full picture — pipeline status, deal progression, challenges, and opportunities." },
    { icon: Shield, title: "Ownership Mentality", desc: "We operate as if your conference's success is our own — because our model ensures it is. We don't pass problems to your team; we solve them." },
    { icon: Clock, title: "Long-Term Thinking", desc: "We build sponsor relationships and commercial systems designed to grow over years, not just close this quarter. Sustainable revenue beats short-term wins." },
    { icon: Handshake, title: "Professional Integrity", desc: "We represent your brand as if it were our own. Every sponsor conversation, every proposal, every negotiation reflects the quality and credibility you've built." },
  ];

  const stats = [
    { value: 25, suffix: "+", label: "Years Combined Experience" },
    { value: 6, suffix: "", label: "Continents Covered" },
    { value: 15, suffix: "+", label: "Industries Served" },
    { value: 5000, prefix: "", suffix: "+", label: "Attendee Events Managed" },
  ];

  return (
    <div className="pt-20 relative min-h-screen overflow-x-hidden font-sans">
      <AbstractBackground />
      
      {/* SECTION 1: HERO */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-brand-navy relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,88,151,0.1)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
             <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-white mb-8 leading-tight tracking-tight">
              Built by Sponsorship Professionals, <br />
              <span className="text-brand-teal relative inline-block">
                 for Conference Organisers
                 <motion.div 
                   initial={{ width: 0 }} 
                   animate={{ width: "100%" }} 
                   transition={{ delay: 1, duration: 1 }}
                   className="absolute bottom-0 left-0 h-1 bg-brand-teal/30"
                 />
              </span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-brand-text max-w-3xl mx-auto leading-relaxed font-light"
          >
            SponsrBridge was founded on a simple belief: conference sponsorship should be 
            a strategic revenue engine — not an afterthought.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2"
          >
            <div className="w-[1px] h-20 bg-gradient-to-b from-brand-teal to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: OUR STORY */}
      <section className="py-24 bg-brand-section/30 relative z-10 border-t border-brand-border/30">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest px-2 py-1 bg-brand-teal/10 rounded inline-block">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-2">We've Sat in Your Chair</h2>
            
            <div className="space-y-6 text-brand-text leading-relaxed text-lg font-light">
              <p>SponsrBridge was born from frustration — the kind that only comes from years spent inside the B2B conference industry.</p>
              
              <p>Before founding SponsrBridge, our partners spent over a decade on the front lines of conference sponsorship. We built sponsor programmes from scratch. We chased renewals while managing a dozen other priorities. We watched promising events underperform commercially — not because the product was weak, but because sponsorship never got the dedicated attention it deserved.</p>
              
              <p>We saw the same patterns repeat across the industry: talented event teams stretched too thin, sponsorship treated as a side function, and millions in potential revenue left on the table year after year.</p>
              
              <p>And we saw how the existing solutions failed. Agencies that sold inventory without understanding the event. Consultants who delivered strategies but disappeared before execution. Sales teams incentivised to close deals rather than build lasting sponsor relationships.</p>

              <p>We knew there had to be a better model — one that gave conference organisers true commercial partnership, not just another vendor relationship.</p>
              
              <p className="text-2xl font-bold text-brand-teal pt-4 italic">So in 2025, we built it.</p>
              
              <p className="font-medium text-brand-white">SponsrBridge exists to be the sponsorship team that conference organisers deserve: embedded, accountable, and genuinely invested in mutual success. We win when you win. It's that simple.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full min-h-[500px] bg-brand-navy rounded-2xl border border-brand-border overflow-hidden flex items-center justify-center p-8 shadow-2xl"
          >
             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(20,88,151,0.05)_25%,transparent_25%,transparent_50%,rgba(20,88,151,0.05)_50%,rgba(20,88,151,0.05)_75%,transparent_75%,transparent)] bg-[size:20px_20px]" />
             
             {/* Dynamic Construction Visual */}
             <div className="relative z-10 w-full max-w-sm aspect-square flex items-end justify-center pb-10">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "60%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-16 bg-brand-navy border border-brand-teal/50 mx-1 relative rounded-t-sm shadow-[0_0_15px_rgba(121,243,222,0.1)]"
                >
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-brand-teal/30 flex items-center justify-center">
                      <Zap size={12} className="text-brand-teal" />
                   </div>
                </motion.div>
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "85%" }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                  className="w-20 bg-brand-navy border border-brand-teal mx-1 relative rounded-t-sm z-10 shadow-[0_0_25px_rgba(121,243,222,0.2)]"
                >
                   <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-teal text-brand-navy flex items-center justify-center shadow-lg">
                      <Briefcase size={20} />
                   </div>
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full text-center">
                      <p className="text-[10px] text-brand-teal uppercase tracking-wider font-bold">Partner</p>
                   </div>
                </motion.div>
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "40%" }}
                  transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                  className="w-16 bg-brand-navy border border-brand-teal/50 mx-1 relative rounded-t-sm shadow-[0_0_15px_rgba(121,243,222,0.1)]"
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-brand-teal/30 flex items-center justify-center">
                      <Users size={12} className="text-brand-teal" />
                   </div>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE BELIEVE */}
      <section className="py-24 bg-brand-navy relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-white mb-6">Principles That Guide Everything We Do</h2>
            <p className="text-brand-text text-lg">We didn't just build a different service model. We built SponsrBridge around a set of beliefs about how sponsorship should work.</p>
          </div>

          <div className="space-y-12">
            {beliefs.map((belief, i) => (
              <PhilosophyItem key={i} belief={belief} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: THE SPONSRBRIDGE DIFFERENCE */}
      <section id="our-difference" className="py-24 bg-brand-section/50 relative z-10 border-y border-brand-border/30 scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2 block">Why We're Different</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-white mb-6">Not an Agency. Not a Consultant.<br />A Commercial Partner.</h2>
            <p className="text-brand-text mb-8">Traditional sponsorship support models are broken. Here's how SponsrBridge is different.</p>
            
            {/* Toggle */}
            <div className="inline-flex bg-brand-navy p-1 rounded-full border border-brand-border mb-12 relative">
               <motion.div 
                 className="absolute h-[calc(100%-8px)] top-1 rounded-full bg-brand-teal"
                 initial={false}
                 animate={{ 
                   left: activeDiff === 'traditional' ? '4px' : '50%', 
                   width: activeDiff === 'traditional' ? 'calc(50% - 4px)' : 'calc(50% - 4px)',
                   x: activeDiff === 'sponsrbridge' ? 0 : 0
                 }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
               />
               <button 
                 onClick={() => setActiveDiff('traditional')}
                 className={`px-6 py-3 rounded-full text-sm font-bold transition-colors relative z-10 ${activeDiff === 'traditional' ? 'text-brand-navy' : 'text-brand-muted hover:text-brand-white'}`}
               >
                 The Old Way
               </button>
               <button 
                 onClick={() => setActiveDiff('sponsrbridge')}
                 className={`px-6 py-3 rounded-full text-sm font-bold transition-colors relative z-10 ${activeDiff === 'sponsrbridge' ? 'text-brand-navy' : 'text-brand-muted hover:text-brand-white'}`}
               >
                 The SponsrBridge Way
               </button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto min-h-[400px]">
             <AnimatePresence mode="wait">
                {activeDiff === 'traditional' ? (
                   <motion.div 
                     key="traditional"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     transition={{ duration: 0.3 }}
                     className="grid md:grid-cols-2 gap-8"
                   >
                      <div className="bg-brand-card p-8 rounded-2xl border border-brand-border opacity-75 hover:opacity-100 transition-opacity">
                         <div className="flex items-center gap-3 mb-6 border-b border-brand-border pb-4">
                            <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center border border-brand-border">
                               <Briefcase size={20} className="text-brand-muted" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-white">Traditional Agencies</h3>
                         </div>
                         <ul className="space-y-4">
                            {[
                                "Sell sponsorship inventory without deep event knowledge",
                                "Incentivised by commission on any deal, not quality",
                                "Limited accountability after contract signature",
                                "Rotating account managers with no continuity"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-brand-muted">
                                   <XCircle size={18} className="mt-1 flex-shrink-0 text-red-500/50" />
                                   <span>{item}</span>
                                </li>
                            ))}
                         </ul>
                      </div>
                      
                      <div className="bg-brand-card p-8 rounded-2xl border border-brand-border opacity-75 hover:opacity-100 transition-opacity">
                         <div className="flex items-center gap-3 mb-6 border-b border-brand-border pb-4">
                            <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center border border-brand-border">
                               <Layers size={20} className="text-brand-muted" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-white">Traditional Consultants</h3>
                         </div>
                         <ul className="space-y-4">
                            {[
                                "Deliver strategy documents then exit",
                                "No accountability for execution or results",
                                "Charge for time regardless of outcomes",
                                "Leave implementation to overstretched internal teams"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-brand-muted">
                                   <XCircle size={18} className="mt-1 flex-shrink-0 text-red-500/50" />
                                   <span>{item}</span>
                                </li>
                            ))}
                         </ul>
                      </div>
                   </motion.div>
                ) : (
                   <motion.div 
                     key="sponsrbridge"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     transition={{ duration: 0.3 }}
                     className="bg-brand-navy p-10 md:p-16 rounded-3xl border border-brand-teal shadow-[0_0_50px_rgba(121,243,222,0.1)] relative overflow-hidden"
                   >
                      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 blur-[100px] rounded-full pointer-events-none" />
                      
                      <div className="grid md:grid-cols-2 gap-12 relative z-10">
                         <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-brand-teal text-brand-navy rounded-xl flex items-center justify-center shadow-lg">
                                   <Zap size={28} className="fill-current" />
                                </div>
                                <div>
                                   <h3 className="text-2xl font-bold text-brand-white">SponsrBridge</h3>
                                   <p className="text-brand-teal text-sm font-bold uppercase tracking-wider">The Partner Model</p>
                                </div>
                            </div>
                            
                            <ul className="space-y-6">
                                {[
                                    "Deeply embedded in your conference strategy and positioning",
                                    "Performance-aligned commercial model tied to revenue outcomes",
                                    "End-to-end ownership from strategy through renewal",
                                    "Dedicated commercial lead for long-term partnership",
                                    "Strategy AND execution under single ownership"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1 bg-brand-teal/20 p-1 rounded-full">
                                            <CheckCircle2 size={16} className="text-brand-teal" />
                                        </div>
                                        <span className="text-brand-white font-medium text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                         </div>
                         
                         <div className="flex flex-col justify-center items-center text-center bg-brand-card/50 p-8 rounded-2xl border border-brand-border backdrop-blur-sm">
                             <Award className="w-16 h-16 text-brand-teal mb-6" />
                             <p className="text-2xl font-bold text-brand-white mb-8 italic leading-relaxed">
                                "We built SponsrBridge to be the partner we wished existed when we were in your position."
                             </p>
                             <button 
                                onClick={() => onNavigate('contact')}
                                className="bg-brand-teal text-brand-navy px-8 py-4 rounded-xl font-bold hover:bg-white transition-all shadow-lg text-lg w-full md:w-auto"
                             >
                                 Partner With Us
                             </button>
                         </div>
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR EXPERTISE */}
      <section className="py-24 bg-brand-navy relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
             <div className="space-y-6">
                <span className="text-brand-teal text-xs font-bold uppercase tracking-widest px-2 py-1 bg-brand-teal/10 rounded inline-block">Our Expertise</span>
                <h2 className="text-3xl md:text-5xl font-bold text-brand-white mb-6">Decades of Experience.<br />One Focused Mission.</h2>
                <p className="text-brand-text text-lg leading-relaxed">
                   Our founding team brings deep, hands-on experience from across the B2B conference industry — not as observers, but as practitioners who have built, sold, and scaled sponsorship programmes globally.
                </p>
                <div className="space-y-4 pt-4">
                   {[
                      "Leading sponsorship sales for international conference portfolios",
                      "Building commercial strategies across tech, finance, and healthcare",
                      "Managing sponsor relationships with Fortune 500 companies",
                      "Scaling sponsorship revenue from launch through market leadership"
                   ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                         <ArrowRight size={18} className="text-brand-teal mt-1 flex-shrink-0" />
                         <span className="text-brand-muted">{item}</span>
                      </motion.div>
                   ))}
                </div>
             </div>
             
             {/* Stats Grid */}
             <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.15 }}
                     className="bg-brand-card border border-brand-border p-6 rounded-2xl flex flex-col justify-center items-center text-center hover:border-brand-teal/50 transition-colors shadow-lg"
                   >
                      <Counter from={0} to={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                      <p className="text-xs font-bold text-brand-muted uppercase tracking-wider mt-2">{stat.label}</p>
                   </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR VALUES */}
      <section className="py-24 bg-brand-section/50 relative z-10 border-t border-brand-border/30">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
              <span className="text-brand-teal text-xs font-bold uppercase tracking-widest px-2 py-1 bg-brand-teal/10 rounded inline-block mb-4">Our Values</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-white mb-6">How We Work</h2>
              <p className="text-brand-text text-lg max-w-2xl mx-auto">These aren't just words on a wall. They're the standards we hold ourselves to in every engagement.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
              {values.slice(0, 3).map((val, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.15 }}
                   className="bg-brand-card border border-brand-border p-8 rounded-2xl hover:border-brand-teal transition-all group hover:-translate-y-2 duration-300"
                 >
                    <div className="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center border border-brand-border group-hover:bg-brand-teal group-hover:text-brand-navy transition-all mb-6">
                       <val.icon size={24} className="text-brand-teal group-hover:text-brand-navy transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-white mb-4">{val.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{val.desc}</p>
                 </motion.div>
              ))}
           </div>
           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {values.slice(3, 5).map((val, i) => (
                 <motion.div 
                   key={i+3}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: (i+3) * 0.15 }}
                   className="bg-brand-card border border-brand-border p-8 rounded-2xl hover:border-brand-teal transition-all group hover:-translate-y-2 duration-300"
                 >
                    <div className="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center border border-brand-border group-hover:bg-brand-teal group-hover:text-brand-navy transition-all mb-6">
                       <val.icon size={24} className="text-brand-teal group-hover:text-brand-navy transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-white mb-4">{val.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{val.desc}</p>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* SECTION 7: GLOBAL REACH */}
      <section className="py-24 bg-brand-navy relative overflow-hidden z-10">
         <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
               <span className="text-brand-teal text-xs font-bold uppercase tracking-widest px-2 py-1 bg-brand-teal/10 rounded inline-block mb-4">Global Reach</span>
               <h2 className="text-3xl md:text-5xl font-bold text-brand-white mb-6">Wherever Your Conference Operates, We're Ready</h2>
               <p className="text-brand-text text-lg mb-8 leading-relaxed">
                  SponsrBridge partners with B2B conference organisers across the world's major business markets. Our team brings regional expertise and sponsor relationships across:
               </p>
               <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                     "North America", "Europe & United Kingdom", "Asia-Pacific", "Middle East & Africa"
                  ].map((region, i) => (
                     <div key={i} className="flex items-center gap-3 p-3 bg-brand-card border border-brand-border rounded-lg">
                        <Globe size={18} className="text-brand-teal" />
                        <span className="text-brand-white font-medium text-sm">{region}</span>
                     </div>
                  ))}
               </div>
               <p className="text-brand-muted text-sm italic border-l-2 border-brand-teal pl-4">
                  We understand that sponsorship dynamics vary by market — budget cycles, decision-making structures, and relationship expectations differ across regions. Our approach adapts to local realities while maintaining consistent commercial standards.
               </p>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative h-[400px]"
            >
               <WorldMapVisual />
            </motion.div>
         </div>
      </section>

      {/* SECTION 8: CLOSING CTA */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-teal text-brand-navy relative z-10">
         <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Build a Sponsorship Engine That Actually Works?</h2>
            <p className="text-xl font-medium mb-10 opacity-90 leading-relaxed max-w-2xl mx-auto">
               Let's start with a conversation. No pitch decks, no pressure — just a practical discussion about your conference, your sponsorship challenges, and whether SponsrBridge is the right fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                    onClick={() => onNavigate('contact')}
                    className="px-10 py-5 bg-brand-navy text-brand-teal font-bold rounded-xl text-lg shadow-2xl hover:scale-105 transition-transform"
                >
                    Book a Strategy Call
                </button>
                <button 
                    onClick={() => onNavigate('services')}
                    className="px-10 py-5 bg-transparent border-2 border-brand-navy text-brand-navy font-bold rounded-xl text-lg hover:bg-brand-navy/10 transition-colors flex items-center gap-2"
                >
                    See How We Work <ChevronRight size={20} />
                </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default AboutPage;
