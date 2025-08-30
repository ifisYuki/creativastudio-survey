# Survey Randomizer with Welcome Page

A secure A/B testing web application for research studies with customizable welcome page and modern UI design.

## Features

- Modern glass morphism UI with gradient backgrounds
- Customizable welcome page with logo support
- A/B testing with configurable split ratios
- Security features including device fingerprinting and session management
- Fully responsive design
- Single configuration file
- Automatic GitHub Pages deployment

## Quick Start

### Setup
```bash
git clone <your-repo-url>
cd randomizer-redirect
npm install
npm run dev
```

### Access
- Local: `http://localhost:5173/randomizer-redirect/`
- Production: Your GitHub Pages URL

### Configuration
Edit `src/config/studyConfig.js` to customize study settings, welcome page content, questions, and A/B testing URLs.

## Table of Contents

- [UI Customization](#ui-customization)
- [Adding Your Logo](#adding-your-logo)
- [Welcome Page Setup](#welcome-page-setup)
- [Study Configuration](#study-configuration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Development](#development)

## UI Customization

### Current Design
- Background: Purple-blue gradient with glass morphism cards
- Animations: Smooth fade-in and slide-in effects
- Buttons: Gradient buttons with hover animations
- Typography: Modern, readable fonts

### Change Background Theme
Edit `src/App.css` and uncomment your preferred theme:

```css
/* Minimal Clean */
.App.theme-minimal {
  background: #f8fafc;
}

/* Warm Gradient */
.App.theme-warm {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

/* Cool Gradient */
.App.theme-cool {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

/* Dark Theme */
.App.theme-dark {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}
```

Then add the theme class to `src/App.jsx`:
```jsx
<div className="App theme-minimal"> // Add your chosen theme
```

### Customize Glass Effect
Modify the glass card transparency in `src/App.css`:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.95); /* Adjust transparency */
  backdrop-filter: blur(20px); /* Adjust blur amount */
}
```

### Button Colors
Change button style in `src/config/studyConfig.js`:
```javascript
welcomePage: {
  buttonStyle: "green", // Options: "blue", "green", "red"
  buttonText: "Start Study"
}
```

## Adding Your Logo

1. Place your PNG file in the `public` folder
2. Update `src/config/studyConfig.js`:
```javascript
welcomePage: {
  showLogo: true,
  logo: "/your-logo.png",
  logoWidth: "200px"
}
```

## Welcome Page Setup

### Basic Content
```javascript
welcomePage: {
  enabled: true, // Set to false to skip welcome page
  title: "Welcome to Our Research Study",
  subtitle: "Thank you for your interest in participating",
  description: "Study description goes here...",
  
  // Key points (optional)
  keyPoints: [
    "Takes about 10-15 minutes",
    "All responses are confidential",
    "You can withdraw at any time"
  ],
  keyPointsTitle: "Important Information:",
  
  // Additional info box (optional)
  additionalInfo: "Please ensure stable internet connection.",
  
  // Time estimate (optional)
  timeEstimate: "10-15 minutes",
  
  // Footer text (optional)
  footerText: "By continuing, you consent to participate."
}
```

### Disable Welcome Page
To skip directly to questions:
```javascript
welcomePage: {
  enabled: false
}
```

## Study Configuration

### Questions Setup
```javascript
questions: {
  q1: {
    id: 'field',
    type: 'radio', // or 'select'
    title: 'Your question here',
    subtitle: 'Optional subtitle',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ],
    nextStep: 'q2',
    disqualifyOn: ['option2'], // Options that disqualify
    required: true
  }
}
```

### A/B Testing
```javascript
abTesting: {
  enabled: true,
  groups: ['A', 'B'],
  splitRatio: 0.5, // 50/50 split
  groupNames: {
    'A': 'Control Group',
    'B': 'Treatment Group'
  }
},

formUrls: {
  'A': 'https://forms.gle/your-control-form',
  'B': 'https://forms.gle/your-treatment-form'
}
```

### Security Settings
```javascript
security: {
  preventBackNavigation: true,
  preventRightClick: true,
  preventDevTools: true,
  preventRefresh: true,
  sessionTimeout: 60000, // 1 minute
  deviceFingerprinting: true
}
```

## Testing

### Testing Checklist

#### Welcome Page Tests
- [ ] Welcome page loads at root URL
- [ ] Title and description display correctly
- [ ] Logo appears (or shows placeholder)
- [ ] Key points section is visible
- [ ] Button works and navigates to questions
- [ ] Mobile view is responsive

#### Study Flow Tests
- [ ] Questions display properly
- [ ] Answer validation works
- [ ] Disqualification logic works
- [ ] Successful completion redirects to form
- [ ] A/B testing assigns groups correctly

#### Configuration Tests
1. Test welcome page toggle (`enabled: true/false`)
2. Test different button styles (`"blue"`, `"green"`, `"red"`)
3. Test custom content changes

### Advanced Testing
- A/B testing group assignment (check DevTools console)
- Security features (device fingerprinting, completion tracking)
- Performance and mobile compatibility

## Deployment

### GitHub Pages (Automatic)
1. **Update package.json:**
   ```json
   "homepage": "https://your-username.github.io/randomizer-redirect/"
   ```

2. Commit and push:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. GitHub Actions will automatically deploy to GitHub Pages

### Manual Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

### Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

### Project Structure
```
src/
├── components/
│   ├── WelcomePage.jsx     # Welcome screen
│   ├── Randomizor.jsx      # Main study flow
│   ├── QuestionForm.jsx    # Question renderer
│   ├── RadioQuestion.jsx   # Radio button questions
│   ├── SelectQuestion.jsx  # Dropdown questions
│   └── ...
├── config/
│   └── studyConfig.js      # Main configuration
├── utils/
│   ├── abTesting.js        # A/B testing logic
│   └── security.js         # Security utilities
└── ...
```

### Key Files to Customize
- `src/config/studyConfig.js` - Main configuration
- `src/App.css` - UI styling and themes
- `src/components/WelcomePage.jsx` - Welcome page component
- `public/` - Static assets (logos, images)

## Troubleshooting

### Common Issues
- Server won't start: Kill node processes and restart
- Changes not appearing: Hard refresh browser (Ctrl+F5)
- Welcome page not showing: Check `enabled: true` in config
- Logo not displaying: Verify file path and `showLogo: true`

## Production Checklist

Before deploying:
- [ ] Welcome page content finalized
- [ ] All text proofread and accurate
- [ ] Logo displaying correctly
- [ ] Button style matches preferences
- [ ] Time estimate accurate
- [ ] Consent text appropriate
- [ ] A/B testing URLs correct
- [ ] Debug mode disabled (`debug.enabled: false`)
- [ ] Security features enabled
- [ ] Mobile experience tested
- [ ] All questions and logic tested
- [ ] Homepage URL updated in package.json

