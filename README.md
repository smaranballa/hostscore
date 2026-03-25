# HostScore React Application

A modern React.js application for HostScore - an Airbnb listing optimization tool that helps hosts analyze and improve their listings to get more bookings.

## 🚀 Features

- **Landing Page**: Beautiful, responsive homepage with hero section, features, testimonials, and pricing
- **Audit Tool**: Interactive listing analysis tool with step-by-step wizard and detailed results
- **Contact System**: Contact form with multiple inquiry types
- **Analytics Integration**: Google Analytics 4 tracking for conversions and user behavior
- **Responsive Design**: Mobile-first design that works on all devices
- **SEO Optimized**: Proper meta tags, semantic HTML, and search engine optimization

## 🛠 Technology Stack

- **React 19**: Latest version with modern hooks and features
- **React Router**: Client-side routing for single-page application
- **Vite**: Fast build tool and development server
- **CSS Modules**: Scoped styling with CSS variables for theming
- **Google Analytics**: User behavior tracking and conversion analytics
- **Formspree**: Form handling for contact and waitlist submissions

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Navigation header
│   │   └── Footer.jsx          # Site footer
│   └── ui/                     # Reusable UI components
├── pages/
│   ├── Home.jsx               # Landing page
│   ├── Audit.jsx              # Listing audit tool
│   ├── Contact.jsx            # Contact page
│   ├── Privacy.jsx            # Privacy policy
│   └── Terms.jsx              # Terms of service
├── hooks/
│   └── useAuditLogic.js       # Custom hook for audit functionality
├── utils/
│   ├── forms.js               # Form submission utilities
│   └── analytics.js           # Analytics tracking utilities
├── styles/
│   ├── global.css             # Global styles and CSS variables
│   ├── home.css               # Home page specific styles
│   ├── audit.css              # Audit tool styles
│   ├── contact.css            # Contact page styles
│   └── legal.css              # Legal pages styles
└── assets/                    # Static assets (images, fonts, etc.)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hostscore-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Update the following files with your actual service credentials:
   
   - `src/utils/forms.js`: Replace `YOUR_FORM_ID` with your Formspree form ID
   - `src/utils/analytics.js`: Replace `G-XXXXXXXXXX` with your Google Analytics 4 Measurement ID

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📋 Configuration

### Analytics Setup

1. Create a Google Analytics 4 property
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Replace the placeholder in `src/utils/analytics.js`

### Form Handling Setup

1. Create a Formspree account at https://formspree.io/
2. Create a new form and get your form ID
3. Replace the placeholder in `src/utils/forms.js`

### Deployment

The application can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **AWS S3 + CloudFront**: Upload the `dist/` folder to S3 and configure CloudFront
- **GitHub Pages**: Use the built files in the `dist/` directory

## 🎨 Customization

### Styling

The application uses CSS custom properties (variables) for easy theming. Update the values in `src/styles/global.css`:

```css
:root {
  --cream:    #FAF7F2;
  --sand:     #F0EAE0;
  --warm:     #E8DDD0;
  --ink:      #1A1612;
  --accent:   #C4622D;
  --green:    #2D6A4F;
  /* ... more variables */
}
```

### Content

- **Testimonials**: Modify the testimonials in `src/pages/Home.jsx`
- **Pricing Plans**: Update pricing information in the Home component
- **Contact Info**: Change contact details in `src/pages/Contact.jsx`

## 🔧 Key Features Explained

### Audit Tool

The audit tool (`src/pages/Audit.jsx`) provides:

- **Multi-step Form**: Collects listing details (title, description, amenities, etc.)
- **Analysis Engine**: Scores listings across multiple factors using `useAuditLogic` hook
- **Results Dashboard**: Shows detailed breakdown with actionable recommendations
- **Sample Data**: Pre-filled examples for testing

### Form Handling

All forms use the utilities in `src/utils/forms.js`:

- **Waitlist Signup**: Captures emails for early access
- **Contact Form**: Handles inquiries with subject categorization
- **Newsletter Signup**: Blog subscription functionality
- **Analytics Integration**: Tracks form submissions as conversions

### Responsive Design

The application is fully responsive with:

- **Mobile-first CSS**: Styles start with mobile and scale up
- **Flexible Grid System**: CSS Grid and Flexbox for layouts
- **Touch-friendly UI**: Large tap targets and smooth interactions
- **Performance Optimized**: Lazy loading and efficient rendering

## 📊 Analytics Events

The application tracks these key events:

- `generate_lead`: Waitlist signups
- `contact_submission`: Contact form submissions
- `newsletter_signup`: Blog newsletter subscriptions
- `cta_click`: Call-to-action button clicks
- `outbound_click`: External link clicks

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Check for syntax errors in JSX components
2. **Routing Issues**: Ensure React Router is properly configured
3. **Style Issues**: Verify CSS imports and class names
4. **Form Submissions**: Check Formspree configuration and network requests

### Development Tips

- Use React Developer Tools for component debugging
- Check browser console for JavaScript errors
- Use network tab to debug API calls
- Test responsive design with browser device emulation

## 📝 License

This project is proprietary software for HostScore. All rights reserved.

## 🤝 Contributing

This is a private project. For questions or issues, contact the development team.

---

**Built with ❤️ for Airbnb hosts worldwide**