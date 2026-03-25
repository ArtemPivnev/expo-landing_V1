export function initSmoothScroll({ headerOffset = 92 } = {}) {
  const btn = document.getElementById('cta-scroll');
  const target = document.getElementById('registration');
  if (!btn || !target) return;

  btn.addEventListener('click', () => {
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

