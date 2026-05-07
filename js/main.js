/* =========================================================
   FilmEclipse — main.js
   Nav | Hamburger | FAQ | Stats Counter | Before/After | Scroll Animations | Form
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Language toggle ---- */
  initLanguage();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  /* ---- Sticky nav frosted glass ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll('.mobile-link, .mobile-actions a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMenu();
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      const answerId = trigger.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      /* Close all */
      document.querySelectorAll('.faq-trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const a = document.getElementById(t.getAttribute('aria-controls'));
        if (a) {
          a.style.maxHeight = '0';
          a.setAttribute('aria-hidden', 'true');
        }
        t.querySelector('.faq-icon').textContent = '+';
      });

      if (!isOpen && answer) {
        trigger.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.setAttribute('aria-hidden', 'false');
        trigger.querySelector('.faq-icon').textContent = '−';
      }
    });
  });

  /* ---- Scroll-triggered fade-up ---- */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  /* ---- Stat counter animation ---- */
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

  function animateStat(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ---- Before / After sliders ---- */
  document.querySelectorAll('.ba-container').forEach(container => {
    const range = container.querySelector('.ba-range');
    const handle = container.querySelector('.ba-handle');

    function update(val) {
      container.style.setProperty('--split', val + '%');
    }

    range.addEventListener('input', () => update(range.value));

    /* Mouse drag on handle */
    let dragging = false;

    handle.addEventListener('mousedown', e => {
      dragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const pct = (x / rect.width) * 100;
      range.value = pct;
      update(pct);
    });

    document.addEventListener('mouseup', () => { dragging = false; });

    /* Touch drag */
    handle.addEventListener('touchstart', e => { dragging = true; e.preventDefault(); }, { passive: false });

    document.addEventListener('touchmove', e => {
      if (!dragging) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
      const pct = (x / rect.width) * 100;
      range.value = pct;
      update(pct);
    }, { passive: true });

    document.addEventListener('touchend', () => { dragging = false; });
  });

  /* ---- Quote form ---- */
  const form = document.getElementById('quote-form');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = '…';

      /* Simulate async submission (wire up to real endpoint later) */
      setTimeout(() => {
        form.hidden = true;
        formSuccess.hidden = false;
        formSuccess.focus();
      }, 800);
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
