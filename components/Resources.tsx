
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, Send } from 'lucide-react';
import { Article, FAQItem } from '../types';
import { getLatestPosts } from '../lib/queries';

const fallbackArticles: Article[] = [
  { title: "Why Generic Sponsorship Packages Are Costing You Revenue", excerpt: "Stop selling logos. Start selling outcomes.", readTime: "5 min read", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" },
  { title: "The Global Conference Sponsorship Landscape: 2025 Trends", excerpt: "Data-driven insights into where budgets are shifting.", readTime: "8 min read", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600" },
  { title: "From Transactional to Strategic Relationships", excerpt: "Building a sponsorship model that compounds over time.", readTime: "6 min read", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600" },
];

const faqs: FAQItem[] = [
  { question: "How quickly can we expect to see results?", answer: "Most engagements begin generating sponsor conversations within 45–60 days, with a fully active pipeline established by 90 days. Meaningful revenue uplift is typically seen within the first 6 months." },
  { question: "What information do you need to get started?", answer: "We typically review historical sponsorship performance, attendee profile, and event timeline. The discovery phase usually requires 3–4 hours of your team's time over two weeks." },
  { question: "How do you charge for your services?", answer: "Full-service partnerships combine a performance-based fee (percentage of secured revenue) with a modest monthly retainer. Advisory engagements are retainer-based. All pricing is transparent with no hidden fees." },
  { question: "What makes SponsrBridge different from hiring internally?", answer: "We provide immediate access to a proven sales system, established sponsor relationships, and market intelligence. We mitigate key-person risk and operate with performance-aligned pricing." },
  { question: "What size conferences do you work with?", answer: "We typically work with B2B conferences ranging from 200 to 5,000 attendees, with annual sponsorship revenue potential between $100k and $2M." },
  { question: "How involved will we need to be?", answer: "Your involvement varies by model. Full-service requires minimal input beyond pipeline reviews. Sales partnerships need light weekly coordination." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const InsightsSection: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>(fallbackArticles);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const posts = await getLatestPosts(3);
        if (posts && posts.length > 0) {
          setArticles(
            posts.map((p: any) => ({
              title: p.title,
              excerpt: p.excerpt,
              readTime: p.readTime || '5 min read',
              image: p.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
            }))
          );
        }
      } catch {
        // Keep fallback
      }
    }
    fetchLatest();
  }, []);

  return (
    <section id="insights" className="py-24 bg-brand-navy transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-brand-white mb-2">Commercial Insights</h2>
            <p className="text-brand-muted">Practical analysis for conference organisers.</p>
          </motion.div>
          <button
            onClick={() => navigate('/insights')}
            className="hidden md:flex items-center text-brand-teal hover:text-brand-white transition-colors font-bold"
          >
            View All <ArrowRight size={16} className="ml-2" />
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {articles.map((article, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate('/insights')}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-xl mb-6 h-52 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="text-xs text-brand-teal mb-2 font-semibold uppercase tracking-wider">{article.readTime}</div>
              <h3 className="text-xl font-bold text-brand-white mb-3 group-hover:text-brand-teal transition-colors">{article.title}</h3>
              <p className="text-brand-muted text-sm line-clamp-2">{article.excerpt}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-brand-card border border-brand-border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-brand-white mb-2">Get insights delivered to your inbox</h3>
            <p className="text-brand-muted">Strategies to build predictable sponsorship revenue.</p>
          </div>
          <form className="flex w-full md:w-auto gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-brand-navy border border-brand-border text-brand-white px-4 py-3 rounded w-full md:w-80 focus:outline-none focus:border-brand-teal transition-colors placeholder-brand-muted"
            />
            <button className="bg-brand-teal text-brand-navy font-bold px-6 py-3 rounded-lg hover:bg-brand-accent-hover transition-colors">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="py-24 bg-brand-section transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-brand-white mb-12 text-center"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`border transition-all duration-300 rounded-lg overflow-hidden ${openIndex === index
                  ? 'border-brand-teal bg-brand-navy shadow-[0_0_20px_rgba(var(--accent-rgb),0.05)]'
                  : 'border-brand-border bg-brand-card'
                }`}
            >
              <button
                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-brand-section transition-colors group"
              >
                <span className={`text-lg font-semibold transition-colors duration-300 ${openIndex === index ? 'text-brand-teal' : 'text-brand-white'
                  }`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`flex-shrink-0 transition-colors duration-300 ${openIndex === index ? 'text-brand-teal' : 'text-brand-muted group-hover:text-brand-teal'
                    }`}
                >
                  {openIndex === index ? <Minus /> : <Plus />}
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
                    <div className="p-6 pt-0 text-brand-muted leading-relaxed border-t border-brand-border/30">
                      <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
