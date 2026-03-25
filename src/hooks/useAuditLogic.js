import { useState } from 'react';

// Sample listing data for demos
const SAMPLE_DATA = {
  cottage: {
    title: 'Charming Cottage Near City',
    desc: 'Beautiful cottage in a quiet neighborhood. Perfect for couples. Has all the amenities you need. Close to restaurants and shops.',
    amenities: ['wifi', 'kitchen', 'washer', 'heating', 'tv', 'hair-dryer', 'iron'],
    price: 125,
    location: 'Portland, Oregon'
  },
  apartment: {
    title: 'Modern Apartment',
    desc: 'Sleek apartment with great views. Good location near downtown. One bedroom with comfortable bed.',
    amenities: ['wifi', 'kitchen', 'ac', 'tv'],
    price: 180,
    location: 'Chicago, Illinois'
  },
  villa: {
    title: 'Beach Villa',
    desc: 'Amazing beachfront property. Wake up to ocean views. Large space for families.',
    amenities: ['wifi', 'kitchen', 'ac', 'pool', 'tv', 'washer', 'dryer'],
    price: 350,
    location: 'Malibu, California'
  }
};

export const useAuditLogic = () => {
  const [currentStep, setCurrentStep] = useState('input'); // 'input', 'loading', 'results'
  const [loadingStep, setLoadingStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    amenities: [],
    price: 0,
    location: ''
  });
  const [auditResults, setAuditResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const fillSample = (type) => {
    const data = SAMPLE_DATA[type];
    if (data) {
      setFormData(data);
    }
  };

  const validateForm = () => {
    if (!formData.title || formData.title.length < 10) {
      alert('Please enter a valid title (at least 10 characters)');
      return false;
    }
    if (!formData.desc || formData.desc.length < 50) {
      alert('Please enter a valid description (at least 50 characters)');
      return false;
    }
    return true;
  };

  const calculateScores = (title, desc, amenities, price) => {
    // Search visibility (based on amenities + title keywords)
    const essentialAmenities = ['wifi', 'kitchen', 'workspace', 'self-checkin', 'free-parking'];
    const hasEssential = essentialAmenities.filter(a => amenities.includes(a)).length;
    const visibilityScore = Math.round((hasEssential / essentialAmenities.length) * 100);

    // Title score (length, specificity)
    const titleScore = Math.min(100, Math.max(20, title.length * 2));

    // First impression (title + first sentence)
    const firstSentence = desc.split('.')[0];
    const hasConcrete = /\d+/.test(firstSentence) || /bedroom|bath|sqft|floor/.test(firstSentence.toLowerCase());
    const impressionScore = Math.round((titleScore + (hasConcrete ? 80 : 30)) / 2);

    // Guest conversion (description quality)
    const wordCount = desc.split(/\s+/).length;
    const hasEmotion = /wake|feel|experience|enjoy|relax|peaceful|luxury|comfort/.test(desc.toLowerCase());
    const conversionScore = Math.min(100, Math.round((wordCount * 0.8) + (hasEmotion ? 30 : 0)));

    // Trust signals (amenities completeness)
    const trustScore = Math.min(100, amenities.length * 6);

    // Competitive edge (price vs amenities)
    const baseCompetitive = 50;
    const amenityBonus = amenities.length * 3;
    const priceFactor = price > 200 ? -10 : (price < 100 ? 10 : 0);
    const competitiveScore = Math.min(100, Math.max(10, baseCompetitive + amenityBonus + priceFactor));

    // Overall score (weighted average)
    const overall = Math.round(
      (visibilityScore * 0.20) +
      (impressionScore * 0.15) +
      (conversionScore * 0.20) +
      (trustScore * 0.15) +
      (competitiveScore * 0.30)
    );

    return {
      overall,
      visibility: visibilityScore,
      impression: impressionScore,
      conversion: conversionScore,
      trust: trustScore,
      competitive: competitiveScore
    };
  };

  const generateFindings = (title, desc, amenities, scores) => {
    const findings = [];

    // Critical: Low visibility
    if (scores.visibility < 50) {
      findings.push({
        severity: 'critical',
        title: 'Your listing is invisible in 60% of filtered searches',
        desc: 'Missing key amenities in your title and description that guests filter for.'
      });
    }

    // High: Poor title
    if (title.length < 35 || !/\d/.test(title)) {
      findings.push({
        severity: 'high',
        title: 'First impression is losing guests before they read',
        desc: 'Your title uses generic adjectives instead of concrete, searchable features.'
      });
    }

    // Medium: Weak description
    if (desc.split(/\s+/).length < 30) {
      findings.push({
        severity: 'medium',
        title: 'Guests are leaving without booking - here\'s why',
        desc: 'Short descriptions create uncertainty. Add specific details about the experience.'
      });
    }

    // Medium: Missing trust
    if (!amenities.includes('self-checkin')) {
      findings.push({
        severity: 'medium',
        title: 'Missing self check-in reduces bookings from business travelers',
        desc: '85% of business travelers filter for self check-in specifically.'
      });
    }

    return findings;
  };

  const generateRewrites = (title, desc, amenities) => {
    // Improve title
    let newTitle = title;

    // Add bedroom count if missing
    if (!/\d+BR|\d+ bedroom/.test(title.toLowerCase())) {
      newTitle = '2BR ' + newTitle;
    }

    // Add key amenities
    const keyFeatures = [];
    if (amenities.includes('wifi')) keyFeatures.push('Wifi');
    if (amenities.includes('kitchen')) keyFeatures.push('Kitchen');
    if (amenities.includes('free-parking')) keyFeatures.push('Parking');
    if (amenities.includes('workspace')) keyFeatures.push('Workspace');
    if (amenities.includes('pool')) keyFeatures.push('Pool');

    if (keyFeatures.length > 0 && !keyFeatures.some(k => title.toLowerCase().includes(k.toLowerCase()))) {
      newTitle += ` with ${keyFeatures.slice(0, 2).join(' & ')}`;
    }

    // Add location hint
    if (!/min|distance|near|steps|walk/.test(title.toLowerCase())) {
      newTitle += ' - Near Downtown';
    }

    // Generate description rewrite
    const newDesc = `Wake up to birdsong in this quietly exceptional retreat. You'll have ${amenities.includes('wifi') ? 'fast wifi' : 'reliable internet'}, a ${amenities.includes('kitchen') ? 'chef\'s kitchen' : 'full kitchen'}${amenities.includes('workspace') ? ' and dedicated workspace' : ''} - perfect for remote workers and ${desc.toLowerCase().includes('couple') ? 'couples' : 'travelers'} seeking a peaceful base.`;

    return { newTitle, newDesc };
  };

  const calculateMissingAmenities = (current) => {
    const recommended = ['workspace', 'self-checkin', 'free-parking', 'ev-charger', 'gym'];
    return recommended.filter(a => !current.includes(a));
  };

  const runAnalysisSteps = () => {
    const steps = 5;
    let currentStep = 0;

    const stepInterval = setInterval(() => {
      setLoadingStep(currentStep);
      currentStep++;
      
      if (currentStep >= steps) {
        clearInterval(stepInterval);
        // Generate results after all steps complete
        setTimeout(() => {
          generateResults();
          setCurrentStep('results');
          setIsLoading(false);
        }, 500);
      }
    }, 800);
  };

  const generateResults = () => {
    const { title, desc, amenities, price } = formData;

    // Calculate scores
    const scores = calculateScores(title, desc, amenities, price);

    // Generate findings
    const findings = generateFindings(title, desc, amenities, scores);

    // Generate rewritten copy
    const rewritten = generateRewrites(title, desc, amenities);

    // Calculate missing amenities
    const missingAmenities = calculateMissingAmenities(amenities);

    // Store results
    setAuditResults({ scores, findings, rewritten, missingAmenities });
  };

  const startAudit = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setCurrentStep('loading');
    setLoadingStep(0);

    // Simulate analysis steps
    runAnalysisSteps();
  };

  const downloadPDF = () => {
    alert('PDF download requires backend integration. For now, this is a placeholder for the waitlist CTA.');
    // In production, this would call an API endpoint to generate the PDF
    // or use a library like jsPDF/html2pdf on the client
  };

  return {
    currentStep,
    formData,
    auditResults,
    isLoading,
    loadingStep,
    updateFormData,
    startAudit,
    fillSample,
    downloadPDF
  };
};