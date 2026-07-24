/* =========================================================
   Mobile navigation
   ========================================================= */
function toggleMenu() {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('open');
  }
}

// Close mobile nav when a link is clicked
document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.remove('open');
  });
});

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
const navLinks = document.querySelectorAll('.site-nav a');

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
      link.style.color = 'var(--primary)';
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* =========================================================
   Navbar shadow on scroll
   ========================================================= */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.site-header');
  if (nav) {
    nav.style.boxShadow = window.scrollY > 50 ? '0 2px 10px rgba(0,0,0,0.08)' : 'none';
  }
}, { passive: true });

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
   Typewriter effect for hero subtitle
   ========================================================= */
(function() {
  const subtitleEl = document.querySelector('.hero-subtitle');
  if (!subtitleEl) return;

  const fullText = subtitleEl.textContent.trim();
  subtitleEl.textContent = '';
  subtitleEl.style.borderRight = '2px solid var(--primary)';
  subtitleEl.style.paddingRight = '4px';

  let index = 0;
  const typingSpeed = 45;
  const pauseAtEnd = 1800;
  const deleteSpeed = 25;

  function type() {
    if (index < fullText.length) {
      subtitleEl.textContent += fullText.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, pauseAtEnd);
    }
  }

  function erase() {
    if (index > 0) {
      index--;
      subtitleEl.textContent = fullText.substring(0, index);
      setTimeout(erase, deleteSpeed);
    } else {
      setTimeout(type, 400);
    }
  }

  // Start after a short delay
  setTimeout(type, 600);
})();

/* =========================================================
   Skill tags hover micro-interaction
   ========================================================= */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  });
});

/* =========================================================
   Project cards tilt on hover
   ========================================================= */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
