// Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initializeAnalytics = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}

  // Load GA script
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      custom_map: { dimension1: 'waitlist_source' }
    });

    window.gtag = gtag;
  }
};

// Track waitlist signups as conversions
export const trackWaitlistSignup = (source) => {
  if (window.gtag && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', 'generate_lead', {
      event_category: 'waitlist',
      event_label: source,
      waitlist_source: source
    });
  }
  console.log('Conversion tracked:', source);
};

// Track contact form submissions
export const trackContactSubmit = (subject) => {
  if (window.gtag && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', 'contact_submission', {
      event_category: 'contact',
      event_label: subject
    });
  }
};

// Track blog newsletter signups
export const trackBlogSignup = () => {
  if (window.gtag && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', 'newsletter_signup', {
      event_category: 'blog',
      event_label: 'newsletter'
    });
  }
};

// Track page views (for SPA navigation)
export const trackPageView = (path, title) => {
  if (window.gtag && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title
    });
  }
};

// Track CTA button clicks
export const trackCTAClick = (buttonText) => {
  if (window.gtag && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: buttonText
    });
  }
};

// Track outbound link clicks
export const trackOutboundClick = (url, label) => {
  if (window.gtag && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', 'outbound_click', {
      event_category: 'external',
      event_label: label,
      url: url
    });
  }
};