# Josh Pirtle Portfolio Websites

Personal portfolio website for Josh Pirtle featuring AI consulting, tech support, and creative services.

## Structure

```
├── index.html          # Main homepage
├── about.html          # About page
├── contact.html        # Contact page
├── projects.html       # Projects showcase
├── blog/               # Blog articles
├── styles.css          # Main stylesheet
├── main.js             # Interactive features
├── assets/             # Images and icons
├── src/partials/       # Reusable HTML components
└── scripts/            # Build utilities
```

### Service Splash Pages

- **josh-tech-splash/** – Tech support services landing page
- **josh-ai-consulting/** – AI consulting services landing page
- **terry-weber-splash/** – Client portfolio example (Terry S. Weber)

## Development

### Updating Navigation/Footer

Shared components (nav, footer) are stored in `src/partials/`. To sync changes across all pages:

```bash
node scripts/build-partials.js
```

This updates all HTML files with the latest nav/footer from the partials.

### Assets

See `assets/README.md` for required image specifications (OG images, favicons).

## Features

- Responsive design with mobile navigation
- Dark mode with system preference detection
- Accessible (WCAG 2.1 compliant)
- SEO optimized with Open Graph tags
- No build dependencies for basic usage
