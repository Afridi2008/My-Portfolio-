 // ── CUSTOM CURSOR ──
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .service-card, .pkg-card, .process-step').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });

  // ── NAV HIDE ON SCROLL ──
  let lastScroll = 0;
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    if (cur > lastScroll && cur > 80) nav.classList.add('nav-hidden');
    else nav.classList.remove('nav-hidden');
    lastScroll = cur;
  });

  // ── SECTION ENTRANCE TRANSITIONS ──
  // Observer for trans-* elements (scroll-triggered)
  const transObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        transObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.trans-fade, .trans-left, .trans-right, .trans-pop, .trans-flip, .trans-skew')
    .forEach(el => transObserver.observe(el));

  // ── NAV ANCHOR TRANSITIONS ──
  // Stripe wipe when clicking nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const stripes = document.querySelectorAll('.pto-stripe');
      const totalDuration = 500;
      const staggerMs = 60;

      // Animate stripes in (left to right = scaleX 0→1)
      stripes.forEach((s, i) => {
        s.style.transition = 'none';
        s.style.transform = 'scaleX(0)';
        s.style.transformOrigin = 'left';
        setTimeout(() => {
          s.style.transition = `transform ${totalDuration}ms cubic-bezier(0.7,0,0.3,1)`;
          s.style.transform = 'scaleX(1)';
        }, i * staggerMs);
      });

      // After fully covered, scroll, then wipe out
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'instant' });

        // Wipe out (right to left = origin right, scaleX 1→0)
        stripes.forEach((s, i) => {
          s.style.transformOrigin = 'right';
          setTimeout(() => {
            s.style.transition = `transform ${totalDuration}ms cubic-bezier(0.7,0,0.3,1)`;
            s.style.transform = 'scaleX(0)';
          }, i * staggerMs);
        });
      }, stripes.length * staggerMs + totalDuration + 80);
    });
  });

  // ── TABS ──
  function switchTab(id, btn) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');
  }