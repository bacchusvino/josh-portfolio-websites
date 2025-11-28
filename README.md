# Josh Pirtle - Personal Website

Professional identity website for Josh Pirtle featuring mobile IT support services, AI consulting, and senior-friendly tech help.

**Live site:** [joshpirtle.com](https://joshpirtle.com)

## Features

- **Future History Design** — Clean, modern aesthetic with subtle blueprint grid patterns
- **Senior-Friendly** — Large, readable text with high contrast and accessible navigation
- **Fully Static** — Pure HTML/CSS/JS, deploys directly to Netlify with no build step
- **SEO Optimized** — Full Open Graph and Twitter Card meta tags on all pages
- **Responsive** — Mobile-first design that works on all devices
- **Accessible** — WCAG 2.1 compliant with skip links and proper ARIA labels

## Structure

```
├── index.html              # Homepage with hero, services, testimonials
├── about.html              # Full bio and background
├── services.html           # Detailed service offerings with pricing
├── contact.html            # Contact info and form
├── dispatch/               # "The Pirtle Dispatch" blog
│   ├── index.html          # Blog listing page
│   └── [post].html         # Individual blog posts
├── css/
│   └── main.css            # Complete design system
├── img/                    # Images (add your photos here)
├── josh-tech-splash/       # Legacy: Tech support splash page
├── josh-ai-consulting/     # Legacy: AI consulting splash page
└── terry-weber-splash/     # Client portfolio example
```

## Adding Photos

The site includes placeholder areas for photos. To add your images:

1. **Hero Photo** — Add `img/josh-hero.jpg` (400x500px recommended)
2. **About Photo** — Add `img/josh-about.jpg` (4:5 aspect ratio)
3. **OG Image** — Add `img/og-image.png` (1200x630px for social sharing)
4. **Favicon** — Add `img/apple-touch-icon.png` (180x180px)

Then update the HTML to replace placeholder divs with `<img>` tags.

## Adding Blog Posts

1. Create a new HTML file in `/dispatch/` (copy the template from an existing post)
2. Update the content, title, and meta tags
3. Add a card linking to the new post in `/dispatch/index.html`

## Deployment

The site deploys automatically to Netlify. Just push to the main branch:

```bash
git add .
git commit -m "Your message"
git push
```

## Contact Integration

The contact form uses Formspree. To enable:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Replace `YOUR_FORM_ID` in `contact.html` with your actual ID

## Design Tokens

The site uses CSS custom properties defined in `css/main.css`:

- **Colors:** Navy (#0D1B2A), Accent Cyan (#00D4FF), Warm Gold (#F4A261)
- **Typography:** Inter font family, senior-friendly sizing (18px base)
- **Spacing:** Consistent scale from 0.25rem to 8rem

## Credits

Built by Josh Pirtle with assistance from Claude AI.
