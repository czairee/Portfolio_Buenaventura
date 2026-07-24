/* Mobile nav toggle */
function toggleMenu() {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('open');
  }
}

/* Scroll animations */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* Dynamic year */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* Navbar shadow on scroll */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.site-header');
  if (nav) {
    nav.style.boxShadow = window.scrollY > 50 ? '0 2px 10px rgba(0,0,0,0.1)' : 'none';
  }
});
