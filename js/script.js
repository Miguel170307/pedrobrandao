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
