/* ===================================================
   SMARTMOD — Premium Modular Kitchens & Wardrobes
   main.js — All Interactivity & Animations
=================================================== */

(function () {
  'use strict';

  /* ── DOM Ready ──────────────────────────────── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initTheme();
    initCursor();
    initNav();
    initHero();
    initRevealObserver();
    initCounters();
    initGalleryFilter();
    initTestimonials();
    initTourCard3D();
    initTourModal();
    initFormSubmit();
    initParallax();
  }

  /* ── THEME ──────────────────────────────────── */
  function initTheme() {
    const saved = localStorage.getItem('smartmod-theme') || 'light';
    applyTheme(saved);

    // All toggle buttons (desktop + mobile)
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(current === 'light' ? 'dark' : 'light');
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('smartmod-theme', theme);

    // Update hero BG overlay already handled by CSS
    // Update consult bg
    const consult = document.getElementById('consult');
    if (consult) {
      // bg image handled in HTML inline style
    }
  }

  /* ── CUSTOM CURSOR ──────────────────────────── */
  function initCursor() {
    const cursor    = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    if (!cursor || !cursorRing) return;

    // Hide on touch devices
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      cursorRing.style.display = 'none';
      document.body.style.cursor = 'auto';
      return;
    }

    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    // Smooth ring follow
    function animateRing() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects
    const interactives = 'a, button, .spec-card, .gallery-item, .storage-card, .testi-btn, .gallery-tab, .tour-visual, input, select, textarea, .play-btn, .wa-btn';
    document.querySelectorAll(interactives).forEach(attachHover);

    const obs = new MutationObserver(() => {
      document.querySelectorAll(interactives).forEach(attachHover);
    });
    obs.observe(document.body, { childList: true, subtree: true });

    function attachHover(el) {
      if (el._cursorBound) return;
      el._cursorBound = true;
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-grow');
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorRing.style.opacity = '0.25';
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-grow');
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.opacity = '0.55';
      });
    }

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorRing.style.opacity = '0.55';
    });
  }

  /* ── NAVIGATION ─────────────────────────────── */
  function initNav() {
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileClose = document.getElementById('mobileClose');

    if (!navbar) return;

    // Scroll behaviour
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 70);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile nav
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
      mobileClose && mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
      mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileNav.classList.remove('open'));
      });
    }

    // Smooth scroll for nav CTA
    document.querySelectorAll('[data-scroll]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.querySelector(btn.dataset.scroll);
        target && target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ── HERO ───────────────────────────────────── */
  function initHero() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    // Trigger Ken Burns
    requestAnimationFrame(() => hero.classList.add('loaded'));
  }

  /* ── PARALLAX ───────────────────────────────── */
  function initParallax() {
    const heroBg = document.getElementById('heroBg');
    if (!heroBg) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight * 1.2) {
        heroBg.style.transform = `scale(1) translateY(${scrolled * 0.28}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── SCROLL REVEAL ──────────────────────────── */
  function initRevealObserver() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger via inline delay if set
          const delay = parseFloat(entry.target.style.transitionDelay) || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    els.forEach(el => io.observe(el));
  }

  /* ── COUNTERS ───────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => io.observe(c));
  }

  function animateCounter(el) {
    const target   = +el.dataset.target;
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ── GALLERY FILTER ─────────────────────────── */
  function initGalleryFilter() {
    const tabs  = document.querySelectorAll('.gallery-tab');
    const items = document.querySelectorAll('.gallery-item');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const cat = tab.dataset.cat;
        items.forEach(item => {
          const match = cat === 'all' || item.dataset.cat === cat;
          item.style.opacity  = match ? '1' : '0.2';
          item.style.filter   = match ? 'none' : 'grayscale(80%)';
          item.style.pointerEvents = match ? 'auto' : 'none';
        });
      });
    });
  }

  /* ── TESTIMONIALS SLIDER ────────────────────── */
  function initTestimonials() {
    const track = document.getElementById('testiTrack');
    const slides = document.querySelectorAll('.testi-slide');
    const prevBtn = document.getElementById('testiPrev');
    const nextBtn = document.getElementById('testiNext');
    const dotsContainer = document.getElementById('testiDots');

    if (!track || !slides.length) return;

    let current = 0;
    let autoTimer;

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.testi-dot') : [];

    function goTo(n) {
      current = ((n % slides.length) + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 5200);
    }

    prevBtn && prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    nextBtn && nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAuto(); }));

    // Touch swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
    });

    startAuto();
  }

  /* ── TOUR CARD 3D TILT ──────────────────────── */
  function initTourCard3D() {
    const wrap = document.getElementById('tourVisual');
    const img  = document.getElementById('tourImg');
    if (!wrap || !img) return;

    wrap.addEventListener('mousemove', e => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      img.style.transform  = `scale(1.06) rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
      img.style.transition = 'transform 0.1s ease';
    });

    wrap.addEventListener('mouseleave', () => {
      img.style.transform  = 'scale(1) rotateY(0) rotateX(0)';
      img.style.transition = 'transform 0.6s ease';
    });
  }

  /* ── TOUR MODAL ─────────────────────────────── */
  function initTourModal() {
    const modal = document.getElementById('tourModal');
    if (!modal) return;

    document.querySelectorAll('.open-tour').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    document.querySelectorAll('.close-tour').forEach(btn => {
      btn.addEventListener('click', closeTourModal);
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) closeTourModal();
    });

    function closeTourModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ── FORM SUBMIT ────────────────────────────── */
  function initFormSubmit() {

   }

})();

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const duration = 2000; 
  const increment = target / (duration / 16);

  let count = 0;

  const updateCounter = () => {
    count += increment;

    if (count < target) {
      counter.innerText = Math.floor(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
};


/* Trigger when section appears */

const statsSection = document.querySelector("#stats");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {

      counters.forEach(counter => {
        startCounter(counter);
      });

      observer.unobserve(statsSection);

    }

  });
}, { threshold: 0.5 });

observer.observe(statsSection);

/* ──────────────────────────────────────────────────────
   EMAILJS CONFIGURATION
   Replace the three placeholders below with your
   actual EmailJS credentials before going live.
────────────────────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = 'qE0IPflYbWpzMxFVV';   // Dashboard → Account → Public Key
const EMAILJS_SERVICE_ID  = 'service_sci3rg8';   // Dashboard → Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_q0w7qi8';  // Dashboard → Email Templates → Template ID




emailjs.init(EMAILJS_PUBLIC_KEY);

const form      = document.getElementById('consultForm');
const submitBtn = document.getElementById('formSubmitBtn');
const toast     = document.getElementById('toast');
const toastMsg  = document.getElementById('toast-msg');
const toastIcon = document.getElementById('toast-icon');

let toastTimer = null;

// Check 1: Is the form found?
console.log('Form:', document.getElementById('consultForm'));

// Check 2: Is the button found?
console.log('Button:', document.getElementById('formSubmitBtn'));

// Check 3: Is emailjs loaded?
console.log('EmailJS:', typeof emailjs);

// Check 4: Is your script loaded?
console.log('Scripts:', [...document.scripts].map(s => s.src));

function showToast(type, message) {
  if (toastTimer) clearTimeout(toastTimer);
  toast.className = 'toast ' + type;
  toastIcon.textContent = type === 'success' ? '✓' : '✕';
  toastMsg.textContent = message;
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4800);
}

function validateForm() {
  const name  = document.getElementById('c-name').value.trim();
  const phone = document.getElementById('c-phone').value.trim();

  if (!name) {
    showToast('error', 'Please enter your full name.');
    document.getElementById('c-name').focus();
    return false;
  }
  if (!phone) {
    showToast('error', 'Please enter your phone number.');
    document.getElementById('c-phone').focus();
    return false;
  }
  if (!/^[0-9+\-\s()]{7,15}$/.test(phone)) {
    showToast('error', 'Please enter a valid phone number.');
    document.getElementById('c-phone').focus();
    return false;
  }
  return true;
}

function buildParams() {
  return {
    from_name      : document.getElementById('c-name').value.trim(),
    phone          : document.getElementById('c-phone').value.trim(),
    email          : document.getElementById('c-email').value.trim()    || '—',
    city           : document.getElementById('c-city').value.trim()     || '—',
    furniture_type : document.getElementById('c-furniture').value       || '—',
    budget         : document.getElementById('c-budget').value          || '—',
    timeline       : document.getElementById('c-timeline').value        || '—',
    message        : document.getElementById('c-msg').value.trim()      || '—',
    reply_to       : document.getElementById('c-email').value.trim()    || '',
  };
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  if (!validateForm()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  const params = buildParams();

  // ── LOG: show exactly what is being sent ──────────────────
  console.group('EmailJS — sending...');
  console.log('Service ID  :', EMAILJS_SERVICE_ID);
  console.log('Template ID :', EMAILJS_TEMPLATE_ID);
  console.log('Params      :', params);
  console.groupEnd();

  try {
    const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);

    // ── SUCCESS ───────────────────────────────────────────────
    console.group('EmailJS — SUCCESS');
    console.log('Status :', response.status);   // 200 = sent
    console.log('Text   :', response.text);     // "OK"
    console.groupEnd();

    showToast('success', 'Enquiry sent! We\'ll be in touch within 24 hours.');
    form.reset();

  } catch (err) {

    // ── ERROR ─────────────────────────────────────────────────
    console.group('EmailJS — FAILED');
    console.log('Status :', err.status);
    console.log('Text   :', err.text);

    if (err.status === 400) {
      console.warn('400 → Bad request. Check template variable names match buildParams() exactly.');
    } else if (err.status === 401) {
      console.warn('401 → Unauthorized. Check EMAILJS_PUBLIC_KEY is correct.');
    } else if (err.status === 404) {
      console.warn('404 → Not found. Check EMAILJS_SERVICE_ID and EMAILJS_TEMPLATE_ID.');
    } else if (err.status === 429) {
      console.warn('429 → Rate limit hit. Free plan allows 200 emails/month.');
    }

    console.groupEnd();

    showToast('error', 'Something went wrong. Please try again or call us directly.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Get Free Design &rarr;';
  }
});

/* ===================================================
   SPEC CARD POPUP MODAL — Data & Logic
=================================================== */
 
/* ── Data for each card ─────────────────────────── */
const SPEC_DATA = {

'modular-kitchens': {
tag: 'Modular Kitchens',
title: 'Modular Kitchen Designs',
waMsg: 'Hello Smartmod, I am interested in Modular Kitchen designs. Please share more details.',
desc: 'Our modular kitchens combine precision-engineered cabinetry with smart storage to transform your cooking space into a stunning, functional hub. Available in L-shape, U-shape, parallel, island, and straight layouts — every design is tailored around your space and lifestyle.',

images: [
{ url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=90&auto=format&fit=crop', caption: 'Graphite Dark Finish — Handleless Design' },
{ url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=90&auto=format&fit=crop', caption: 'White Lacquered Kitchen — Island Layout' },
{ url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=90&auto=format&fit=crop', caption: 'Warm Wood Finish — L-Shape Layout' },
{ url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=90&auto=format&fit=crop', caption: 'Minimal White — Parallel Kitchen' }
],

features: [
'Marine-grade plywood carcass (BWR certified)',
'Soft-close hinges & drawer channels',
'Quartz / granite / Corian countertops',
'Hettich / Hafele / Blum premium hardware',
'Modular sizes for perfect fit',
'Termite & moisture proof finish',
'Integrated lighting options',
'5-year structural warranty'
],

packages: [
{ name: 'Essential', note: 'HDHMR board, membrane shutters, SS sink' },
{ name: 'Premium', note: 'Marine ply, lacquered finish, Hettich fittings' },
{ name: 'Luxury', note: 'Imported ply, handleless, Blum fittings, quartz top' }
]
},

'sliding-wardrobes': {
tag: 'Sliding Wardrobes',
title: 'Sliding Door Wardrobes',
waMsg: 'Hello Smartmod, I am interested in Sliding Wardrobe designs. Please share more details.',
desc: 'Our floor-to-ceiling sliding wardrobes are engineered for smooth, silent gliding doors — with fully customizable interiors for clothes, accessories, and daily essentials.',

images: [
{ url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=900&q=90&auto=format&fit=crop', caption: 'Full Mirror Sliding Wardrobe — Bedroom Suite' },
{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=90&auto=format&fit=crop', caption: 'Walnut Veneer — 3-Door Slider' },
{ url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=90&auto=format&fit=crop', caption: 'White Gloss — Floor-to-Ceiling' },
{ url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=90&auto=format&fit=crop', caption: 'Dark Charcoal — Master Bedroom' }
],

features: [
'Silent German-rail sliding system',
'Soft-close mechanism on all panels',
'Mirror / glass / acrylic / veneer doors',
'Fully modular interior organizers',
'LED interior strip lighting',
'Anti-rust aluminum frame',
'Floor-to-ceiling height available',
'3-year mechanism warranty'
],

packages: [
{ name: 'Essentials', note: 'HDHMR carcass, membrane shutters, basic fittings' },
{ name: 'Premium', note: 'Marine ply, mirror doors, Hettich channels' },
{ name: 'Luxury', note: 'Imported ply, glass doors, LED, soft-close' }
]
},

'walkin-wardrobes': {
tag: 'Walk-in Wardrobes',
title: 'Luxury Walk-in Wardrobes',
waMsg: 'Hello Smartmod, I am interested in Walk-in Wardrobe designs. Please share more details.',
desc: 'Step into your own personal luxury boutique with fully bespoke wardrobe layouts.',

images: [
{ url: 'https://images.unsplash.com/photo-1556909011-b35f6a7b4e4b?w=900&q=90&auto=format&fit=crop', caption: 'His & Hers Walk-in — Full Layout' },
{ url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=900&q=90&auto=format&fit=crop', caption: 'Shoe Display Wall — LED Backlit' },
{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=90&auto=format&fit=crop', caption: 'Open Shelving + Island Dresser' },
{ url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=90&auto=format&fit=crop', caption: 'Luxury Boutique Style — Marble Finish' }
],

features: [
'Custom-zoned clothing areas',
'Velvet-lined jewellery drawers',
'Island dresser with vanity mirror',
'Shoe display with LED backlight',
'Pull-out trouser hangers',
'Perfume & handbag display shelves',
'Dimmable LED lighting',
'Full-length mirror'
],

packages: [
{ name: 'Standard', note: 'Open shelving, hanging space, drawers' },
{ name: 'Premium', note: 'Zoned layout, LED lighting, velvet drawers' },
{ name: 'Signature', note: 'Island unit, glass displays, luxury finish' }
]
},

 'smart-storage': {
    tag: 'Smart Storage',
    title: 'Smart Storage Solutions',
    waMsg: 'Hello Smartmod, I want to know more about Smart Storage Solutions. Please guide me.',
    desc: 'Our smart storage systems are engineered to solve the most common kitchen and wardrobe challenges — wasted corners, unreachable shelves, cluttered countertops. Using the best European hardware, every mechanism is designed for daily ease and long-lasting performance.',
    images: [
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=90&auto=format&fit=crop', caption: 'Magic Corner Carousel — Zero Wasted Space' },
      { url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=90&auto=format&fit=crop', caption: 'Pull-Out Pantry Tower — Full Visibility' },
      { url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=90&auto=format&fit=crop', caption: 'Drawer Organizers — Cutlery & Utensils' },
      { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=90&auto=format&fit=crop', caption: 'Lift-Up Wall Cabinet — Easy Access' },
    ],
    features: [
      'Magic corner carousel units',
      'Pull-out pantry & tall unit systems',
      'Cutlery and utensil drawer organizers',
      'Lift-up Aventos wall cabinet mechanisms',
      'Wicker and stainless steel pull-outs',
      'Under-sink organizers',
      'Plate & glass storage inserts',
      'All Hettich / Hafele / Blum fittings',
    ],
    packages: [
      { name: 'Basic Kit',  note: 'Single pull-out or corner unit with fitting' },
      { name: 'Kitchen Set', note: 'Complete set: corner + pantry + drawers' },
      { name: 'Full Home', note: 'Kitchen + wardrobe smart storage package' },
    ],
  },
 
  'custom-furniture': {
    tag: 'Custom Furniture',
    title: 'Bespoke Custom Furniture',
    waMsg: 'Hello Smartmod, I am interested in Custom Furniture. Please share designs and pricing.',
    desc: 'Beyond kitchens and wardrobes, Smartmod creates stunning custom furniture for every room in your home. From entertainment units to study setups, crockery displays to shoe cabinets — all manufactured to your exact dimensions and design preferences.',
    images: [
      { url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=90&auto=format&fit=crop', caption: 'Floating TV Unit — Living Room' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=90&auto=format&fit=crop', caption: 'Crockery Display Unit — Dining Room' },
      { url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=90&auto=format&fit=crop', caption: 'Home Office Study Setup' },
      { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=90&auto=format&fit=crop', caption: 'Foyer Shoe Cabinet — Entry Lobby' },
    ],
    features: [
      'TV & entertainment units',
      'Crockery and bar display units',
      'Study tables and bookshelf units',
      'Shoe cabinets & foyer consoles',
      'Pooja & display cabinets',
      'Kids room furniture',
      'Floating shelves & partition units',
      'Factory-made, site-assembled',
    ],
    packages: [
      { name: 'Single Unit', note: 'One custom piece — TV unit / shoe rack etc.' },
      { name: 'Room Package', note: 'Full room furniture set + installation' },
      { name: 'Full Home',  note: 'All rooms — kitchen, wardrobes, furniture' },
    ],
  },
 
  'installation': {
    tag: 'Installation Service',
    title: 'Professional Installation',
    
    waMsg: 'Hello Smartmod, I want to know about your installation process and timelines.',
    desc: 'At Smartmod, installation is not an afterthought — it is part of our craft. Our factory-trained installation teams arrive with all pre-cut, pre-finished components and assemble your complete kitchen or wardrobe on-site with zero dust, zero mess, and zero delays.',
    images: [
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=90&auto=format&fit=crop', caption: 'Day 1 — Carcass Assembly & Levelling' },
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=90&auto=format&fit=crop', caption: 'Day 2 — Shutter Fitting & Hardware' },
      { url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=90&auto=format&fit=crop', caption: 'Day 3 — Countertop & Finishing' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=90&auto=format&fit=crop', caption: 'Final Handover — Quality Check Complete' },
    ],
    features: [
      'Installation in 3–5 working days',
      'Factory-trained installation team',
      'Pre-cut & pre-finished modules',
      'Zero on-site sawing or drilling dust',
      'Precision laser levelling',
      'Handles & hardware calibration',
      'Post-installation quality audit',
      'Site cleaned & ready on handover',
    ],
    packages: [
      { name: 'Kitchen Only', note: 'Included with all modular kitchen orders' },
      { name: 'Wardrobe Only', note: 'Included with all wardrobe orders' },
      { name: 'Combo Project', note: 'Kitchen + wardrobe — priority scheduling' },
    ],
  },


};


/* ── Modal Engine ──────────────────────────────── */
(function initSpecModal() {

const backdrop = document.getElementById('specModalBackdrop');
const closeBtn = document.getElementById('specModalClose');
const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const counter = document.getElementById('carouselCounter');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalFeats = document.getElementById('modalFeatures');
const modalPkgs = document.getElementById('modalPackages');
const modalWA = document.getElementById('modalWhatsApp');

if (!backdrop) return;

let currentSlide = 0;
let totalSlides = 0;
let autoTimer = null;
let touchStartX = 0;


/* Open modal */
document.querySelectorAll('[data-modal]').forEach(card => {

card.addEventListener('click', () => openModal(card.dataset.modal));

card.addEventListener('keydown', e => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
openModal(card.dataset.modal);
}
});

});


function openModal(key) {

const d = SPEC_DATA[key];
if (!d) return;

modalTag.textContent = d.tag;
modalTitle.textContent = d.title;
modalDesc.textContent = d.desc;

/* WhatsApp link */
modalWA.href =
'https://wa.me/7999477877?text=' + encodeURIComponent(d.waMsg);

/* Features */
modalFeats.innerHTML = d.features.map(f => `
<div class="spec-modal-feature">
<div class="spec-modal-feature-dot"></div>
<span>${f}</span>
</div>
`).join('');

/* Packages */
modalPkgs.innerHTML = d.packages.map((p,i)=>`
<div class="spec-pkg ${i===1?'selected':''}"
onclick="this.parentElement.querySelectorAll('.spec-pkg').forEach(x=>x.classList.remove('selected'));this.classList.add('selected')">

<div class="spec-pkg-name">${p.name}</div>
<div class="spec-pkg-note">${p.note}</div>

</div>
`).join('');

/* Carousel */
buildCarousel(d.images);

backdrop.classList.add('open');
document.body.style.overflow='hidden';

backdrop.querySelector('.spec-modal-body').scrollTop=0;

startAuto();
}


/* Carousel */
function buildCarousel(images){

totalSlides = images.length;
currentSlide = 0;

track.innerHTML = images.map(img=>`
<div class="carousel-slide">
<img src="${img.url}" alt="${img.caption}" loading="lazy">
<div class="carousel-slide-caption">${img.caption}</div>
</div>
`).join('');

dotsWrap.innerHTML = images.map((_,i)=>`
<div class="carousel-dot ${i===0?'active':''}"></div>
`).join('');

updateCarousel(0,false);
}


function updateCarousel(n,animate){

currentSlide=((n%totalSlides)+totalSlides)%totalSlides;

track.style.transition = animate===false
?'none'
:'transform 0.55s cubic-bezier(0.4,0,0.2,1)';

track.style.transform=`translateX(-${currentSlide*100}%)`;

counter.textContent=`${currentSlide+1} / ${totalSlides}`;

dotsWrap.querySelectorAll('.carousel-dot').forEach((d,i)=>{
d.classList.toggle('active',i===currentSlide);
});
}


prevBtn.addEventListener('click',()=>{
updateCarousel(currentSlide-1,true);
startAuto();
});

nextBtn.addEventListener('click',()=>{
updateCarousel(currentSlide+1,true);
startAuto();
});


dotsWrap.addEventListener('click',e=>{
if(e.target.classList.contains('carousel-dot')){
const idx=[...dotsWrap.children].indexOf(e.target);
updateCarousel(idx,true);
startAuto();
}
});


/* Touch swipe */
track.addEventListener('touchstart',e=>{
touchStartX=e.touches[0].clientX;
},{passive:true});


track.addEventListener('touchend',e=>{
const diff=touchStartX-e.changedTouches[0].clientX;
if(Math.abs(diff)>48){
updateCarousel(currentSlide+(diff>0?1:-1),true);
startAuto();
}
});


function startAuto(){

clearInterval(autoTimer);

autoTimer=setInterval(()=>{
updateCarousel(currentSlide+1,true);
},3500);

}


/* Close modal */
function closeModal(){

backdrop.classList.remove('open');
document.body.style.overflow='';
clearInterval(autoTimer);

}

closeBtn.addEventListener('click',closeModal);

backdrop.addEventListener('click',e=>{
if(e.target===backdrop) closeModal();
});

document.addEventListener('keydown',e=>{
if(e.key==='Escape') closeModal();
});

})();


function initLightbox() {
  const backdrop = document.getElementById('lightbox');
  const track    = document.getElementById('lb-track');
  const dotsWrap = document.getElementById('lb-dots');
  const counter  = document.getElementById('lb-counter');

  let current = 0;
  let slides  = [];
  let startX  = 0;

  function buildSlides(images, title) {
    track.innerHTML  = '';
    dotsWrap.innerHTML = '';
    slides = images;

    images.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'lightbox-slide';
      slide.innerHTML = `
        <img src="${src}" alt="${title} — view ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">
        <p class="lightbox-caption">${title} &nbsp;·&nbsp; ${i + 1} of ${images.length}</p>
      `;
      track.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'lightbox-dot';
      dot.setAttribute('aria-label', `View ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    counter.textContent = `${current + 1} / ${slides.length}`;
    dotsWrap.querySelectorAll('.lightbox-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  function open(images, title) {
    buildSlides(images, title);
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    goTo(0);
  }

  function close() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach click to every gallery item
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const raw    = item.getAttribute('data-images');
      const title  = item.getAttribute('data-title')
                  || item.querySelector('.gallery-item-title')?.textContent
                  || '';
      const images = raw ? JSON.parse(raw) : [item.querySelector('img').src];
      open(images, title);
    });
  });

  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('lb-next').addEventListener('click', () => goTo(current + 1));

  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });

  document.addEventListener('keydown', e => {
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'Escape')     close();
  });

  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });
}

document.addEventListener('DOMContentLoaded', initLightbox);