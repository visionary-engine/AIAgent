/* =============================================
   AIエージェント・ストラテジスト LP — main.js
   ============================================= */

/* ---------- FAQ Accordion ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Sticky Nav Shadow ---------- */
  const nav = document.getElementById('site-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---------- Scroll Fade-In ---------- */
  const fadeEls = document.querySelectorAll('.fade');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => io.observe(el));

  /* ---------- Number Counter ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1600;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;
      const tick = () => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString('ja-JP');
        if (current < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => cio.observe(el));

  /* ---------- Smooth Scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});
