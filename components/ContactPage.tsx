
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, Send, CheckCircle2, Calendar, ArrowRight, Loader2, X, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react';
import BookingFlow from './BookingFlow';

const AbstractBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 20, 0],
        y: [0, -30, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[30%] -left-[5%] w-[40%] h-[40%] bg-brand-teal/5 blur-[120px] rounded-full"
    />
    <motion.div
      animate={{
        scale: [1.1, 1, 1.1],
        x: [0, -20, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[20%] -right-[5%] w-[35%] h-[35%] bg-brand-blue/5 blur-[120px] rounded-full"
    />
  </div>
);

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState('success');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-brand-navy min-h-screen pt-20 relative">
      <AbstractBackground />

      {/* SECTION 1: PAGE HERO */}
      <section className="min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden bg-brand-navy/50 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(var(--accent-rgb),0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-brand-white mb-6"
          >
            Let's Start a Conversation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-brand-text max-w-2xl mx-auto leading-relaxed"
          >
            Whether you're ready to discuss your conference's sponsorship potential or simply have a question, we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: CONTACT FORM & DETAILS */}
      <section className="py-24 bg-transparent relative z-10 border-t border-brand-border/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid lg:grid-cols-10 gap-8 lg:gap-16">
            {/* LEFT COLUMN: CONTACT DETAILS (40%) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="lg:col-span-4 space-y-12"
            >
              <div>
                <motion.h2 variants={itemVariants} className="text-3xl font-bold text-brand-white mb-6">Get in Touch</motion.h2>
                <motion.p variants={itemVariants} className="text-brand-text leading-relaxed font-light">
                  Have a question about our services? Interested in exploring how SponsrBridge can support your conference? Reach out directly or use the form — we typically respond within one business day.
                </motion.p>
              </div>

              <div className="space-y-6">
                <motion.a variants={itemVariants} href="mailto:hello@sponsrbridge.io" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-brand-card rounded-xl border border-brand-border flex items-center justify-center text-brand-teal group-hover:border-brand-teal group-hover:bg-brand-teal/5 transition-all shadow-lg">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-brand-white font-medium group-hover:text-brand-teal transition-colors">hello@sponsrbridge.io</p>
                  </div>
                </motion.a>

                <motion.a variants={itemVariants} href="tel:+13072131114" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-brand-card rounded-xl border border-brand-border flex items-center justify-center text-brand-teal group-hover:border-brand-teal group-hover:bg-brand-teal/5 transition-all shadow-lg">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-brand-white font-medium group-hover:text-brand-teal transition-colors">+1 (307) 213-1114</p>
                  </div>
                </motion.a>

                <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-brand-card rounded-xl border border-brand-border flex items-center justify-center text-brand-teal flex-shrink-0 shadow-lg">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">Office Location</p>
                    <p className="text-brand-white font-medium leading-relaxed">
                      SponsrBridge LLC<br />
                      1309 Coffeen Avenue STE 1200<br />
                      Sheridan, Wyoming 82801
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: CONTACT FORM (60%) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <div className="bg-brand-card p-8 md:p-12 rounded-3xl border border-brand-border shadow-2xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-teal border border-brand-teal/30 shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)]">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-3xl font-bold text-brand-white mb-4">Message Sent Successfully</h3>
                      <p className="text-brand-text mb-8 max-w-sm mx-auto">Thank you for reaching out. We've received your message and will be in touch within one business day.</p>
                      <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-brand-teal font-bold hover:underline">
                        Return to Homepage <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form">
                      <h3 className="text-2xl font-bold text-brand-white mb-8">Send Us a Message</h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">First Name *</label>
                            <input required type="text" className="w-full bg-brand-navy border border-brand-border rounded-xl px-4 py-3 text-brand-white focus:border-brand-teal focus:outline-none transition-colors" placeholder="First Name" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">Last Name *</label>
                            <input required type="text" className="w-full bg-brand-navy border border-brand-border rounded-xl px-4 py-3 text-brand-white focus:border-brand-teal focus:outline-none transition-colors" placeholder="Last Name" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">Message *</label>
                          <textarea required rows={4} className="w-full bg-brand-navy border border-brand-border rounded-xl px-4 py-3 text-brand-white focus:border-brand-teal focus:outline-none transition-colors resize-y" placeholder="Tell us about your conference and how we can help..."></textarea>
                        </div>
                        <button
                          disabled={formState === 'submitting'}
                          className="w-full bg-brand-teal text-brand-navy font-bold py-4 rounded-xl hover:brightness-90 transition-all flex items-center justify-center gap-2"
                        >
                          {formState === 'submitting' ? <Loader2 size={20} className="animate-spin" /> : 'Send Message'}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOCATION MAP SECTION */}
      <section className="py-24 bg-brand-section/30 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-brand-border bg-brand-navy relative shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.5!2d-106.9561!3d44.7977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1309+Coffeen+Avenue+STE+1200%2C+Sheridan%2C+WY+82801!5e0!3m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
