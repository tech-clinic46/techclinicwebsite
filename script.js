const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const year = document.getElementById('year');

if (menuBtn && nav) {
  const updateMenuState = (isOpen) => {
    nav.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };

  menuBtn.addEventListener('click', () => {
    updateMenuState(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      updateMenuState(false);
    });
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

// Subtle scroll reveal using IntersectionObserver
(function(){
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } catch (e) {
    // fail silently
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));
  }
})();
