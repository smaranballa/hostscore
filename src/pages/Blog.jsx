import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { joinWaitlist } from '../utils/forms';
import '../styles/blog.css';

const Blog = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await joinWaitlist(email, 'blog');
    if (success) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  const blogPosts = [
    {
      id: 'visibility-search-filters',
      category: 'Listing optimisation',
      date: 'January 14, 2025',
      readTime: '8 min read',
      title: 'Why 70% of Airbnb listings are invisible in most searches — and how to fix it in 47 minutes',
      excerpt: 'Most hosts don\'t realise that Airbnb\'s search filter system can silently exclude their listing from the majority of relevant searches. The fix is almost always the same, and it takes less than an hour.',
      featured: true,
      author: {
        name: 'HostScore Team',
        title: 'Based on analysis of 2,000+ listings',
        avatar: 'HS'
      }
    },
    {
      id: 'title-click-through-rate',
      category: 'Listing copy',
      date: 'January 8, 2025',
      readTime: '6 min read',
      title: 'The anatomy of a title that doubles your click-through rate',
      excerpt: 'Your title is the first — and sometimes only — thing a guest reads. Here\'s what separates a listing that gets clicked from one that gets scrolled past.',
      gradient: 'linear-gradient(135deg,#E8DDD0,#FAF7F2)'
    },
    {
      id: 'smart-pricing-psychology',
      category: 'Pricing',
      date: 'December 28, 2024',
      readTime: '5 min read',
      title: 'Smart pricing: why the right nightly rate isn\'t always the lowest one',
      excerpt: 'Counter-intuitive but true: listings priced slightly above market often outperform cheaper competitors. Here\'s the psychology behind it, and how to use it.',
      gradient: 'linear-gradient(135deg,#D8EFE4,#EAF3DE)'
    },
    {
      id: 'phone-photography-guide',
      category: 'Photos',
      date: 'December 19, 2024',
      readTime: '7 min read',
      title: 'How to take Airbnb photos that actually convert — on a phone',
      excerpt: 'Professional photography isn\'t the only path to great listing photos. This guide covers shot order, lighting timing, and free editing to make any space look its best.',
      gradient: 'linear-gradient(135deg,#FAECE7,#FAEEDA)'
    },
    {
      id: 'five-star-review-formula',
      category: 'Guest experience',
      date: 'December 10, 2024',
      readTime: '4 min read',
      title: 'The 5-star review formula: what guests consistently mention in top-rated listings',
      excerpt: 'After analysing thousands of five-star reviews, patterns emerge. The hosts who get them consistently aren\'t doing anything magical — they\'re doing these five specific things.',
      gradient: 'linear-gradient(135deg,#E6F1FB,#EEF5FC)'
    },
    {
      id: 'airbnb-algorithm-2025',
      category: 'Algorithm',
      date: 'November 29, 2024',
      readTime: '9 min read',
      title: 'What we know about the Airbnb search algorithm in 2025 (and what we don\'t)',
      excerpt: 'Airbnb doesn\'t publish its ranking criteria, but years of hosting data points to clear patterns. This is our best-evidence breakdown of what actually moves the needle.',
      gradient: 'linear-gradient(135deg,#F1EFE8,#E8DDD0)'
    },
    {
      id: 'property-management-scale',
      category: 'Property management',
      date: 'November 18, 2024',
      readTime: '6 min read',
      title: 'Managing 10+ listings? This is how the top property managers optimise at scale',
      excerpt: 'Running multiple listings is a different game to managing one. The most efficient property managers use a systematic approach to auditing, updating, and maintaining listings. Here\'s theirs.',
      gradient: 'linear-gradient(135deg,#FBEAF0,#F4C0D1)'
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="blog-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-label">The HostScore blog</span>
          <h1>Hosting tips that<br />actually move the needle.</h1>
          <p className="lead">
            Real insights for Airbnb hosts — listing optimisation, pricing strategy, guest communication, and what the algorithm actually rewards.
          </p>
        </div>
      </div>

      <section className="section-sm">
        <div className="container">
          {/* Featured post */}
          {featuredPost && (
            <div className="post-featured card reveal">
              <div className="post-feat-img">
                <div className="post-feat-bg"></div>
                <div className="post-feat-overlay">
                  <span className="badge badge-ink">Featured</span>
                </div>
              </div>
              <div className="post-feat-body">
                <div className="post-meta">
                  <span className="post-cat">{featuredPost.category}</span>
                  <span className="post-date">{featuredPost.date}</span>
                  <span className="post-read">{featuredPost.readTime}</span>
                </div>
                <h2>
                  <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                </h2>
                <p className="post-excerpt">{featuredPost.excerpt}</p>
                <div className="post-footer">
                  <div className="post-author">
                    <div className="author-avatar" style={{background:'var(--accent)'}}>
                      {featuredPost.author.avatar}
                    </div>
                    <div>
                      <div className="author-name">{featuredPost.author.name}</div>
                      <div className="author-title">{featuredPost.author.title}</div>
                    </div>
                  </div>
                  <Link to={`/blog/${featuredPost.id}`} className="btn btn-outline btn-sm">
                    Read article →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Post grid */}
          <div className="section-label reveal" style={{marginTop:'56px'}}>All articles</div>
          <div className="posts-grid">
            {regularPosts.map((post, index) => (
              <article key={post.id} className={`post-card card reveal ${index % 3 === 1 ? 'reveal-d1' : index % 3 === 2 ? 'reveal-d2' : ''}`}>
                <div className="post-card-img" style={{background: post.gradient}}>
                  <div className="post-card-cat">{post.category}</div>
                </div>
                <div className="card-body">
                  <div className="post-meta">
                    <span className="post-date">{post.date}</span>
                    <span className="post-read">{post.readTime}</span>
                  </div>
                  <h3>
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="post-link">Read more →</Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter signup */}
          <div className="blog-newsletter card reveal" style={{marginTop:'60px'}}>
            <div className="card-body">
              <div className="bn-grid">
                <div>
                  <h3>Get the next article in your inbox.</h3>
                  <p>No spam. One genuinely useful article per week, written for hosts who take their listings seriously.</p>
                </div>
                <div className="bn-form">
                  {!isSubmitted ? (
                    <form className="input-group" onSubmit={handleSubmit}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        placeholder="Your email address"
                        required
                      />
                      <button type="submit" className="btn btn-primary">Subscribe →</button>
                    </form>
                  ) : (
                    <div className="success-banner">
                      <span>✓</span> Subscribed — see you in your inbox!
                    </div>
                  )}
                  <p style={{fontSize:'12px',color:'var(--muted)',marginTop:'8px'}}>
                    Join 1,200+ hosts. Unsubscribe any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;