
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Globe } from 'lucide-react';
import BookingFlow from './BookingFlow';

const ContactSection: React.FC = () => {
  const USER_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-brand-navy to-brand-section transition-colors duration-300 min-h-[900px] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-brand-white mb-6">Start a Commercial Conversation About Your Conference Revenue</h2>
            <p className="text-lg text-brand-text mb-8 leading-relaxed">Every engagement begins with a structured 45-minute consultation. We'll assess your current model, identify revenue leakage, and map out a growth architecture.</p>
            <div className="bg-brand-card p-8 rounded-xl border border-brand-border mb-8">
              <h3 className="text-xl font-bold text-brand-white mb-4">Engagement Protocol:</h3>
              <ul className="space-y-4">
                {["45-minute strategy call with a senior partner", "Revenue leakage diagnostic for your event", "Alignment on commercial models", "Instant calendar invite confirmation"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-muted"><CheckCircle2 className="text-brand-teal w-5 h-5 mt-0.5" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4 text-sm text-brand-muted bg-brand-navy/40 p-4 rounded-lg border border-brand-border/50">
              <Globe className="text-brand-teal animate-pulse" size={20} />
              <p>Working Hours: <span className="text-brand-white font-bold">UK 08:00 - 20:00</span>. Slots shown in your local time: <span className="text-brand-teal font-medium">{USER_TZ}</span>.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <BookingFlow />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
