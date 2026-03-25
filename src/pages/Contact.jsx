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

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-label">Get in touch</span>
          <h1>We'd love to hear<br />from you.</h1>
          <p className="lead">
            Questions about HostScore? Want to partner with us?
            Just want to say hello? Drop us a line.
          </p>
        </div>
      </div>

      <section className="section-sm">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-card reveal">
              <div className="card-body">
                <h2>Send us a message</h2>
                <p style={{color:'var(--ink2)', fontSize: '14px', marginBottom:'24px', lineHeight: '1.6'}}>
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
                        <option value="General inquiry">General inquiry</option>
                        <option value="Partnership opportunity">Partnership opportunity</option>
                        <option value="Press inquiry">Press inquiry</option>
                        <option value="Feature request">Feature request</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-section">
                      <label htmlFor="cf-message">Message</label>
                      <textarea
                        id="cf-message"
                        className="input"
                        placeholder="Tell us how we can help..."
                        rows="5"
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
                      {isSubmitting ? 'Sending...' : 'Send message'}
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

            <div className="contact-info reveal reveal-d1">
              <div className="contact-info-card">
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
                      <p>Mon – Fri, 9 am – 6 pm EST</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="contact-icon">𝕏</div>
                    <div>
                      <strong>Twitter / X</strong>
                      <p>@hostscore</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="faq-card">
                <div className="card-body">
                  <h3>Quick answers</h3>
                  
                  <div className="faq-item">
                    <strong>How does HostScore work?</strong>
                    <p>Enter your listing details and we analyze what's costing you bookings in about 60 seconds.</p>
                  </div>

                  <div className="faq-item">
                    <strong>Do you store my listing data?</strong>
                    <p>No. Your information is analyzed and then deleted. We don't store or share your data.</p>
                  </div>

                  <div className="faq-item">
                    <strong>When will paid plans launch?</strong>
                    <p>We're currently in early access. Join the waitlist to get notified when we launch.</p>
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