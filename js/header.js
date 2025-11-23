// header.js
// Handles header auto-hide on scroll and sets --header-height CSS variable
// This file was separated from inline HTML to keep HTML/CSS/JS concerns separate.

(function () {
  // Cache DOM references
  const header = document.querySelector('.site_header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  // Measure header height and set CSS variable --header-height
  function setHeaderHeight() {
    const h = header ? header.offsetHeight : 0;
    document.documentElement.style.setProperty('--header-height', h + 'px');
  }

  // Scroll handler: hide header on scroll down, show on scroll up
  function onScroll() {
    const currentY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (currentY > lastScrollY && currentY > 50) {
          // scrolling down and past a small threshold -> hide header
          header.classList.add('site_header--hidden');
        } else {
          // scrolling up -> show header
          header.classList.remove('site_header--hidden');
        }
        lastScrollY = currentY <= 0 ? 0 : currentY;
        ticking = false;
      });
      ticking = true;
    }
  }

  // Initialize
  window.addEventListener('load', function () {
    setHeaderHeight();
    // Recompute on resize because header could wrap/change height
    window.addEventListener('resize', setHeaderHeight, { passive: true });
    // Listen to scrolls
    window.addEventListener('scroll', onScroll, { passive: true });
  });
})();
