
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StepItem {
  id: number;
  title: string;
  purpose: string;
  items: string[];
  deliverable: string;
}

export interface IndustryInsight {
  label: string;
  value: string;
  type: 'stat' | 'news';
}

export interface IndustryCard {
  name: string;
  sub: string;
  icon: LucideIcon;
  image: string;
  insights: IndustryInsight[];
}

export interface ModelCard {
  title: string;
  description: string;
  bestFor: string;
}

export interface Article {
  _id?: string;
  title: string;
  slug?: { current: string };
  excerpt: string;
  tag?: string;
  date?: string;
  readTime: string;
  image: string;
  author?: string;
  isFeatured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
