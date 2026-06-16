  // ── Mobile menu
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  function closeMobile() { mobileMenu.classList.remove('open'); }

  // ── Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // ── Skill bars animate on scroll
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target;
        fill.style.transform = `scaleX(${fill.dataset.pct})`;
        fill.classList.add('animated');
        skillObs.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  skillFills.forEach(f => skillObs.observe(f));

  // ── Form submit (opens email client as fallback)
  function handleSubmit() {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim();
    const msg = document.getElementById('fmsg').value.trim();
    if (!name || !email || !msg) { alert('Please fill in your name, email, and message.'); return; }
    const body = `Name: ${name}\nEmail: ${email}\nProject: ${subject}\n\n${msg}`;
    window.location.href = `mailto:beytulahseid093@gmail.com?subject=Project Inquiry – ${encodeURIComponent(subject || 'Website')}&body=${encodeURIComponent(body)}`;
    document.getElementById('formSuccess').style.display = 'block';
  }

  // ── Active nav highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--white)' : '';
    });
  }, { passive: true });
