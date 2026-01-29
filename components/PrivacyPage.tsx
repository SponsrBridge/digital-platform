
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText, ChevronRight, Cookie, Globe } from 'lucide-react';
import { useLenis } from './SmoothScroll';

const sections = [
  { id: 'intro', title: '1. Introduction' },
  { id: 'collection', title: '2. Information We Collect' },
  { id: 'use', title: '3. How We Use Your Information' },
  { id: 'sharing', title: '4. Sharing of Information' },
  { id: 'retention', title: '5. Data Retention' },
  { id: 'security', title: '6. Data Security' },
  { id: 'rights', title: '7. Your Rights and Choices' },
  { id: 'third-party', title: '8. Third-Party Links' },
  { id: 'cookies', title: '9. Cookie Policy' },
  { id: 'children', title: '10. Children\'s Privacy' },
  { id: 'transfers', title: '11. International Data Transfers' },
  { id: 'changes', title: '12. Changes to Policy' },
  { id: 'contact', title: '13. Contact Us' },
];

const PrivacyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
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
        // Trigger when the element is near the top of the viewport (offset by navbar height approx)
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
            <h1 className="text-4xl md:text-5xl font-bold text-brand-white mb-4">Privacy Policy</h1>
            <p className="text-brand-teal font-medium mb-2">Including Cookie Policy</p>
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

            {/* 1. Introduction */}
            <section id="intro" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">1.</span> Introduction
              </h2>
              <div className="prose prose-invert max-w-none text-brand-text leading-relaxed space-y-4">
                <p>
                  SponsrBridge LLC ("SponsrBridge," "we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.sponsrbridge.io (the "Website"), use our services, or otherwise interact with us.
                </p>
                <p>
                  This Privacy Policy is designed to comply with applicable United States federal and state privacy laws, including but not limited to the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), and other state privacy regulations where applicable.
                </p>
                <p>
                  By accessing or using our Website and services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Website or services.
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

            {/* 2. Information We Collect */}
            <section id="collection" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">2.</span> Information We Collect
              </h2>
              <div className="space-y-6">
                <p>We collect information that you provide directly to us, information collected automatically when you use our Website, and information from third-party sources.</p>

                <div className="bg-brand-card p-6 rounded-xl border border-brand-border">
                  <h3 className="text-xl font-bold text-brand-white mb-3">2.1 Information You Provide Directly</h3>
                  <p className="mb-4">We collect information you voluntarily provide when you:</p>
                  <ul className="list-disc pl-5 space-y-2 text-brand-muted">
                    <li>Fill out forms on our Website, including contact forms, consultation request forms, and newsletter subscription forms</li>
                    <li>Communicate with us via email, phone, or other channels</li>
                    <li>Register for or attend our webinars, events, or consultations</li>
                    <li>Enter into a business relationship or contract with us</li>
                    <li>Respond to surveys or provide feedback</li>
                  </ul>
                  <p className="mt-4 mb-2 font-semibold text-brand-white">This information may include:</p>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-brand-muted">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-teal rounded-full" /> Name (first and last)</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-teal rounded-full" /> Email address</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-teal rounded-full" /> Phone number</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-teal rounded-full" /> Company or organisation name</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-teal rounded-full" /> Job title or role</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-teal rounded-full" /> Conference or event details</div>
                  </div>
                </div>

                <div className="bg-brand-card p-6 rounded-xl border border-brand-border">
                  <h3 className="text-xl font-bold text-brand-white mb-3">2.2 Information Collected Automatically</h3>
                  <p className="mb-4">When you access or use our Website, we automatically collect certain information, including:</p>
                  <ul className="list-disc pl-5 space-y-2 text-brand-muted">
                    <li>Device information (device type, operating system, unique device identifiers)</li>
                    <li>Browser information (browser type, version, language preferences)</li>
                    <li>IP address and approximate geographic location</li>
                    <li>Pages visited, time spent on pages, and navigation patterns</li>
                    <li>Referring website or source</li>
                    <li>Date and time of access</li>
                    <li>Information collected through cookies, pixel tags, and similar technologies (see Section 9: Cookie Policy)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-brand-white mb-3">2.3 Information from Third-Party Sources</h3>
                  <p className="mb-2">We may receive information about you from third-party sources, including:</p>
                  <ul className="list-disc pl-5 space-y-2 text-brand-muted">
                    <li>Publicly available business information</li>
                    <li>Professional networking platforms (such as LinkedIn) where you have made information publicly available</li>
                    <li>Business partners and referral sources</li>
                    <li>Analytics providers and advertising networks</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. How We Use Your Information */}
            <section id="use" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">3.</span> How We Use Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-brand-navy border border-brand-border p-5 rounded-lg">
                  <h3 className="text-lg font-bold text-brand-white mb-3">3.1 Providing and Improving Services</h3>
                  <ul className="space-y-2 text-sm text-brand-muted">
                    <li>To respond to your enquiries and fulfil your requests</li>
                    <li>To provide our sponsorship consulting services</li>
                    <li>To schedule and conduct consultations</li>
                    <li>To send you service-related communications</li>
                    <li>To improve and develop our Website and services</li>
                  </ul>
                </div>
                <div className="bg-brand-navy border border-brand-border p-5 rounded-lg">
                  <h3 className="text-lg font-bold text-brand-white mb-3">3.2 Marketing and Communications</h3>
                  <ul className="space-y-2 text-sm text-brand-muted">
                    <li>To send you newsletters, articles, and industry insights (where you have opted in)</li>
                    <li>To inform you about our services, events, and promotional offers</li>
                    <li>To personalise your experience and deliver relevant content</li>
                  </ul>
                </div>
                <div className="bg-brand-navy border border-brand-border p-5 rounded-lg">
                  <h3 className="text-lg font-bold text-brand-white mb-3">3.3 Analytics and Performance</h3>
                  <ul className="space-y-2 text-sm text-brand-muted">
                    <li>To analyse Website usage and trends</li>
                    <li>To measure the effectiveness of our marketing campaigns</li>
                    <li>To understand how visitors interact with our Website</li>
                  </ul>
                </div>
                <div className="bg-brand-navy border border-brand-border p-5 rounded-lg">
                  <h3 className="text-lg font-bold text-brand-white mb-3">3.4 Legal and Compliance</h3>
                  <ul className="space-y-2 text-sm text-brand-muted">
                    <li>To comply with applicable laws, regulations, and legal processes</li>
                    <li>To protect our rights, privacy, safety, or property</li>
                    <li>To enforce our terms and conditions</li>
                    <li>To prevent fraud, security threats, or illegal activities</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Sharing of Information */}
            <section id="sharing" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">4.</span> Sharing of Information
              </h2>
              <p>We do not sell your personal information to third parties. We may share your information in the following circumstances:</p>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-bold text-brand-white">4.1 Service Providers</h4>
                  <p className="text-brand-muted text-sm">We may share your information with third-party service providers who perform services on our behalf, such as website hosting, email delivery, analytics, customer relationship management, and payment processing. These providers are contractually obligated to use your information only for the purposes of providing services to us and to maintain appropriate security measures.</p>
                </div>
                <div>
                  <h4 className="font-bold text-brand-white">4.2 Business Transfers</h4>
                  <p className="text-brand-muted text-sm">In the event of a merger, acquisition, reorganisation, bankruptcy, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</p>
                </div>
                <div>
                  <h4 className="font-bold text-brand-white">4.3 Legal Requirements</h4>
                  <p className="text-brand-muted text-sm">We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court order, government agency, or law enforcement request).</p>
                </div>
                <div>
                  <h4 className="font-bold text-brand-white">4.4 With Your Consent</h4>
                  <p className="text-brand-muted text-sm">We may share your information with third parties when you have given us explicit consent to do so.</p>
                </div>
              </div>
            </section>

            {/* 5. Data Retention & 6. Security */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 md:gap-8">
              <section id="retention" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                  <span className="text-brand-teal">5.</span> Data Retention
                </h2>
                <p className="text-sm text-brand-muted">
                  We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-brand-muted">
                  <li><strong>Contact info:</strong> Retained for duration of relationship + reasonable period.</li>
                  <li><strong>Marketing:</strong> Retained until unsubscribe/deletion request.</li>
                  <li><strong>Contracts:</strong> Retained for required legal period (typically 7 years).</li>
                  <li><strong>Analytics:</strong> Retained in aggregated/anonymised form.</li>
                </ul>
              </section>

              <section id="security" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                  <span className="text-brand-teal">6.</span> Data Security
                </h2>
                <div className="bg-brand-card border border-brand-border p-4 rounded-xl">
                  <Shield className="text-brand-teal mb-3" size={24} />
                  <p className="text-sm text-brand-muted mb-3">We implement appropriate technical and organisational measures including:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-brand-muted">
                    <li>Encryption of data in transit using SSL/TLS technology</li>
                    <li>Secure hosting infrastructure</li>
                    <li>Access controls limiting personal information access</li>
                    <li>Regular security assessments</li>
                  </ul>
                </div>
              </section>
            </div>

            {/* 7. Your Rights */}
            <section id="rights" className="space-y-6 scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white flex items-center gap-2">
                <span className="text-brand-teal">7.</span> Your Rights and Choices
              </h2>

              <div className="border-l-4 border-brand-teal pl-6 py-2">
                <h3 className="text-xl font-bold text-brand-white mb-2">7.1 California Residents (CCPA/CPRA)</h3>
                <p className="text-brand-muted mb-4 text-sm">If you are a California resident, you have specific rights:</p>
                <ul className="space-y-2 text-sm text-brand-text">
                  <li><strong>Right to Know:</strong> Request info about categories, sources, and purposes of collection.</li>
                  <li><strong>Right to Delete:</strong> Request deletion of your personal information (with exceptions).</li>
                  <li><strong>Right to Correct:</strong> Request correction of inaccurate information.</li>
                  <li><strong>Right to Opt-Out of Sale/Sharing:</strong> We do not sell your personal data.</li>
                  <li><strong>Right to Limit Use of Sensitive Info:</strong> We do not collect sensitive personal info as defined under CPRA.</li>
                  <li><strong>Right to Non-Discrimination:</strong> No discrimination for exercising rights.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-white mb-2">7.2 Other State Privacy Rights</h3>
                <p className="text-brand-muted text-sm">Residents of Virginia, Colorado, Connecticut, Utah, and other states with comprehensive privacy laws may have similar rights to access, delete, and correct their personal information.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand-white mb-2">7.4 Exercising Your Rights</h3>
                <p className="text-brand-muted text-sm mb-2">To exercise any of your rights, please contact us at:</p>
                <div className="bg-brand-navy p-4 rounded border border-brand-border inline-block text-sm text-brand-white">
                  Email: <a href="mailto:hello@sponsrbridge.io" className="text-brand-teal hover:underline">hello@sponsrbridge.io</a><br />
                  Phone: +1 (307) 213-1114<br />
                  Mail: SponsrBridge LLC, 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801
                </div>
              </div>
            </section>

            {/* 8. Third Party Links */}
            <section id="third-party" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4"><span className="text-brand-teal">8.</span> Third-Party Links</h2>
              <p className="text-brand-muted text-sm">Our Website may contain links to third-party websites not operated by us. This Privacy Policy does not apply to those third-party sites. We encourage you to review their privacy policies.</p>
            </section>

            {/* 9. Cookie Policy */}
            <section id="cookies" className="bg-brand-card/30 p-8 rounded-2xl border border-brand-teal/20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Cookie size={32} className="text-brand-teal" />
                <h2 className="text-2xl font-bold text-brand-white">9. Cookie Policy</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-white mb-2">9.1 What Are Cookies</h3>
                  <p className="text-sm text-brand-muted">Cookies are small text files placed on your device when you visit a website. They help websites work efficiently and provide better user experiences.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-white mb-2">9.2 How We Use Cookies</h3>
                  <ul className="grid md:grid-cols-2 gap-4">
                    <li className="bg-brand-navy p-4 rounded border border-brand-border">
                      <strong className="text-brand-teal block mb-1">Essential Cookies</strong>
                      <span className="text-xs text-brand-muted">Necessary for proper function (navigation, security). Cannot be disabled.</span>
                    </li>
                    <li className="bg-brand-navy p-4 rounded border border-brand-border">
                      <strong className="text-brand-teal block mb-1">Analytics Cookies</strong>
                      <span className="text-xs text-brand-muted">Help us understand visitor interaction anonymously (e.g., Google Analytics).</span>
                    </li>
                    <li className="bg-brand-navy p-4 rounded border border-brand-border">
                      <strong className="text-brand-teal block mb-1">Functional Cookies</strong>
                      <span className="text-xs text-brand-muted">Enable enhanced functionality and personalisation.</span>
                    </li>
                    <li className="bg-brand-navy p-4 rounded border border-brand-border">
                      <strong className="text-brand-teal block mb-1">Marketing Cookies</strong>
                      <span className="text-xs text-brand-muted">Used to build interest profiles and show relevant ads.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-white mb-2">9.3 Specific Cookies We Use</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-brand-teal uppercase bg-brand-navy/50">
                        <tr>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Provider</th>
                          <th className="px-4 py-2">Purpose</th>
                          <th className="px-4 py-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-brand-muted divide-y divide-brand-border/30">
                        <tr>
                          <td className="px-4 py-2 font-mono">_ga, _gid, _gat</td>
                          <td className="px-4 py-2">Google Analytics</td>
                          <td className="px-4 py-2">User distinction & throttle</td>
                          <td className="px-4 py-2">Up to 2 years</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-mono">cookie_consent</td>
                          <td className="px-4 py-2">SponsrBridge</td>
                          <td className="px-4 py-2">Stores preferences</td>
                          <td className="px-4 py-2">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-white mb-2">9.4 Managing Cookies</h3>
                  <p className="text-sm text-brand-muted mb-2">You can manage cookies via the cookie consent banner or your browser settings.</p>
                  <p className="text-sm text-brand-muted">
                    <strong>Browser Settings:</strong> Most browsers allow control over cookies. Check "Options" or "Preferences" in Chrome, Mozilla Firefox, Safari, or Microsoft Edge.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-white mb-2">9.5 Do Not Track</h3>
                  <p className="text-sm text-brand-muted">We do not currently respond to DNT browser signals as there is no uniform standard.</p>
                </div>
              </div>
            </section>

            {/* 10, 11, 12 Sections */}
            <div className="space-y-8">
              <section id="children" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-brand-white mb-2"><span className="text-brand-teal">10.</span> Children's Privacy</h2>
                <p className="text-brand-muted text-sm">Our services are not directed to individuals under 18. We do not knowingly collect data from children. Contact us immediately if you believe we have inadvertently done so.</p>
              </section>

              <section id="transfers" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-brand-white mb-2"><span className="text-brand-teal">11.</span> International Data Transfers</h2>
                <p className="text-brand-muted text-sm">SponsrBridge is based in the United States. By using our Website, you consent to the transfer, storage, and processing of your information in the US, where our servers and database are located.</p>
              </section>

              <section id="changes" className="scroll-mt-28">
                <h2 className="text-xl font-bold text-brand-white mb-2"><span className="text-brand-teal">12.</span> Changes to This Privacy Policy</h2>
                <p className="text-brand-muted text-sm">We may update this policy periodically. We will notify you by posting the updated policy on this page with a new "Last Updated" date, sending an email notification (if applicable), or displaying a notice on our Website.</p>
              </section>
            </div>

            {/* 13. Contact */}
            <section id="contact" className="bg-brand-navy border border-brand-border p-8 rounded-2xl scroll-mt-28">
              <h2 className="text-2xl font-bold text-brand-white mb-4">13. Contact Us</h2>
              <p className="text-brand-muted mb-6">If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:</p>

              <div className="space-y-2 text-brand-white">
                <p className="font-bold">SponsrBridge LLC</p>
                <p className="text-sm text-brand-muted">Attn: Privacy Enquiries</p>
                <p className="text-sm">1309 Coffeen Avenue STE 1200<br />Sheridan, Wyoming 82801<br />United States</p>
                <p className="pt-2"><span className="text-brand-teal font-bold">Email:</span> hello@sponsrbridge.io</p>
                <p><span className="text-brand-teal font-bold">Phone:</span> +1 (307) 213-1114</p>
              </div>

              <p className="text-xs text-brand-muted mt-6 italic">We will respond to your enquiry as soon as reasonably practicable and within any timeframes required by applicable law.</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
