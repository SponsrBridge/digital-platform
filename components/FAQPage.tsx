
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight, HelpCircle, MessageCircle, Mail } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'contact' | 'faq' | 'insights' | 'privacy' | 'terms') => void;
}

const AbstractBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div 
      animate={{ 
        scale: [1, 1.25, 1],
        rotate: [0, 90, 0],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute top-[15%] left-[10%] w-[40%] h-[40%] bg-brand-teal/5 blur-[120px] rounded-full"
    />
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        rotate: [0, -90, 0],
      }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[15%] right-[10%] w-[35%] h-[35%] bg-brand-blue/5 blur-[120px] rounded-full"
    />
  </div>
);

const faqs: FAQItem[] = [
  { question: "How quickly can we expect to see results?", answer: "Most engagements begin generating sponsor conversations within 45–60 days, with a fully active pipeline established by 90 days. Meaningful revenue uplift is typically seen within the first 6 months." },
  { question: "What information do you need to get started?", answer: "We typically review historical sponsorship performance, attendee profile, and event timeline. The discovery phase usually requires 3–4 hours of your team's time over two weeks." },
  { question: "How do you charge for your services?", answer: "Full-service partnerships combine a performance-based fee (percentage of secured revenue) with a modest monthly retainer. Advisory engagements are retainer-based. All pricing is transparent with no hidden fees." },
  { question: "What makes SponsrBridge different from hiring internally?", answer: "We provide immediate access to a proven sales system, established sponsor relationships, and market intelligence. We mitigate key-person risk and operate with performance-aligned pricing." },
  { question: "What size conferences do you work with?", answer: "We typically work with B2B conferences ranging from 200 to 5,000 attendees, with annual sponsorship revenue potential between $100k and $2M." },
  { question: "How involved will we need to be?", answer: "Your involvement varies by model. Full-service requires minimal input beyond pipeline reviews. Sales partnerships need light weekly coordination." },
];

const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="bg-brand-navy min-h-screen pt-20 relative">
      <AbstractBackground />
      
      {/* Hero Section */}
      <section className="py-24 bg-brand-navy/50 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(121,243,222,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-teal text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Resources</span>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-white mb-6">
              Frequently Asked <span className="text-brand-teal">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-text max-w-2xl mx-auto leading-relaxed font-light">
              Clear answers about our services, process, and how we help conference organisers scale their sponsorship revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 bg-transparent relative z-10 border-y border-brand-border/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border transition-all duration-300 rounded-2xl overflow-hidden backdrop-blur-md ${
                  openIndex === index 
                    ? 'border-brand-teal bg-brand-navy shadow-[0_0_30px_rgba(121,243,222,0.05)]' 
                    : 'border-brand-border bg-brand-card/80 hover:border-brand-muted/50'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                  className="w-full flex justify-between items-center p-6 md:p-8 text-left transition-colors group"
                >
                  <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                    openIndex === index ? 'text-brand-teal' : 'text-brand-white'
                  }`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`flex-shrink-0 ml-4 transition-colors duration-300 ${
                      openIndex === index ? 'text-brand-teal' : 'text-brand-muted group-hover:text-brand-teal'
                    }`}
                  >
                    {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-brand-text leading-relaxed font-light text-lg border-t border-brand-border/30">
                        <motion.div
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="pt-6"
                        >
                          {faq.answer}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA Section */}
      <section className="py-24 bg-brand-navy/30 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl text-center">
            <h3 className="text-2xl font-bold text-brand-white mb-6">Still Have Questions?</h3>
            <p className="text-brand-text mb-10 max-w-xl mx-auto">Our team is ready to provide the specific answers you need about your conference context.</p>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-10 py-4 bg-brand-teal text-brand-navy font-bold rounded-xl hover:bg-white transition-all shadow-xl"
            >
              Book a Strategy Call
            </button>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
