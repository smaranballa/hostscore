import React, { useEffect } from 'react';
import '../styles/legal.css';

const Terms = () => {
  // Reveal animation on scroll
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { 
        if (e.isIntersecting) e.target.classList.add('visible'); 
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  return (
    <div className="legal-page">
      <div className="page-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <p className="lead">
            The terms and conditions for using HostScore.
          </p>
          <p className="legal-updated">Last updated: January 1, 2025</p>
        </div>
      </div>

      <section className="section-sm">
        <div className="container">
          <div className="legal-content reveal">
            <h2>Acceptance of Terms</h2>
            
            <p>By accessing and using HostScore ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>

            <h2>Description of Service</h2>
            
            <p>HostScore provides analysis and optimization recommendations for Airbnb listings. Our service includes:</p>
            <ul>
              <li>Automated analysis of listing content</li>
              <li>Scoring across multiple performance factors</li>
              <li>Recommendations for improving listing performance</li>
              <li>Rewritten copy suggestions</li>
              <li>Amenities gap analysis</li>
            </ul>

            <h2>User Responsibilities</h2>
            
            <p>When using HostScore, you agree to:</p>
            <ul>
              <li>Provide accurate information about your listing</li>
              <li>Use the service only for legitimate purposes</li>
              <li>Not attempt to reverse engineer or copy our analysis algorithms</li>
              <li>Not use the service to analyze listings you do not own or have permission to analyze</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2>Intellectual Property</h2>
            
            <p>The HostScore service, including all content, features, and functionality, is owned by HostScore and is protected by copyright, trademark, and other intellectual property laws.</p>
            
            <p>You retain ownership of any listing content you provide to our service. By using our service, you grant us a limited license to analyze your content and provide recommendations.</p>

            <h2>Disclaimers and Limitations</h2>
            
            <h3>No Guarantees</h3>
            <p>While we strive to provide accurate and helpful recommendations, we cannot guarantee that following our suggestions will result in increased bookings or revenue. Airbnb listing performance depends on many factors beyond our control.</p>

            <h3>Service Availability</h3>
            <p>We aim to provide reliable service, but we do not guarantee that the service will be available at all times or free from interruptions.</p>

            <h3>Limitation of Liability</h3>
            <p>In no event shall HostScore be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>

            <h2>Privacy and Data</h2>
            
            <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.</p>
            
            <p>Key points:</p>
            <ul>
              <li>We do not store your listing content after analysis</li>
              <li>We may collect anonymous usage data to improve our service</li>
              <li>We will never share your personal information with third parties without your consent</li>
            </ul>

            <h2>Prohibited Uses</h2>
            
            <p>You may not use HostScore for any unlawful purpose or to solicit others to perform unlawful acts. Specifically, you may not:</p>
            <ul>
              <li>Violate any local, state, national, or international law</li>
              <li>Transmit any harassing, libelous, abusive, threatening, or harmful material</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use our service to spam or send unsolicited communications</li>
              <li>Interfere with or disrupt our service or servers</li>
            </ul>

            <h2>Account Termination</h2>
            
            <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

            <h2>Pricing and Payment</h2>
            
            <p>HostScore offers both free and paid services:</p>
            <ul>
              <li>Free audit: One listing analysis at no cost</li>
              <li>Paid plans: Subscription-based access to additional features</li>
            </ul>
            
            <p>Pricing is subject to change with notice. Refunds are provided according to our refund policy.</p>

            <h2>Modifications to Service</h2>
            
            <p>We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>

            <h2>Third-Party Services</h2>
            
            <p>Our service may integrate with or reference third-party services (such as Airbnb). We are not responsible for the content, privacy policies, or practices of any third-party services.</p>

            <h2>Indemnification</h2>
            
            <p>You agree to defend, indemnify, and hold harmless HostScore and its affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including attorney's fees) arising from your use of the service or your violation of these terms.</p>

            <h2>Governing Law</h2>
            
            <p>These terms shall be interpreted and governed by the laws of the State of Delaware, United States, without regard to its conflict of law provisions.</p>

            <h2>Severability</h2>
            
            <p>If any provision of these terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law.</p>

            <h2>Changes to Terms</h2>
            
            <p>We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>

            <h2>Contact Information</h2>
            
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <ul>
              <li>Email: legal@hostscore.com</li>
              <li>Website: hostscore.com/contact</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;