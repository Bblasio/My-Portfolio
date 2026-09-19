/**
 * Blasio Odhiambo - Professional IT Portfolio
 * Complete JavaScript for iPortfolio layout:
 * - Mobile sidebar drawer toggle
 * - Active nav scrollspy
 * - Lively smooth section transitions & scroll progress
 * - Responsive content flow system (IntersectionObserver with cascading reveals)
 * - Typing effect for Hero
 * - Lively animated portfolio category filters & dynamic counter
 * - Scroll-to-top button
 * - Theme switcher
 * - Contact form handler (Formspree)
 * - Low-resolution blur-up lazy loading
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // 1. Scroll Progress Bar
  // -------------------------------------------------------------
  const scrollProgress = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // -------------------------------------------------------------
  // 2. Mobile Sidebar Toggle
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

  // -------------------------------------------------------------
  // 3. Lively Page Navigation & Smooth Section Transitions
  // -------------------------------------------------------------
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  allAnchorLinks.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      // Close mobile drawer smoothly if open
      if (header && header.classList.contains('header-show')) {
        header.classList.remove('header-show');
        if (headerToggleIcon) {
          headerToggleIcon.className = 'bi bi-list';
        }
      }

      // Calculate header offset for mobile vs desktop
      const headerOffset = window.innerWidth < 1200 ? 60 : 0;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL hash cleanly
      if (window.history.pushState) {
        window.history.pushState(null, '', targetId);
      }

      // Trigger lively section pulse & responsive cascade on arrival
      targetEl.classList.remove('section-nav-pulse');
      void targetEl.offsetWidth; // trigger reflow
      targetEl.classList.add('section-nav-pulse');

      // Re-trigger lively staggered reveal for destination elements
      const childReveals = targetEl.querySelectorAll('.flow-reveal');
      childReveals.forEach((el, idx) => {
        el.classList.remove('is-revealed');
        setTimeout(() => {
          el.classList.add('is-revealed');
        }, 40 + idx * 40);
      });
    });
  });

  // -------------------------------------------------------------
  // 4. Responsive Content Flow System (Staggered Reveals on Scroll)
  // -------------------------------------------------------------
  const flowTargets = document.querySelectorAll(
    '.section-title, .hero-card, .about-img-box, .about-narrative-content, .focus-areas-grid > div, .tools-showcase-wrap, .skill-category-card, .resume-item, .edu-card, .cert-card, .portfolio-controls-bar, .project-card, .info-item, .contact-form-card'
  );

  flowTargets.forEach(el => {
    el.classList.add('flow-reveal');
  });

  // Assign responsive flow stagger delays per section
  const sectionContainers = document.querySelectorAll('section');
  sectionContainers.forEach(sec => {
    const items = sec.querySelectorAll('.flow-reveal');
    items.forEach((item, idx) => {
      const delayNum = Math.min((idx % 6) + 1, 7);
      item.classList.add(`flow-delay-${delayNum}`);
    });
  });

  const flowObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  flowTargets.forEach(el => {
    flowObserver.observe(el);
  });

  // -------------------------------------------------------------
  // 5. Typing Effect in Hero
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
  // 6. ScrollSpy: Active Nav link on scroll
  // -------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  function updateScrollSpy() {
    const scrollPos = window.scrollY + 140;

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
  updateScrollSpy();

  // -------------------------------------------------------------
  // 7. Portfolio Filters & Dynamic Project Counter with Lively Animations
  // -------------------------------------------------------------
  const filterButtons = document.querySelectorAll('#portfolio-filters button');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');
  const countVisibleEl = document.getElementById('portfolio-count-visible');
  const countTotalEl = document.getElementById('portfolio-count-total');

  function updateProjectCounter() {
    if (!projectCards.length) return;
    let visibleCount = 0;
    projectCards.forEach(card => {
      if (!card.classList.contains('filter-collapsed') && window.getComputedStyle(card).display !== 'none') {
        visibleCount++;
      }
    });

    if (countVisibleEl) {
      countVisibleEl.style.transform = 'scale(1.28)';
      countVisibleEl.textContent = visibleCount;
      setTimeout(() => {
        countVisibleEl.style.transform = 'scale(1)';
      }, 180);
    }
    if (countTotalEl) {
      countTotalEl.textContent = projectCards.length;
    }
  }

  // Initialize total count on start
  if (countTotalEl) {
    countTotalEl.textContent = projectCards.length;
  }
  updateProjectCounter();

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card, idx) => {
          const category = card.getAttribute('data-category');
          const matches = filterValue === 'all' || category === filterValue;

          if (matches) {
            card.classList.remove('filter-collapsed');
            card.classList.remove('filter-hide');
            setTimeout(() => {
              card.classList.add('filter-show');
            }, 25 + (idx % 4) * 35);
          } else {
            card.classList.remove('filter-show');
            card.classList.add('filter-hide');
            setTimeout(() => {
              if (card.classList.contains('filter-hide')) {
                card.classList.add('filter-collapsed');
                updateProjectCounter();
              }
            }, 260);
          }
        });

        setTimeout(updateProjectCounter, 280);
      });
    });
  }

  // -------------------------------------------------------------
  // 8. Scroll Top Button
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
  // 9. Theme Switcher (Dark default, Light optional)
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
  // 10. Contact Form Handler (Formspree)
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
      formStatus.style.color = '#FFFFFF';
    } else if (type === 'error') {
      formStatus.style.color = '#ef4444';
    } else {
      formStatus.style.color = 'var(--default-color)';
    }
  }

  // -------------------------------------------------------------
  // 11. Low-Resolution Blur-Up Lazy Loading System
  // -------------------------------------------------------------
  const lazyImages = document.querySelectorAll('img.lazy-blur, .hero-bg-img.lazy-blur');

  function markImageLoaded(img) {
    img.classList.add('is-loaded');
    const parentThumb = img.closest('.project-card-thumb, .skill-card-image, .about-img-box');
    if (parentThumb) {
      parentThumb.classList.add('is-ready');
    }
  }

  lazyImages.forEach(img => {
    // If image is already cached or complete
    if (img.complete && img.naturalWidth > 0) {
      setTimeout(() => markImageLoaded(img), 60);
    } else {
      img.addEventListener('load', () => markImageLoaded(img), { once: true });
      img.addEventListener('error', () => {
        markImageLoaded(img);
      }, { once: true });
    }
  });

});
