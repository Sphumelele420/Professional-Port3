
  // ── Theme toggle ──
  const toggleInput = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Respect saved preference
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    html.setAttribute('data-theme', 'dark');
    toggleInput.checked = true;
  }

  toggleInput.addEventListener('change', () => {
    if (toggleInput.checked) {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  });

  // ── Cursor ──
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animateCursor() {
    cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(1.8)'; ring.style.opacity = '0.9'; });
    el.addEventListener('mouseleave', () => { ring.style.opacity = '0.5'; });
  });

  // ── Nav scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  // ── Reveal on scroll ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // ── Timeline items ──
  const tItems = document.querySelectorAll('.timeline-item');
  const tObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
      }
    });
  }, { threshold: 0.15 });
  tItems.forEach(el => tObs.observe(el));

  // ── Contact form ──
  function handleSend() {
    const btn = document.querySelector('.btn-send');
    btn.textContent = 'Sending...';
    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      btn.style.background = 'transparent';
      btn.style.color = '#c84b2f';
      setTimeout(() => {
        btn.textContent = 'Send message →';
        btn.style.background = '';
        btn.style.color = '';
        ['name','email','subject','message'].forEach(id => {
          document.getElementById(id).value = '';
        });
      }, 2500);
    }, 900);
  }

  // ── Smooth active nav ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--ink)' : '';
    });
  });