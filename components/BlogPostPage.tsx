
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, User } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { getPostBySlug } from '../lib/queries';
import { urlFor } from '../lib/sanity';

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl md:text-4xl font-bold text-brand-white mt-12 mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-bold text-brand-white mt-10 mb-5">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl md:text-2xl font-bold text-brand-white mt-8 mb-4">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold text-brand-white mt-6 mb-3">{children}</h4>,
    normal: ({ children }: any) => <p className="text-brand-text text-lg leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-brand-teal pl-6 py-2 my-8 text-brand-text italic text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="text-brand-white font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-brand-teal underline hover:text-brand-white transition-colors">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 mb-6 text-brand-text text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 mb-6 text-brand-text text-lg">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value);
      if (!imageUrl) return null;
      return (
        <figure className="my-8">
          <img
            src={imageUrl.width(1200).url()}
            alt={value.alt || ''}
            className="w-full rounded-xl border border-brand-border"
          />
          {value.caption && (
            <figcaption className="text-sm text-brand-muted mt-3 text-center italic">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

const PostSkeleton = () => (
  <div className="pt-20 min-h-screen bg-brand-navy animate-pulse">
    <div className="container mx-auto px-4 sm:px-6 lg:px-24 max-w-4xl py-16">
      <div className="h-4 w-24 bg-brand-border/30 rounded mb-8" />
      <div className="h-4 w-32 bg-brand-border/30 rounded mb-6" />
      <div className="h-10 w-full bg-brand-border/30 rounded mb-4" />
      <div className="h-10 w-3/4 bg-brand-border/30 rounded mb-8" />
      <div className="flex gap-4 mb-8">
        <div className="h-4 w-32 bg-brand-border/30 rounded" />
        <div className="h-4 w-24 bg-brand-border/30 rounded" />
      </div>
      <div className="h-80 w-full bg-brand-border/30 rounded-xl mb-12" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-5 w-full bg-brand-border/30 rounded" />
        ))}
      </div>
    </div>
  </div>
);

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const data = await getPostBySlug(slug);
        if (data) {
          setPost(data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) return <PostSkeleton />;

  if (notFound) {
    return (
      <div className="pt-20 min-h-screen bg-brand-navy flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-24">
          <h1 className="text-4xl font-bold text-brand-white mb-4">Article Not Found</h1>
          <p className="text-brand-muted mb-8 text-lg">The article you're looking for doesn't exist or has been moved.</p>
          <button
            onClick={() => navigate('/insights')}
            className="px-8 py-4 bg-brand-teal text-brand-navy font-bold rounded-lg hover:bg-brand-accent-hover transition-colors"
          >
            Back to Insights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-brand-navy font-sans">
      {/* Back Link */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 max-w-4xl pt-8">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/insights')}
          className="flex items-center gap-2 text-brand-muted hover:text-brand-teal transition-colors text-sm font-medium mb-8"
        >
          <ArrowLeft size={16} /> Back to Insights
        </motion.button>
      </div>

      {/* Article Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 sm:px-6 lg:px-24 max-w-4xl pb-8"
      >
        {post.tag && (
          <span className="inline-block px-3 py-1 bg-brand-teal/10 text-brand-teal text-xs font-bold rounded-full border border-brand-teal/20 mb-6">
            {post.tag}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-6 leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-brand-text leading-relaxed mb-6 font-light">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-6 text-sm text-brand-muted border-b border-brand-border pb-8">
          {post.author && (
            <span className="flex items-center gap-2">
              <User size={14} className="text-brand-teal" /> {post.author}
            </span>
          )}
          {post.date && (
            <span className="flex items-center gap-2">
              <Calendar size={14} /> {formatDate(post.date)}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-2">
              <Clock size={14} /> {post.readTime}
            </span>
          )}
        </div>
      </motion.header>

      {/* Featured Image */}
      {post.image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container mx-auto px-4 sm:px-6 lg:px-24 max-w-4xl mb-12"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-xl border border-brand-border object-cover max-h-[500px]"
          />
        </motion.div>
      )}

      {/* Article Body */}
      {post.body && (
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="container mx-auto px-4 sm:px-6 lg:px-24 max-w-4xl pb-16"
        >
          <PortableText value={post.body} components={portableTextComponents} />
        </motion.article>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-brand-section border-t border-brand-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-white mb-4">Ready to Put These Insights Into Action?</h2>
          <p className="text-brand-muted text-lg mb-8">
            Let's discuss how SponsrBridge can help transform your conference's sponsorship revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-brand-teal text-brand-navy font-bold rounded-lg hover:bg-brand-accent-hover transition-colors"
            >
              Book a Discovery Call
            </button>
            <button
              onClick={() => navigate('/insights')}
              className="px-8 py-4 border border-brand-teal text-brand-teal font-bold rounded-lg hover:bg-brand-teal/10 transition-colors"
            >
              More Insights
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
