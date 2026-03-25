import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/post.css';

const BlogPost = () => {
  const { slug } = useParams();

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

  // Mock blog post data - in a real app, this would come from a CMS or API
  const blogPost = {
    title: 'Why 70% of Airbnb listings are invisible in most searches — and how to fix it in 47 minutes',
    subtitle: 'Most hosts don\'t realise that Airbnb\'s search filter system can silently exclude their listing from the majority of relevant searches. The fix is almost always the same, and it takes less than an hour.',
    category: 'Listing optimisation',
    date: 'January 14, 2025',
    readTime: '8 min read',
    author: {
      name: 'HostScore Team',
      title: 'Based on analysis of 2,000+ listings',
      avatar: 'HS'
    },
    content: `
      <p>After analyzing over 2,000 Airbnb listings across 15 major cities, we discovered something that shocked us: <strong>70% of listings are invisible in the searches that matter most</strong>.</p>

      <p>It's not about your photos, your reviews, or even your price. It's about something far more fundamental — and fixable.</p>

      <h2>The invisible listing problem</h2>

      <p>When guests search for accommodations, they don't just type in a location. They filter. Aggressively.</p>

      <p>According to Airbnb's own data, <strong>89% of searches include at least one filter</strong>. The most common filters are:</p>

      <ul>
        <li>Wifi (used in 76% of searches)</li>
        <li>Kitchen (used in 68% of searches)</li>
        <li>Free parking (used in 52% of searches)</li>
        <li>Dedicated workspace (used in 43% of searches)</li>
        <li>Self check-in (used in 38% of searches)</li>
      </ul>

      <p>Here's the problem: <strong>if your listing doesn't explicitly mention these amenities in your title or the first 100 words of your description, Airbnb's algorithm may not surface your listing when guests filter for them</strong> — even if you actually offer them.</p>

      <blockquote>
        <p>"I had wifi, I had a kitchen, I had everything guests were looking for. But I wasn't getting views. Turns out, I never actually said 'wifi' or 'kitchen' in my listing. I thought it was obvious."</p>
        <cite>— Sarah M., Barcelona host</cite>
      </blockquote>

      <h2>The 47-minute fix</h2>

      <p>The solution is systematic, not creative. Here's exactly what to do:</p>

      <h3>Step 1: Audit your current amenities (5 minutes)</h3>

      <p>List every amenity you offer. Not just the obvious ones — everything. Pool access through your building? List it. Street parking that's usually available? List it. Fast internet? Don't just say "wifi" — say "high-speed wifi".</p>

      <h3>Step 2: Rewrite your title (15 minutes)</h3>

      <p>Your title should include your top 3 most filterable amenities. Instead of:</p>

      <p><em>"Charming apartment in the heart of downtown"</em></p>

      <p>Try:</p>

      <p><strong>"2BR Apartment with Wifi, Kitchen & Free Parking — Downtown Location"</strong></p>

      <h3>Step 3: Restructure your description opening (20 minutes)</h3>

      <p>The first 100 words of your description are critical. Lead with amenities, not atmosphere. You can add personality later, but start with what guests filter for.</p>

      <p>Instead of:</p>

      <p><em>"Welcome to our beautiful space where you can relax and unwind..."</em></p>

      <p>Try:</p>

      <p><strong>"This 2-bedroom apartment includes high-speed wifi, a fully equipped kitchen, free parking, and dedicated workspace. You'll have everything you need for work or leisure, just 5 minutes from downtown..."</strong></p>

      <h3>Step 4: Update your amenities list (7 minutes)</h3>

      <p>Go through Airbnb's amenities checklist methodically. If you offer it, check it. If you're unsure, err on the side of inclusion — you can always clarify in your description.</p>

      <h2>The results</h2>

      <p>Hosts who make these changes typically see:</p>

      <ul>
        <li><strong>+47% increase in search visibility</strong> within 48 hours</li>
        <li><strong>+23% increase in click-through rate</strong> within one week</li>
        <li><strong>+15% increase in booking rate</strong> within two weeks</li>
      </ul>

      <p>The best part? These changes cost nothing and take less than an hour to implement.</p>

      <h2>Why this works</h2>

      <p>Airbnb's search algorithm prioritizes listings that match guest intent. When someone filters for "wifi + kitchen + parking," the algorithm looks for those exact terms in your listing content.</p>

      <p>It's not enough to have these amenities — you need to explicitly mention them where the algorithm can find them.</p>

      <h2>What's next?</h2>

      <p>This is just the beginning. Search visibility is one piece of the puzzle. The hosts who consistently outperform their market also optimize for:</p>

      <ul>
        <li>First impression (what guests see in the first 3 seconds)</li>
        <li>Guest conversion (turning views into bookings)</li>
        <li>Trust signals (what makes guests feel confident booking)</li>
        <li>Competitive positioning (standing out from similar listings)</li>
      </ul>

      <p>Each of these factors can be systematically improved, just like search visibility.</p>

      <p><strong>Ready to see what else your listing might be missing?</strong> <a href="/audit">Run a free audit</a> and get a complete analysis of what's costing you bookings — and exactly how to fix it.</p>
    `
  };

  return (
    <div className="blog-post-page">
      <article className="post-article">
        <div className="container">
          <div className="post-header reveal">
            <div className="post-breadcrumb">
              <Link to="/blog">← Back to blog</Link>
            </div>
            <div className="post-meta">
              <span className="post-cat">{blogPost.category}</span>
              <span className="post-date">{blogPost.date}</span>
              <span className="post-read">{blogPost.readTime}</span>
            </div>
            <h1>{blogPost.title}</h1>
            <p className="post-subtitle">{blogPost.subtitle}</p>
            <div className="post-author-header">
              <div className="author-avatar" style={{background:'var(--accent)'}}>
                {blogPost.author.avatar}
              </div>
              <div>
                <div className="author-name">{blogPost.author.name}</div>
                <div className="author-title">{blogPost.author.title}</div>
              </div>
            </div>
          </div>

          <div className="post-content reveal">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </div>

          <div className="post-footer reveal">
            <div className="post-cta card">
              <div className="card-body">
                <h3>Ready to optimize your listing?</h3>
                <p>Get a free audit of your Airbnb listing and discover exactly what's costing you bookings.</p>
                <Link to="/audit" className="btn btn-primary">Run free audit →</Link>
              </div>
            </div>

            <div className="post-nav">
              <Link to="/blog" className="btn btn-outline">← Back to all articles</Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;