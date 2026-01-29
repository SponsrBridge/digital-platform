
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Scale, Gavel, AlertCircle } from 'lucide-react';
import { useLenis } from './SmoothScroll';

const sections = [
  { id: 'agreement', title: '1. Agreement to Terms' },
  { id: 'eligibility', title: '2. Eligibility' },
  { id: 'use', title: '3. Use of the Website' },
  { id: 'ip', title: '4. Intellectual Property' },
  { id: 'submissions', title: '5. User Submissions' },
  { id: 'warranties', title: '6. Disclaimer of Warranties' },
  { id: 'liability', title: '7. Limitation of Liability' },
  { id: 'indemnification', title: '8. Indemnification' },
  { id: 'third-party', title: '9. Third-Party Links' },
  { id: 'modifications', title: '10. Modifications' },
  { id: 'termination', title: '11. Termination' },
  { id: 'law', title: '12. Governing Law' },
  { id: 'dispute', title: '13. Dispute Resolution' },
  { id: 'misc', title: '14. Miscellaneous' },
  { id: 'contact', title: '15. Contact Information' },
];

const TermsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('agreement');
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -100 });
      setActiveSection(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setActiveSection(id);
      }
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-brand-navy font-sans text-brand-text">

      {/* Header */}
      <section className="py-16 bg-brand-section border-b border-brand-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-brand-white mb-4">Terms and Conditions</h1>
            <p className="text-brand-teal font-medium mb-2">Website Terms of Use</p>
            <p className="text-sm text-brand-muted">Last Updated: January 2025</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-24 py-12">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 relative items-start">

          {/* Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28 self-start">
            <div className="bg-brand-card border border-brand-border rounded-xl p-6 overflow-y-auto max-h-[calc(100vh-8rem)] shadow-xl">
              <h3 className="text-brand-white font-bold mb-4 flex items-center gap-2">
                <FileText size={18} className="text-brand-teal" /> Contents
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded transition-all duration-200 border-l-2 ${activeSection === section.id
                        ? 'border-brand-teal text-brand-teal bg-brand-teal/10 font-semibold'
                        : 'border-transparent text-brand-muted hover:text-brand-white hover:bg-brand-navy/50'
                      }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-16">

            {/* 1. Agreement */}
            <section id="agreement" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">1.</span> Agreement to Terms
              </h2>
              <div className="prose prose-invert max-w-none text-brand-text leading-relaxed space-y-4">
                <p>
                  These Terms and Conditions ("Terms," "Terms and Conditions") govern your access to and use of the website www.sponsrbridge.io (the "Website") operated by SponsrBridge LLC ("SponsrBridge," "Company," "we," "us," or "our"), a limited liability company registered in the State of Wyoming, United States.
                </p>
                <p>
                  By accessing or using our Website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of these Terms, you must not access or use our Website.
                </p>
                <div className="bg-brand-navy/50 p-4 border-l-4 border-brand-teal text-sm italic">
                  PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR WEBSITE. BY USING THE WEBSITE, YOU ACCEPT AND AGREE TO BE BOUND AND ABIDE BY THESE TERMS AND CONDITIONS.
                </div>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the Website. For the avoidance of doubt, any services provided by SponsrBridge under a separate written agreement (such as a consulting engagement or service agreement) are governed by the terms of that separate agreement, not these Website Terms and Conditions.
                </p>
                <div className="bg-brand-card p-4 rounded-lg border border-brand-border/50 text-sm">
                  <strong className="text-brand-white block mb-1">Company Information:</strong>
                  SponsrBridge LLC<br />
                  1309 Coffeen Avenue STE 1200<br />
                  Sheridan, Wyoming 82801<br />
                  United States<br />
                  Email: hello@sponsrbridge.io<br />
                  Phone: +1 (307) 213-1114
                </div>
              </div>
            </section>

            {/* 2. Eligibility */}
            <section id="eligibility" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">2.</span> Eligibility
              </h2>
              <p>By using this Website, you represent and warrant that:</p>
              <ul className="list-disc pl-5 space-y-2 text-brand-muted">
                <li>You are at least 18 years of age or the age of legal majority in your jurisdiction, whichever is higher;</li>
                <li>You have the legal capacity to enter into a binding agreement;</li>
                <li>You are not prohibited from using the Website under any applicable law;</li>
                <li>If you are accessing the Website on behalf of a company or organisation, you have the authority to bind that entity to these Terms.</li>
              </ul>
            </section>

            {/* 3. Use of the Website */}
            <section id="use" className="space-y-6 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">3.</span> Use of the Website
              </h2>

              <div>
                <h3 className="text-lg font-bold text-brand-white mb-2">3.1 Permitted Use</h3>
                <p className="text-brand-muted">You may use our Website for lawful purposes only and in accordance with these Terms. The Website is provided for informational purposes about SponsrBridge and our services, and to facilitate communication between you and SponsrBridge.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-white mb-2">3.2 Prohibited Use</h3>
                <p className="text-brand-muted mb-2">You agree not to use the Website:</p>
                <ul className="grid md:grid-cols-2 gap-4 text-sm text-brand-muted">
                  <li className="flex gap-2"><div className="min-w-1.5 h-1.5 bg-brand-teal rounded-full mt-2" /> In any way that violates any applicable federal, state, local, or international law.</li>
                  <li className="flex gap-2"><div className="min-w-1.5 h-1.5 bg-brand-teal rounded-full mt-2" /> To transmit unsolicited advertising ("spam").</li>
                  <li className="flex gap-2"><div className="min-w-1.5 h-1.5 bg-brand-teal rounded-full mt-2" /> To impersonate SponsrBridge or any other person.</li>
                  <li className="flex gap-2"><div className="min-w-1.5 h-1.5 bg-brand-teal rounded-full mt-2" /> To introduce viruses, worms, or malicious code.</li>
                  <li className="flex gap-2"><div className="min-w-1.5 h-1.5 bg-brand-teal rounded-full mt-2" /> To use robots, spiders, or scrapers without permission.</li>
                  <li className="flex gap-2"><div className="min-w-1.5 h-1.5 bg-brand-teal rounded-full mt-2" /> To attempt unauthorised access to our systems.</li>
                </ul>
              </div>
            </section>

            {/* 4. Intellectual Property */}
            <section id="ip" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">4.</span> Intellectual Property Rights
              </h2>
              <div className="bg-brand-card p-6 rounded-xl border border-brand-border">
                <h3 className="text-lg font-bold text-brand-white mb-3">4.1 Ownership</h3>
                <p className="text-brand-muted mb-4">The Website and its entire contents (software, text, images, design) are owned by SponsrBridge or its licensors and are protected by United States and international copyright, trademark, and IP laws.</p>

                <h3 className="text-lg font-bold text-brand-white mb-3">4.2 Limited Licence</h3>
                <p className="text-brand-muted mb-4">We grant you a limited, non-exclusive, revocable licence to access the Website for personal, non-commercial use. You must not resale, derivative use, or use data mining tools on our content.</p>

                <h3 className="text-lg font-bold text-brand-white mb-2">4.3 Trademarks</h3>
                <p className="text-brand-muted">The SponsrBridge name and logo are trademarks of SponsrBridge. You must not use such marks without prior written permission.</p>
              </div>
            </section>

            {/* 5. User Submissions */}
            <section id="submissions" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">5.</span> User Submissions
              </h2>
              <p className="text-brand-muted">Any information you submit through contact forms or interactive features ("User Submissions") is governed by our Privacy Policy.</p>
              <div className="space-y-3">
                <p className="text-sm font-bold text-brand-white">By submitting information, you represent that:</p>
                <ul className="list-disc pl-5 text-sm text-brand-muted">
                  <li>The information is accurate and not misleading.</li>
                  <li>You have the rights to submit the content.</li>
                  <li>The submission does not violate any third-party rights or laws.</li>
                </ul>
              </div>
            </section>

            {/* 6. Warranties */}
            <section id="warranties" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4 flex items-center gap-2">
                <AlertCircle className="text-brand-teal" /> 6. Disclaimer of Warranties
              </h2>
              <div className="bg-brand-navy border border-brand-teal/30 p-6 rounded-lg">
                <p className="font-bold text-brand-white mb-4 uppercase text-sm tracking-wide">
                  THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND.
                </p>
                <p className="text-brand-muted text-sm leading-relaxed">
                  TO THE FULLEST EXTENT PERMITTED BY LAW, SPONSRBRIDGE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Website will be uninterrupted, secure, or error-free.
                </p>
              </div>
            </section>

            {/* 7. Limitation of Liability */}
            <section id="liability" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4 flex items-center gap-2">
                <Scale className="text-brand-teal" /> 7. Limitation of Liability
              </h2>
              <div className="space-y-4 text-brand-muted">
                <p className="uppercase text-sm font-bold text-brand-white">
                  IN NO EVENT SHALL SPONSRBRIDGE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE WEBSITE.
                </p>
                <p>Our total liability to you for all claims arising out of the Website shall not exceed one hundred dollars ($100.00 USD).</p>
              </div>
            </section>

            {/* 8. Indemnification */}
            <section id="indemnification" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4"><span className="text-brand-teal">8.</span> Indemnification</h2>
              <p className="text-brand-muted">You agree to defend, indemnify, and hold harmless SponsrBridge from any claims, damages, or expenses arising from your use of the Website or violation of these Terms.</p>
            </section>

            {/* 9. Third-Party Links */}
            <section id="third-party" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4"><span className="text-brand-teal">9.</span> Third-Party Links</h2>
              <p className="text-brand-muted">The Website may contain links to third-party sites not controlled by SponsrBridge. We are not responsible for their content or practices. Access them at your own risk.</p>
            </section>

            {/* 10. Modifications */}
            <section id="modifications" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4"><span className="text-brand-teal">10.</span> Modifications</h2>
              <p className="text-brand-muted mb-4">We reserve the right to modify the Website or these Terms at any time. Changes are effective immediately upon posting. Your continued use constitutes acceptance.</p>
            </section>

            {/* 11. Termination */}
            <section id="termination" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4"><span className="text-brand-teal">11.</span> Termination</h2>
              <p className="text-brand-muted">We may terminate or suspend your access to the Website immediately, without notice, for any reason, including breach of these Terms.</p>
            </section>

            {/* 12. Governing Law */}
            <section id="law" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4 flex items-center gap-2">
                <Gavel className="text-brand-teal" /> 12. Governing Law and Jurisdiction
              </h2>
              <p className="text-brand-muted">These Terms shall be governed by the laws of the State of Wyoming, United States. You agree to submit to the exclusive jurisdiction of the state and federal courts located in Sheridan County, Wyoming.</p>
            </section>

            {/* 13. Dispute Resolution */}
            <section id="dispute" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">13.</span> Dispute Resolution
              </h2>
              <div className="bg-brand-card p-6 rounded-xl border border-brand-border">
                <h4 className="font-bold text-brand-white mb-2">13.1 Informal Resolution</h4>
                <p className="text-sm text-brand-muted mb-4">You agree to first contact us at hello@sponsrbridge.io to attempt to resolve any dispute informally.</p>

                <h4 className="font-bold text-brand-white mb-2">13.2 Binding Arbitration</h4>
                <p className="text-sm text-brand-muted mb-4">Unresolved disputes shall be settled by binding arbitration administered by the American Arbitration Association ("AAA") in Sheridan, Wyoming.</p>

                <h4 className="font-bold text-brand-white mb-2">13.3 Class Action Waiver</h4>
                <p className="text-sm text-brand-muted">You agree to bring claims only in your individual capacity and not as a plaintiff or class member in any purported class proceeding.</p>
              </div>
            </section>

            {/* 14. Miscellaneous */}
            <section id="misc" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4"><span className="text-brand-teal">14.</span> Miscellaneous Provisions</h2>
              <ul className="grid md:grid-cols-2 gap-4 text-sm text-brand-muted">
                <li className="bg-brand-navy p-3 rounded border border-brand-border"><strong>Entire Agreement:</strong> These Terms + Privacy Policy constitute the full agreement regarding the Website.</li>
                <li className="bg-brand-navy p-3 rounded border border-brand-border"><strong>Severability:</strong> If a provision is invalid, the rest remain in effect.</li>
                <li className="bg-brand-navy p-3 rounded border border-brand-border"><strong>Waiver:</strong> No waiver of any term shall be deemed a continuing waiver.</li>
                <li className="bg-brand-navy p-3 rounded border border-brand-border"><strong>Assignment:</strong> You may not assign these Terms without consent.</li>
              </ul>
            </section>

            {/* 15. Contact */}
            <section id="contact" className="bg-brand-navy border border-brand-border p-8 rounded-2xl scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4">15. Contact Information</h2>
              <p className="text-brand-muted mb-6">If you have any questions about these Terms and Conditions, please contact us at:</p>

              <div className="space-y-2 text-brand-white">
                <p className="font-bold">SponsrBridge LLC</p>
                <p className="text-sm">1309 Coffeen Avenue STE 1200<br />Sheridan, Wyoming 82801<br />United States</p>
                <p className="pt-2"><span className="text-brand-teal font-bold">Email:</span> hello@sponsrbridge.io</p>
                <p><span className="text-brand-teal font-bold">Phone:</span> +1 (307) 213-1114</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
