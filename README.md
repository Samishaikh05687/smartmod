# Smartmod — Premium Modular Kitchens & Wardrobes
> Furniture First. Interior Second.

## Project Structure

```
smartmod/
├── index.html              ← Main HTML file (all sections)
├── css/
│   └── style.css           ← All styles + dark/light theme variables
├── js/
│   └── main.js             ← All interactivity, animations, JS logic
└── assets/
    └── images/             ← Place your local images here (see below)
```

## Images

All images currently load from **Unsplash CDN** — they display correctly in any browser with internet access. No local images are required to run the site.

To replace with your own photos, update the `src=` attributes in `index.html`:
- Hero background: search for `id="heroBg"` → change the `background-image` URL
- Gallery, about, why, tour sections: update each `<img src="...">` tag
- Recommended size: 1920×1080px for hero, 1200×800px for gallery cards

## Dark / Light Mode

- Toggle button in the **top navigation bar** (sun/moon icon)
- Also available in the **mobile hamburger menu**
- User preference is saved in `localStorage` and persists across sessions
- All colors are controlled via CSS variables in `style.css` under `:root` (dark) and `[data-theme="light"]`

## Key Features

| Feature | Location |
|---|---|
| Custom gold cursor | `css/style.css` + `js/main.js` |
| Scroll reveal animations | `.reveal`, `.reveal-left`, `.reveal-right` classes |
| Animated number counters | `.counter` with `data-target` |
| Gallery category filter | `js/main.js` → `initGalleryFilter()` |
| Testimonial auto-slider | `js/main.js` → `initTestimonials()` |
| 3D tilt effect on tour card | `js/main.js` → `initTourCard3D()` |
| Tour modal | `js/main.js` → `initTourModal()` |
| Form validation | `js/main.js` → `initFormSubmit()` |
| Parallax hero | `js/main.js` → `initParallax()` |
| WhatsApp float button | Bottom-right corner with pre-filled message |
| Google Maps embed | `#location` section |

## 3D Tour Integration

To connect a real 3D model, replace the modal canvas content in `index.html` with:

```html
<!-- Sketchfab embed -->
<iframe
  title="3D Kitchen Model"
  src="https://sketchfab.com/models/YOUR_MODEL_ID/embed"
  allowfullscreen
  style="width:100%;height:420px;border:none;">
</iframe>
```

Or use **Matterport** for a virtual tour:
```html
<iframe
  src="https://my.matterport.com/show/?m=YOUR_MODEL_ID"
  allowfullscreen
  style="width:100%;height:420px;border:none;">
</iframe>
```

## Customization

### Colors
Edit `css/style.css` — look for the `:root` block at the top:
```css
--gold:  #C9A96E;   /* Primary gold accent */
--bg:    #0D0D0D;   /* Main background (dark mode) */
```

### Fonts
Currently using `Cormorant Garamond` (headings) + `DM Sans` (body).  
Change the Google Fonts import at the top of `css/style.css`.

### WhatsApp Number
Search for `wa.me/919876543210` in `index.html` and replace with your number.

### Contact Details
Update phone, email, and address in the `#location` and `footer` sections of `index.html`.

## Browser Support
- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓
- Mobile (iOS/Android) ✓ — custom cursor disabled on touch devices

## Tech Stack
- Pure HTML5 / CSS3 / Vanilla JS (no frameworks required)
- Ready to integrate with: Next.js, React, Vue, or any framework
- Google Fonts CDN
- Unsplash CDN for demo images
- Google Maps Embed API (free, no key required for basic embed)

---
© 2025 Smartmod. All rights reserved.
