(() => {
  const backToTop = document.querySelector('.back-to-top');
  const toggleBackToTop = () => backToTop?.classList.toggle('show', window.scrollY > 500);
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const nav = document.querySelector('#mainNav');
      if (nav?.classList.contains('show') && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });
})();
