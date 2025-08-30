# Survey Randomizer with Welcome Page

A secure A/B testing web application for research studies with customizable welcome page and modern UI design.

## Features

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





