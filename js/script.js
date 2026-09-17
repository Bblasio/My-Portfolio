/**
 * Blasio Odhiambo - Professional IT Portfolio
 * Complete JavaScript for iPortfolio layout:
 * - Mobile sidebar drawer toggle
 * - Active nav scrollspy
 * - Typing effect for Hero
 * - Portfolio category filters
 * - Scroll-to-top button
 * - Theme switcher
 * - Contact form handler (Formspree)
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // 1. Mobile Sidebar Toggle
  // -------------------------------------------------------------
  const headerToggleBtn = document.getElementById('header-toggle');
  const headerToggleIcon = document.getElementById('header-toggle-icon');
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('#navmenu a');

  function toggleMobileHeader() {
    if (!header) return;
    header.classList.toggle('header-show');
    const isShowing = header.classList.contains('header-show');
    if (headerToggleIcon) {
      headerToggleIcon.className = isShowing ? 'bi bi-x' : 'bi bi-list';
    }
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', toggleMobileHeader);
  }

  // Close sidebar on navigation click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (header && header.classList.contains('header-show')) {
        header.classList.remove('header-show');
        if (headerToggleIcon) {
          headerToggleIcon.className = 'bi bi-list';
        }
      }
    });
  });

  // -------------------------------------------------------------
  // 2. Typing Effect in Hero
  // -------------------------------------------------------------
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget) {
    const roles = [
      'IT Specialist',
      'Solution Architect',
      'Web Developer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 40;
    const holdTime = 1800;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = holdTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }

    typeLoop();
  }

  // -------------------------------------------------------------
  // 3. ScrollSpy: Active Nav link on scroll
  // -------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  function updateScrollSpy() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });

  // -------------------------------------------------------------
  // 4. Portfolio Filters
  // -------------------------------------------------------------
  const filterButtons = document.querySelectorAll('#portfolio-filters button');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // -------------------------------------------------------------
  // 5. Scroll Top Button
  // -------------------------------------------------------------
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 240) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------
  // 6. Theme Switcher (Dark default, Light optional)
  // -------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    applyThemeIcon(true);
  } else {
    document.body.classList.remove('light-theme');
    applyThemeIcon(false);
  }

  function applyThemeIcon(isLight) {
    if (themeIcon) {
      themeIcon.className = isLight ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
    }
    if (themeLabel) {
      themeLabel.textContent = isLight ? 'Light Mode' : 'Dark Mode';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
      applyThemeIcon(isLight);
    });
  }

  // -------------------------------------------------------------
  // 7. Contact Form Handler (Formspree)
  // -------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || name.length < 2) {
        showFormStatus('Please provide your name (at least 2 characters).', 'error');
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }
      if (!message || message.length < 10) {
        showFormStatus('Please enter a message (at least 10 characters).', 'error');
        return;
      }

      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
      }
      showFormStatus('Sending your message...', 'info');

      try {
        const response = await fetch(contactForm.action || 'https://formspree.io/f/mzzaaogg', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, subject, message })
        });

        if (response.ok) {
          showFormStatus('Thank you! Your message has been sent successfully.', 'success');
          contactForm.reset();
        } else {
          showFormStatus('Could not send message. Please reach out to odhisblasio@gmail.com.', 'error');
        }
      } catch (err) {
        showFormStatus('Network error occurred. Please contact odhisblasio@gmail.com directly.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  }

  function showFormStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    if (type === 'success') {
      formStatus.style.color = '#10b981';
    } else if (type === 'error') {
      formStatus.style.color = '#ef4444';
    } else {
      formStatus.style.color = 'var(--default-color)';
    }
  }

});
