/* ══════════════════════════════════════════════════════════════
   PORTFOLIO — script.js
   Typing effect · scroll reveal · skill bars · counters ·
   navbar · mobile menu · lightbox · contact form
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ---------- Navbar: scrolled state ---------- */
  const navbar = $('#navbar');
  const onNavScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onNavScroll, { passive: true });
  onNavScroll();

  /* ---------- Scroll progress bar ---------- */
  const progress = $('#scrollProgress');
  const onProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onProgress, { passive: true });
  onProgress();

  /* ---------- Mobile menu ---------- */
  const hamburger = $('#hamburger');
  const navMenu = $('#navMenu');
  const toggleMenu = (open) => {
    navMenu.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  hamburger.addEventListener('click', () => toggleMenu(!navMenu.classList.contains('open')));
  $$('.nav-link, .nav-resume').forEach((el) => el.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Active nav link while scrolling ---------- */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Typing effect ---------- */
  // ✏️ UPDATE: these roles type one-by-one under your name
  const roles = ['CSE Student', 'Web Developer', 'Python Programmer', 'Django Developer', 'Problem Solver'];
  const typingEl = $('#typing');
  let roleIdx = 0, charIdx = 0, deleting = false;
  function typeLoop() {
    const word = roles[roleIdx];
    typingEl.textContent = word.slice(0, charIdx);
    if (!deleting && charIdx < word.length) { charIdx++; setTimeout(typeLoop, 90); }
    else if (!deleting && charIdx === word.length) { deleting = true; setTimeout(typeLoop, 1600); }
    else if (deleting && charIdx > 0) { charIdx--; setTimeout(typeLoop, 45); }
    else { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(typeLoop, 350); }
  }
  if (typingEl) typeLoop();

  /* ---------- Scroll reveal ---------- */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$('.reveal').forEach((el) => revealObs.observe(el));

  /* ---------- Skill bars fill on scroll ---------- */
  const fillObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.width = entry.target.dataset.width + '%';
        fillObs.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );
  $$('.skill-fill').forEach((el) => fillObs.observe(el));

  /* ---------- Animated counters ---------- */
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimal || '0', 10);
        const duration = 1600;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target.toFixed(decimals);
        };
        requestAnimationFrame(step);
        counterObs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  $$('.stat-num').forEach((el) => counterObs.observe(el));

  /* ---------- Back to top ---------- */
  const backTop = $('#backTop');
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener(
    'scroll',
    () => backTop.classList.toggle('show', window.scrollY > 600),
    { passive: true }
  );

  /* ---------- Certificate lightbox ---------- */
  const lightbox = $('#lightbox');
  const lbImg = $('#lightboxImg');
  const lbCaption = $('#lightboxCaption');
  const certItems = [];
  let lbIndex = 0;

  $$('.cert-card').forEach((card, i) => {
    const img = card.querySelector('.cert-thumb img');
    if (!img) return;
    certItems.push({ src: img.dataset.lightboxImg, caption: img.dataset.lightboxTitle });
    card.addEventListener('click', () => openLightbox(i));
  });

  function openLightbox(index) {
    if (!certItems.length) return;
    lbIndex = (index + certItems.length) % certItems.length;
    lbImg.src = certItems[lbIndex].src;
    lbCaption.textContent = certItems[lbIndex].caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  $('#lightboxClose').addEventListener('click', closeLightbox);
  $('#lightboxPrev').addEventListener('click', () => openLightbox(lbIndex - 1));
  $('#lightboxNext').addEventListener('click', () => openLightbox(lbIndex + 1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(lbIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(lbIndex + 1);
  });

  /* ---------- Image fallbacks (missing files → styled placeholder) ---------- */
  $$('.cert-thumb img').forEach((img) => {
    const hide = () => img.classList.add('img-hidden');
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide);
  });
  $$('.avatar-img').forEach((img) => {
    const fallback = () => img.parentElement.classList.add('no-photo');
    if (img.complete && img.naturalWidth === 0) fallback();
    img.addEventListener('error', fallback);
  });

  /* ---------- Contact form (FormSubmit — free) ---------- */
  const form = $('#contactForm');
  const formStatus = $('#formStatus');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      formStatus.className = 'form-status';
      formStatus.textContent = '';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          formStatus.className = 'form-status success';
          formStatus.textContent = '✅ Message sent! I will get back to you soon.';
          form.reset();
        } else {
          throw new Error('HTTP ' + res.status);
        }
      } catch (err) {
        formStatus.className = 'form-status error';
        formStatus.textContent = "⚠️ Could not send — make sure you've set your email in index.html and activated FormSubmit.";
      }
      btn.disabled = false;
      btn.textContent = original;
    });
  }

  /* ---------- Footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();