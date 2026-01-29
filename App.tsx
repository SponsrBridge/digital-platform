
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { ChallengesSection, WhatWeDoSection, ProcessSection, WhyUsSection } from './components/Features';
import { IndustriesSection, ModelsSection } from './components/Market';
import { InsightsSection, FAQSection } from './components/Resources';
import ContactSection from './components/Contact';
import Footer from './components/Footer';
import AboutPage from './components/About';
import ServicesPage from './components/Services';
import ContactPage from './components/ContactPage';
import FAQPage from './components/FAQPage';
import InsightsPage from './components/InsightsPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import BlogPostPage from './components/BlogPostPage';
import LiveChat from './components/LiveChat';
import { SmoothScrollProvider, useLenis } from './components/SmoothScroll';

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <ChallengesSection />
      <WhatWeDoSection />
      <ProcessSection />
      <WhyUsSection />
      <IndustriesSection />
      <ModelsSection />
      <InsightsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}

function AppContent() {
  return (
    <main className="font-body bg-brand-navy min-h-screen text-brand-text overflow-x-hidden">
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<BlogPostPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>

      <Footer />

      {/* Real-time AI Assistant */}
      <LiveChat />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <AppContent />
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

export default App;
