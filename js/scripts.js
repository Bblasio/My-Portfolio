document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scrolling for Navigation
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update active class
      document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Work Experience and Skills Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        // Filter Work Experience
        document.querySelectorAll('.experience-card').forEach(card => {
          card.style.display = filter === 'all' || card.dataset.category.includes(filter) ? 'block' : 'none';
        });
        // Filter Skills
        document.querySelectorAll('.interest-card').forEach(card => {
          card.style.display = filter === 'all' || card.dataset.category === filter ? 'block' : 'none';
        });
      });
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const formMessage = document.getElementById('form-message');
      
      if (name.length < 2) {
        formMessage.innerText = 'Please enter a valid name (2+ characters).';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMessage.innerText = 'Please enter a valid email address.';
        return;
      }
      if (message.length < 10) {
        formMessage.innerText = 'Message must be at least 10 characters.';
        return;
      }
      
      formMessage.innerText = 'Form validated! Ready to send (server-side pending).';
      contactForm.reset();
    });
  }

  // Scroll Animations for Cards
  const observerOptions = {
    root: null,
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.experience-card, .interest-card').forEach(card => {
    observer.observe(card);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // Name Animation in Home Section
  const nameSpans = document.querySelectorAll('#animated-name span');
  if (nameSpans.length > 0) {
    const animateName = () => {
      // Reset all letters
      nameSpans.forEach(span => {
        span.classList.remove('visible');
      });
      // Animate letters one by one
      nameSpans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('visible');
        }, index * 100); // Staggered appearance
      });
      // Hide letters after 3 seconds
      setTimeout(() => {
        nameSpans.forEach(span => {
          span.classList.remove('visible');
        });
      }, 3000);
    };
    // Run animation initially and every 4 seconds
    animateName();
    setInterval(animateName, 4000);
  }

  // Smooth Scrolling for Navigation
  const navLinks = document.querySelectorAll('.nav-links a');
  if (navLinks.length > 0) {
    navLinks.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          navLinks.forEach(link => link.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });
  }

  // Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
      });
    });
  }

  // Work Experience and Skills Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        document.querySelectorAll('.experience-card').forEach(card => {
          card.style.display = filter === 'all' || card.dataset.category.includes(filter) ? 'block' : 'none';
        });
        document.querySelectorAll('.interest-card').forEach(card => {
          card.style.display = filter === 'all' || card.dataset.category === filter ? 'block' : 'none';
        });
      });
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const formMessage = document.getElementById('form-message');
      
      if (!formMessage) return;
      
      if (name.length < 2) {
        formMessage.innerText = 'Please enter a valid name (2+ characters).';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMessage.innerText = 'Please enter a valid email address.';
        return;
      }
      if (message.length < 10) {
        formMessage.innerText = 'Message must be at least 10 characters.';
        return;
      }
      
      formMessage.innerText = 'Form validated! Ready to send (server-side pending).';
      contactForm.reset();
    });
  }

  // Scroll Animations for Cards
  const observerOptions = {
    root: null,
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.experience-card, .interest-card').forEach(card => {
    observer.observe(card);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // Name Animation in Home Section
  const nameSpans = document.querySelectorAll('#animated-name span');
  if (nameSpans.length > 0) {
    const animateName = () => {
      nameSpans.forEach(span => span.classList.remove('visible'));
      nameSpans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('visible');
        }, index * 100);
      });
      setTimeout(() => {
        nameSpans.forEach(span => span.classList.remove('visible'));
      }, 3000);
    };
    animateName();
    setInterval(animateName, 4000);
  }

  // Smooth Scrolling for Navigation
  const navLinks = document.querySelectorAll('.nav-links a');
  if (navLinks.length > 0) {
    navLinks.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          navLinks.forEach(link => link.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });
  }

  // Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
      });
    });
  }

  // Work Experience and Skills Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        document.querySelectorAll('.experience-card').forEach(card => {
          card.style.display = filter === 'all' || card.dataset.category.includes(filter) ? 'block' : 'none';
        });
        document.querySelectorAll('.interest-card').forEach(card => {
          card.style.display = filter === 'all' || card.dataset.category === filter ? 'block' : 'none';
        });
      });
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const formMessage = document.getElementById('form-message');
      
      if (!formMessage) return;
      
      if (name.length < 2) {
        formMessage.innerText = 'Please enter a valid name (2+ characters).';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMessage.innerText = 'Please enter a valid email address.';
        return;
      }
      if (message.length < 10) {
        formMessage.innerText = 'Message must be at least 10 characters.';
        return;
      }
      
      formMessage.innerText = 'Form validated! Ready to send (server-side pending).';
      contactForm.reset();
    });
  }

  // Scroll Animations for Cards
  const observerOptions = {
    root: null,
    threshold: 0.1
  };
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.experience-card, .interest-card, .project-card, .education-card, .cert-card, .contact-box').forEach(card => {
    scrollObserver.observe(card);
  });

  // Breathing Animations for Each Section
  const breatheObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.closest('section').id;
        let breatheClass;
        switch (sectionId) {
          case 'home':
            breatheClass = 'breathe-home';
            break;
          case 'about':
            breatheClass = 'breathe-about';
            break;
          case 'skills':
            breatheClass = 'breathe-skills';
            break;
          case 'education':
            breatheClass = 'breathe-education';
            break;
          case 'projects':
            breatheClass = 'breathe-projects';
            break;
          case 'interests':
            breatheClass = 'breathe-interests';
            break;
          case 'contact':
            breatheClass = 'breathe-contact';
            break;
          default:
            breatheClass = 'breathe-home';
        }
        entry.target.classList.add(breatheClass);
      } else {
        entry.target.classList.remove('breathe-home', 'breathe-about', 'breathe-skills', 'breathe-education', 'breathe-projects', 'breathe-interests', 'breathe-contact');
      }
    });
  }, { root: null, threshold: 0.2 });

  // Apply breathing animations to specific elements in each section
  document.querySelectorAll(
    '#home .hero-content, #home .greeting, #home #animated-name, #home .btn, #home .social-icons img, ' +
    '#about .about-content, #about .title, #about p, #about img, ' +
    '#skills .title, #skills .filter-btn, #skills .experience-card, #skills .interest-card, #skills .lang-box, ' +
    '#education .title, #education .education-card, #education .cert-card, ' +
    '#projects .title, #projects .project-card, ' +
    '#interests .title, #interests .interest-card, ' +
    '#contact .title, #contact .contact-box, #contact .icon-link img, #contact .btn'
  ).forEach(element => {
    breatheObserver.observe(element);
  });
});