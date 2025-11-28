# Terry Weber Portfolio Section

Executive portfolio site for Terry Weber — Transformational CEO, Healthcare Innovator, and Champion for Women's Scientific Equity.

## Site Structure

```
/portfolio/terry-weber/
├── index.html              # Main landing page
├── css/
│   └── terry-weber.css     # Design system & styles
├── blog/
│   ├── index.html                              # Blog hub (The Weber Brief)
│   ├── scientific-equity-womens-health.html    # Blog post
│   ├── scaling-founder-led-companies.html      # Blog post
│   └── automotive-lessons-healthcare.html      # Blog post
├── media/
│   └── index.html          # Press & Media page
├── resume/
│   └── index.html          # Board Resume page
├── contact/
│   └── index.html          # Contact page
├── img/                    # Images (add these)
├── assets/                 # PDFs and documents (add these)
└── README.md               # This file
```

## Setup Instructions

### 1. Add Images

Place the following images in the `/img/` folder:

- `terry-weber-hero.jpg` — Professional headshot (white background recommended)
- `og-image.png` — Open Graph image (1200x630px) for social sharing

### 2. Add Board Resume PDF

Place Terry's board resume PDF in:
```
/assets/terry-weber-board-resume.pdf
```

### 3. Configure Contact Form

The contact form uses Formspree. Replace `YOUR_FORM_ID` in `/contact/index.html`:

```html
<form action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="POST">
```

To get a form ID:
1. Go to [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the form endpoint ID

### 4. Update LinkedIn Link

In `/contact/index.html`, update the LinkedIn profile URL:

```html
<a href="https://linkedin.com/in/ACTUAL_LINKEDIN_ID" ...>
```

## Design System

The Terry Weber section uses a corporate-clean design with:

- **Primary Colors:** Navy (#1a2744), Charcoal (#2c3e50)
- **Accent Color:** Teal (#0d9488)
- **Typography:** Inter (Google Fonts)
- **Spacing:** 4px base unit system

All CSS is namespaced with `.tw-` prefix to avoid conflicts with parent site.

## Blog Posts

### Adding New Blog Posts

1. Copy an existing post HTML file as template
2. Update the content, metadata, and category
3. Add entry to `/blog/index.html` with appropriate `data-category` attribute

### Blog Categories

- `womens-health` — Women's Health & Scientific Equity
- `leadership` — Leadership & Transformation
- `innovation` — Healthcare Innovation
- `culture` — Mentorship & Culture

## Deployment

This section is designed to deploy on Netlify alongside the parent Josh Pirtle portfolio site.

### URL Structure

- Landing: `/portfolio/terry-weber/`
- Blog: `/portfolio/terry-weber/blog/`
- Media: `/portfolio/terry-weber/media/`
- Resume: `/portfolio/terry-weber/resume/`
- Contact: `/portfolio/terry-weber/contact/`

## Accessibility

- WCAG 2.1 AA compliant color contrast
- Semantic HTML structure
- Skip links for keyboard navigation
- ARIA labels on interactive elements
- Reduced motion support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

---

**Note:** This section replaces all content previously associated with Mattioli-Weber Consulting, which is permanently closed. Do not reference or link to legacy Mattioli-Weber sites.
