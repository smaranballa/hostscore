import React, { useState, useEffect } from 'react';
import { submitContactForm } from '../utils/forms';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await submitContactForm(formData);
    
    if (success) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
    
    setIsSubmitting(false);
  };

  const subjectOptions = [
    'General inquiry',
    'Partnership opportunity',
    'Press inquiry',
    'Technical support',
    'Feature request',
    'Billing question',
    'Other'
  ];

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-label">Get in touch</span>
          <h1>We'd love to hear<br />from you.</h1>
          <p className="lead">
            Questions about HostScore? Want to partner with us? Just want to say hello? Drop us a line.
          </p>
        </div>
      </div>

      <section className="section-sm">
        <div className="container">
          <div className="contact-grid">
            {/* Contact form */}
            <div className="contact-form-card card reveal">
              <div className="card-body">
                <h2>Send us a message</h2>
                <p style={{color:'var(--muted)',marginBottom:'24px'}}>
                  We typically respond within 24 hours during business days.
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-section">
                        <label htmlFor="cf-name">Your name</label>
                        <input
                          type="text"
                          id="cf-name"
                          className="input"
                          placeholder="John Smith"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-section">
                        <label htmlFor="cf-email">Email address</label>
                        <input
                          type="email"
                          id="cf-email"
                          className="input"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-section">
                      <label htmlFor="cf-subject">Subject</label>
                      <select
                        id="cf-subject"
                        className="input"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                      >
                        <option value="">Select a subject</option>
                        {subjectOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-section">
                      <label htmlFor="cf-message">Message</label>
                      <textarea
                        id="cf-message"
                        className="input"
                        placeholder="Tell us how we can help..."
                        rows="6"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg" 
                      style={{width:'100%'}}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send message →'}
                    </button>
                  </form>
                ) : (
                  <div className="success-message">
                    <div className="success-icon">✓</div>
                    <h3>Message sent!</h3>
                    <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="contact-info reveal reveal-d1">
              <div className="contact-info-card card">
                <div className="card-body">
                  <h3>Other ways to reach us</h3>
                  
                  <div className="contact-method">
                    <div className="contact-icon">📧</div>
                    <div>
                      <strong>Email</strong>
                      <p>hello@hostscore.com</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="contact-icon">💬</div>
                    <div>
                      <strong>Live chat</strong>
                      <p>Available on our website<br />Mon-Fri, 9am-6pm EST</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="contact-icon">🐦</div>
                    <div>
                      <strong>Twitter</strong>
                      <p>@hostscore<br />For quick questions</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="faq-card card">
                <div className="card-body">
                  <h3>Quick answers</h3>
                  
                  <div className="faq-item">
                    <strong>How does the free audit work?</strong>
                    <p>Paste your listing details, and we'll analyze what's costing you bookings in about 60 seconds.</p>
                  </div>

                  <div className="faq-item">
                    <strong>Do you store my listing data?</strong>
                    <p>No. Your listing information is analyzed and then deleted. We don't store or share your data.</p>
                  </div>

                  <div className="faq-item">
                    <strong>When will paid plans be available?</strong>
                    <p>We're currently in early access. Join the waitlist to be notified when we launch.</p>
                  </div>

                  <div className="faq-item">
                    <strong>Can you help with multiple listings?</strong>
                    <p>Yes! Our Pro and Agency plans are designed for hosts with multiple properties.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;