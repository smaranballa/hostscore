// Configure your Formspree endpoint: https://formspree.io/
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your actual Formspree form ID

export const joinWaitlist = async (email, source = 'unknown') => {
  if (!email || !email.includes('@') || !email.includes('.')) {
    return false;
  }

  // Demo mode - simulate successful submission
  if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
    console.log('Demo mode: Waitlist signup simulated', { email, source });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Track conversion
    try {
      const { trackWaitlistSignup } = await import('./analytics');
      trackWaitlistSignup(source);
    } catch {
      console.log('Analytics not available in demo mode');
    }
    
    return true;
  }

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify({ 
        email, 
        source: `hostscore_waitlist_${source}`, 
        timestamp: new Date().toISOString() 
      })
    });

    if (response.ok) {
      // Track conversion
      const { trackWaitlistSignup } = await import('./analytics');
      trackWaitlistSignup(source);
      return true;
    } else {
      console.error('Waitlist submission failed:', response.status);
      return false;
    }
  } catch (err) {
    console.error('Waitlist submit error:', err);
    return false;
  }
};

export const submitContactForm = async (formData) => {
  // Demo mode - simulate successful submission
  if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
    console.log('Demo mode: Contact form submission simulated', formData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Track conversion
    try {
      const { trackContactSubmit } = await import('./analytics');
      trackContactSubmit(formData.subject || 'general');
    } catch {
      console.log('Analytics not available in demo mode');
    }
    
    return true;
  }

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify({
        ...formData,
        source: 'hostscore_contact',
        timestamp: new Date().toISOString()
      })
    });

    if (response.ok) {
      // Track conversion
      const { trackContactSubmit } = await import('./analytics');
      trackContactSubmit(formData.subject || 'general');
      return true;
    } else {
      console.error('Contact form submission failed:', response.status);
      return false;
    }
  } catch (err) {
    console.error('Contact form submit error:', err);
    return false;
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};