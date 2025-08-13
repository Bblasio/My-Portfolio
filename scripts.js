document.addEventListener('DOMContentLoaded', () => {
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
});