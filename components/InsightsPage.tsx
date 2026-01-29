
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLenis } from './SmoothScroll';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Calendar, ChevronRight, Mail, CheckCircle2, Loader2, Tag, BookOpen } from 'lucide-react';
import { getFeaturedPost, getPosts, getPostCount } from '../lib/queries';

// --- VISUALS ---

const AbstractHeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-brand-navy" />
    <motion.div
      animate={{
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/10 blur-[120px] rounded-full mix-blend-screen"
    />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--accent-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--accent-rgb),0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
  </div>
);

// --- FALLBACK DATA ---

const fallbackFeaturedArticle = {
  title: "The Death of the Gold-Silver-Bronze Model: Why Tiered Sponsorship Packages Are Failing Modern B2B Events",
  excerpt: "For decades, conference organisers have relied on the familiar Gold-Silver-Bronze sponsorship model. It's easy to understand, simple to sell, and universally recognised. But in today's B2B landscape, this legacy approach is leaving significant revenue on the table — and sophisticated sponsors know it. Here's why outcome-led sponsorship design is replacing tiered packages.",
  tag: "Sponsorship Strategy",
  date: "January 15, 2025",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
  slug: "death-of-gold-silver-bronze-model"
};

const fallbackArticles = [
  {
    title: "5 Signs Your Conference Is Under-Monetising Its Sponsor Potential",
    excerpt: "Strong attendance, quality content, senior audience — yet sponsorship revenue stays flat year after year. Here are the five warning signs that your commercial model needs a rethink.",
    tag: "Revenue Strategy",
    date: "January 8, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800",
    slug: "5-signs-under-monetising-sponsor-potential"
  },
  // {
  //   title: "The Sponsor's Perspective: What B2B Buyers Actually Want From Conference Partnerships",
  //   excerpt: "We interviewed 30 marketing directors responsible for B2B event sponsorship budgets. Their answers reveal a significant gap between what organisers offer and what sponsors actually value.",
  //   tag: "Market Research",
  //   date: "December 18, 2024",
  //   readTime: "10 min read",
  //   image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
  // },
  // {
  //   title: "Building a 12-Month Sponsorship Sales Calendar: When to Start, What to Prioritise",
  //   excerpt: "Timing is everything in sponsorship sales. Start too late and you're competing for leftover budget. This tactical guide maps out the ideal sponsorship sales timeline aligned with corporate budget cycles.",
  //   tag: "Sales Tactics",
  //   date: "December 5, 2024",
  //   readTime: "7 min read",
  //   image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800"
  // },
  // {
  //   title: "From One-Time Buyer to Multi-Year Partner: The Art of Sponsor Retention",
  //   excerpt: "Acquiring a new sponsor costs 5–7x more than retaining an existing one. Yet most organisers invest heavily in new business while neglecting renewals. Learn the frameworks that turn first-time sponsors into long-term partners.",
  //   tag: "Relationship Management",
  //   date: "November 22, 2024",
  //   readTime: "9 min read",
  //   image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800"
  // },
  // {
  //   title: "Pricing Sponsorship: How to Set Rates That Maximise Revenue Without Leaving Deals Behind",
  //   excerpt: "Price too high and you lose deals. Price too low and you leave money on the table. This guide breaks down the value-based pricing methodology that helps organisers find the optimal price point.",
  //   tag: "Pricing Strategy",
  //   date: "November 10, 2024",
  //   readTime: "8 min read",
  //   image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
  // },
  // {
  //   title: "The ROI Conversation: Proving Sponsor Value in a Data-Driven World",
  //   excerpt: "Modern sponsors expect measurable outcomes, not just logo visibility. This article outlines practical approaches to quantifying sponsor ROI and building the data infrastructure to support renewal conversations.",
  //   tag: "Measurement & ROI",
  //   date: "October 28, 2024",
  //   readTime: "11 min read",
  //   image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  // }
];

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

// --- SKELETON LOADER ---

const ArticleSkeleton = () => (
  <div className="flex flex-col bg-brand-card rounded-xl border border-brand-border h-full animate-pulse">
    <div className="h-56 bg-brand-border/30 rounded-t-xl" />
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-4 w-24 bg-brand-border/30 rounded mb-4" />
      <div className="h-6 w-full bg-brand-border/30 rounded mb-2" />
      <div className="h-6 w-3/4 bg-brand-border/30 rounded mb-3" />
      <div className="h-4 w-full bg-brand-border/30 rounded mb-2" />
      <div className="h-4 w-5/6 bg-brand-border/30 rounded mb-6" />
      <div className="mt-auto pt-4 border-t border-brand-border/50 flex justify-between">
        <div className="h-3 w-20 bg-brand-border/30 rounded" />
        <div className="h-3 w-16 bg-brand-border/30 rounded" />
      </div>
    </div>
  </div>
);

const InsightsPage: React.FC = () => {
  const navigate = useNavigate();
  const lenis = useLenis();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(fallbackFeaturedArticle);
  const [articles, setArticles] = useState(fallbackArticles);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [featuredData, articlesData, count] = await Promise.all([
          getFeaturedPost(),
          getPosts(6, 0),
          getPostCount(),
        ]);

        if (featuredData) {
          setFeatured({
            title: featuredData.title,
            excerpt: featuredData.excerpt,
            tag: featuredData.tag,
            date: formatDate(featuredData.date),
            readTime: featuredData.readTime || '5 min read',
            image: featuredData.image || fallbackFeaturedArticle.image,
            slug: featuredData.slug?.current || '',
          });
        }

        if (articlesData && articlesData.length > 0) {
          setArticles(
            articlesData.map((a: any) => ({
              title: a.title,
              excerpt: a.excerpt,
              tag: a.tag,
              date: formatDate(a.date),
              readTime: a.readTime || '5 min read',
              image: a.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
              slug: a.slug?.current || '',
            }))
          );
          setTotalCount(count || 0);
          if (articlesData.length >= (count || 0)) {
            setAllLoaded(true);
          }
        }
      } catch (err) {
        // Fallback to hardcoded data - already set as defaults
        console.warn('Sanity fetch failed, using fallback data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const moreArticles = await getPosts(6, articles.length);
      if (moreArticles && moreArticles.length > 0) {
        const mapped = moreArticles.map((a: any) => ({
          title: a.title,
          excerpt: a.excerpt,
          tag: a.tag,
          date: formatDate(a.date),
          readTime: a.readTime || '5 min read',
          image: a.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
          slug: a.slug?.current || '',
        }));
        setArticles((prev) => [...prev, ...mapped]);
        if (articles.length + moreArticles.length >= totalCount) {
          setAllLoaded(true);
        }
      } else {
        setAllLoaded(true);
      }
    } catch {
      setAllLoaded(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const scrollToSubscribe = () => {
    if (lenis) {
      lenis.scrollTo('#newsletter');
    } else {
      const el = document.getElementById('newsletter');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-brand-navy font-sans text-brand-text">

      {/* SECTION 1: PAGE HERO */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <AbstractHeroBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-brand-white mb-6">
              Insights & <span className="text-brand-teal">Perspectives</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-text max-w-2xl mx-auto leading-relaxed font-light">
              Practical strategies, market intelligence, and expert perspectives on building predictable sponsorship revenue for B2B conferences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURED ARTICLE */}
      <section className="py-12 md:py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-4 bg-brand-teal rounded-full" />
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">Latest Article</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => featured.slug ? navigate(`/insights/${featured.slug}`) : scrollToSubscribe()}
            className="group relative bg-brand-card rounded-2xl overflow-hidden border border-brand-border hover:border-brand-teal/50 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${featured.image})` }}
                />
                <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-brand-teal/10 text-brand-teal text-xs font-bold rounded-full border border-brand-teal/20">
                    {featured.tag}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-brand-muted font-medium">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {featured.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-brand-white mb-4 leading-tight group-hover:text-brand-teal transition-colors">
                  {featured.title}
                </h2>

                <p className="text-brand-text mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                  {featured.excerpt}
                </p>

                <div className="flex items-center text-brand-teal font-bold text-sm uppercase tracking-wide group/btn mt-auto">
                  Read Article <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: ARTICLE GRID */}
      <section className="py-12 md:py-16 bg-brand-navy relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-1 h-4 bg-brand-teal rounded-full" />
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">More Insights</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <ArticleSkeleton key={i} />)
            ) : (
              articles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => article.slug ? navigate(`/insights/${article.slug}`) : scrollToSubscribe()}
                  className="group flex flex-col bg-brand-card rounded-xl border border-brand-border hover:border-brand-teal/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                >
                  <div className="h-56 overflow-hidden rounded-t-xl relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${article.image})` }}
                    />
                    <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-brand-teal bg-brand-teal/10 px-2 py-1 rounded">
                        {article.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-white mb-3 line-clamp-2 group-hover:text-brand-teal transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-sm text-brand-muted mb-6 line-clamp-3 leading-relaxed flex-grow">
                      {article.excerpt}
                    </p>

                    <div className="pt-4 border-t border-brand-border/50 flex items-center justify-between text-xs text-brand-muted mt-auto">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1"><BookOpen size={12} /> {article.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* SECTION 4: LOAD MORE */}
          <div className="text-center">
            {!allLoaded ? (
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 px-8 py-4 border border-brand-teal text-brand-teal font-bold rounded-lg hover:bg-brand-teal/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? <Loader2 className="animate-spin" size={20} /> : 'Load More Articles'}
              </button>
            ) : (
              <p className="text-brand-muted italic">You've reached the end of the list.</p>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: NEWSLETTER */}
      <section id="newsletter" className="py-24 bg-gradient-to-r from-brand-blue/10 to-brand-teal/5 relative z-10 border-y border-brand-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="bg-brand-card/50 backdrop-blur-sm border border-brand-border rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-brand-white mb-4">Get Insights Delivered</h2>
                <p className="text-brand-text text-lg mb-6 leading-relaxed">
                  Join conference organisers who receive our latest thinking on sponsorship strategy, market trends, and revenue optimisation — delivered straight to your inbox.
                </p>
                <div className="flex items-center gap-2 text-sm text-brand-muted">
                  <CheckCircle2 size={16} className="text-brand-teal" /> No spam, ever. Unsubscribe anytime.
                </div>
              </div>

              <div className="bg-brand-navy p-8 rounded-xl border border-brand-border shadow-lg">
                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <CheckCircle2 size={48} className="text-brand-teal mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-brand-white mb-2">You're Subscribed!</h3>
                    <p className="text-brand-muted">Thanks for subscribing. Look out for our next insight in your inbox.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-3 text-brand-white focus:border-brand-teal focus:outline-none transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <button className="w-full bg-brand-teal text-brand-navy font-bold py-3 rounded-lg hover:bg-brand-accent-hover transition-colors">
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: RELATED CTA */}
      <section className="py-24 bg-brand-navy relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-6">Ready to Put These Insights Into Action?</h2>
          <p className="text-xl text-brand-muted mb-10 leading-relaxed">
            If you're looking to transform your conference's sponsorship performance, let's talk. We help organisers turn strategy into revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-brand-teal text-brand-navy font-bold rounded-lg hover:bg-brand-accent-hover transition-colors"
            >
              Book a Discovery Call
            </button>
            <button
              onClick={() => navigate('/services')}
              className="px-8 py-4 border border-brand-teal text-brand-teal font-bold rounded-lg hover:bg-brand-teal/10 transition-colors"
            >
              Explore Our Services
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default InsightsPage;
