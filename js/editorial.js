(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const nav = document.getElementById('topnav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  const filters = document.getElementById('filters');
  const grid = document.getElementById('grid');
  if (filters && grid) {
    filters.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      filters.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      const f = btn.dataset.filter;
      grid.querySelectorAll('.proj').forEach(function (card) {
        const show = f === 'all' || card.dataset.cat === f;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  if (!prefersReducedMotion) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section, .stop, .proj, .else-card, .sticker, .hero-photo').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });

    const hero = document.querySelector('.hero');
    const stickers = document.querySelectorAll('.sticker');
    if (hero && stickers.length) {
      var rafId = null;
      hero.addEventListener('mousemove', function (e) {
        if (rafId) return;
        rafId = requestAnimationFrame(function () {
          rafId = null;
          var r = hero.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          stickers.forEach(function (s, i) {
            var f = (i + 1) * 6;
            var base = s.classList.contains('s1') ? 3 : s.classList.contains('s2') ? -4 : 2;
            s.style.transform = 'translate(' + (x * f) + 'px, ' + (y * f) + 'px) rotate(' + base + 'deg)';
          });
        });
      });
    }
  } else {
    document.querySelectorAll('.section, .stop, .proj, .else-card, .sticker, .hero-photo').forEach(function (el) {
      el.classList.add('reveal', 'in');
    });
  }

  document.querySelectorAll('.reflection-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var id = header.getAttribute('data-reflection');
      var body = document.getElementById(id + '-content');
      var icon = document.getElementById(id + '-icon');
      if (!body) return;
      var open = !body.classList.contains('open');
      body.classList.toggle('open', open);
      header.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (icon) icon.textContent = open ? '▲' : '▼';
    });
  });
})();
