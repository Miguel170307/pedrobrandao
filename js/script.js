// The carousel changes only when the visitor requests it.
const slides = [...document.querySelectorAll('.carousel-slide')];
const thumbnails = [...document.querySelectorAll('[data-slide]')];
const stage = document.querySelector('.carousel-stage');
const status = document.querySelector('#slide-status');
let activeSlide = 0;

function showSlide(index) {
  const next = (index + slides.length) % slides.length;
  if (next === activeSlide) return;
  slides[activeSlide].querySelector('video')?.pause();
  slides.forEach((slide, position) => { slide.hidden = position !== next; });
  thumbnails.forEach((button, position) => {
    button.setAttribute('aria-pressed', String(position === next));
  });
  activeSlide = next;
  status.textContent = `${next + 1} de ${slides.length}`;
}

document.querySelector('#slide-prev').addEventListener('click', () => showSlide(activeSlide - 1));
document.querySelector('#slide-next').addEventListener('click', () => showSlide(activeSlide + 1));
thumbnails.forEach((button) => {
  button.addEventListener('click', () => showSlide(Number(button.dataset.slide)));
});
stage.addEventListener('keydown', (event) => {
  if (event.target !== stage) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showSlide(activeSlide + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

// Reveal each block once. Content remains readable if animation is unavailable.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll(
  '.hero-copy, .hero-photo, .about-content > div, .achievements-heading, .titles-grid li, .gallery-heading, .carousel, .contact-content > div'
);
let revealObserver;

function stopReveals() {
  revealObserver?.disconnect();
  revealTargets.forEach((element) => element.classList.remove('scroll-reveal'));
}

if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const cards = [...document.querySelectorAll('.titles-grid li')];
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const cardIndex = cards.indexOf(entry.target);
      entry.target.style.setProperty('--reveal-delay', `${Math.max(0, cardIndex) * 70}ms`);
      entry.target.classList.add('scroll-reveal');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealTargets.forEach((element) => revealObserver.observe(element));
}
motionPreference.addEventListener('change', (event) => {
  if (event.matches) stopReveals();
});
