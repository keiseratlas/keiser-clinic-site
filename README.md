# The Keiser Clinic Website

Static website replicated from Webflow with enhancements for performance and monitoring.

## Quick Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Go to https://app.netlify.com/drop
2. Drag the entire `keiser-clinic-site` folder onto the page
3. Your site will be live in ~30 seconds

### Option 2: Netlify CLI
```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Deploy from this directory
cd /Users/keiseradmin/keiser-ai/keiser-clinic-site
netlify deploy --prod
```

## Structure

```
keiser-clinic-site/
├── index.html          # Main homepage
├── netlify.toml        # Netlify config (redirects, headers, caching)
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # Navigation, slider, animations
├── images/             # 55 optimized images from keiserclinic.com
└── pages/
    └── pots.html       # POTS-specific landing page
```

## Features

- Mobile-responsive design
- Smooth scroll animations
- Treatment slider with auto-advance
- Scroll-triggered fade-in animations
- Performance optimizations (lazy loading, caching headers)
- SEO meta tags and Open Graph support
- POTS landing page at /pots

## Pages

- **/** - Main homepage
- **/pots** - POTS-specific landing page (redirects to /pages/pots.html)
- **/dysautonomia** - Alias for POTS page
- **/consultation** - Redirects to Calendly

## Customization

### Update Calendly Link
Replace `https://calendly.com/keiserclinic` in:
- `index.html` (CTA section)
- `pages/pots.html` (all CTA buttons - replace "YOUR_CALENDLY_LINK")

### Add Google Analytics
Add to `<head>` in both HTML files:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Performance

- All images from original Webflow CDN (full resolution preserved)
- CSS/JS/images cached for 1 year via Netlify headers
- HTML cached with must-revalidate for instant updates
- Security headers enabled (X-Frame-Options, XSS Protection, etc.)

