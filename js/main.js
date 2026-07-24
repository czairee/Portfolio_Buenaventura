/* =========================================================
   Theme toggle
   ========================================================= */
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.querySelector('.theme-icon');
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  if (icon) {
    icon.textContent = next === 'dark' ? '☀️' : '🌙';
  }
  try {
    localStorage.setItem('theme', next);
  } catch (e) {}
}

(function initTheme() {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  } catch (e) {}
})();

/* =========================================================
   Scroll animations
   ========================================================= */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
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

/* =========================================================
   Smooth scroll for anchor links
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =========================================================
   Dynamic footer year
   ========================================================= */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =========================================================
   Active nav link on scroll
   ========================================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar-nav a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--ink)';
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* =========================================================
   Scroll-to-top button visibility
   ========================================================= */
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });
}

/* =========================================================
   Skill tags hover micro-interaction
   ========================================================= */
document.querySelectorAll('.stack-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .3s ease, background .3s ease, border-color .3s ease';
  });
});

/* =========================================================
   Project/experience/education item hover sound-ish feel via cursor tracking
   ========================================================= */
document.querySelectorAll('.project-item, .experience-item, .education-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transition = 'transform .3s ease, background .3s ease, border-color .3s ease';
  });
});
