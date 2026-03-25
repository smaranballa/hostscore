import React, { useEffect } from 'react';
import '../styles/legal.css';

const Privacy = () => {
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
          <h1>Privacy Policy</h1>
          <p className="lead">
            How we collect, use, and protect your information.
          </p>
          <p className="legal-updated">Last updated: January 1, 2025</p>
        </div>
      </div>

      <section className="section-sm">
        <div className="container">
          <div className="legal-content reveal">
            <h2>Information We Collect</h2>
            
            <h3>Information You Provide</h3>
            <p>When you use HostScore, we may collect information you provide directly, such as:</p>
            <ul>
              <li>Email address (for waitlist signup and communications)</li>
              <li>Listing details (title, description, amenities, location) for audit purposes</li>
              <li>Contact information (name, email) when you contact us</li>
              <li>Feedback and correspondence</li>
            </ul>

            <h3>Information We Collect Automatically</h3>
            <p>When you visit our website, we automatically collect certain information, including:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website</li>
            </ul>

            <h2>How We Use Your Information</h2>
            
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our audit services</li>
              <li>Send you updates about HostScore (if you've joined our waitlist)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Analyze usage patterns to improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing and Disclosure</h2>
            
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who help us operate our website and provide our services (e.g., email service providers, analytics providers)</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction</li>
            </ul>

            <h2>Data Security</h2>
            
            <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

            <h2>Data Retention</h2>
            
            <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.</p>
            
            <p>Specifically:</p>
            <ul>
              <li>Listing audit data is processed and then immediately deleted</li>
              <li>Waitlist email addresses are retained until you unsubscribe or we discontinue the service</li>
              <li>Contact form submissions are retained for up to 2 years for customer service purposes</li>
            </ul>

            <h2>Your Rights</h2>
            
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict processing of your information</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>

            <p>To exercise these rights, please contact us at privacy@hostscore.com.</p>

            <h2>Cookies and Tracking</h2>
            
            <p>We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.</p>

            <h2>Third-Party Services</h2>
            
            <p>Our website may contain links to third-party websites or services. This privacy policy does not apply to those third-party services. We encourage you to review their privacy policies.</p>

            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Google Analytics:</strong> For website analytics (you can opt out at tools.google.com/dlpage/gaoptout)</li>
              <li><strong>Formspree:</strong> For form submissions</li>
            </ul>

            <h2>Children's Privacy</h2>
            
            <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

            <h2>International Users</h2>
            
            <p>If you are accessing our services from outside the United States, please note that your information may be transferred to, stored, and processed in the United States where our servers are located.</p>

            <h2>Changes to This Privacy Policy</h2>
            
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.</p>

            <h2>Contact Us</h2>
            
            <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
            <ul>
              <li>Email: privacy@hostscore.com</li>
              <li>Website: hostscore.com/contact</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;