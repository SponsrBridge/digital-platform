
import React, { useState, useEffect } from 'react';
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
import LiveChat from './components/LiveChat';

export type Page = 'home' | 'about' | 'services' | 'contact' | 'faq' | 'insights' | 'privacy' | 'terms';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Handle back-to-top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <main className="font-body bg-brand-navy min-h-screen text-brand-text">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      
      {currentPage === 'home' && (
        <>
          <Hero />
          <ChallengesSection />
          <WhatWeDoSection />
          <ProcessSection />
          <WhyUsSection />
          <IndustriesSection />
          <ModelsSection onNavigate={navigateTo} />
          <InsightsSection onNavigate={navigateTo} />
          <FAQSection />
          <ContactSection />
        </>
      )}

      {currentPage === 'about' && (
        <AboutPage onNavigate={navigateTo} />
      )}

      {currentPage === 'services' && (
        <ServicesPage onNavigate={navigateTo} />
      )}

      {currentPage === 'contact' && (
        <ContactPage onNavigate={navigateTo} />
      )}

      {currentPage === 'faq' && (
        <FAQPage onNavigate={navigateTo} />
      )}

      {currentPage === 'insights' && (
        <InsightsPage onNavigate={navigateTo} />
      )}

      {currentPage === 'privacy' && (
        <PrivacyPage onNavigate={navigateTo} />
      )}

      {currentPage === 'terms' && (
        <TermsPage onNavigate={navigateTo} />
      )}

      <Footer onNavigate={navigateTo} />
      
      {/* Real-time AI Assistant */}
      <LiveChat />
    </main>
  );
}

export default App;
