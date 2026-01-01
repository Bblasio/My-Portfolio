document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality
  const themeSwitch = document.querySelector('#theme-switch');
  if (themeSwitch) {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    themeSwitch.checked = savedTheme === 'dark';
    themeSwitch.addEventListener('change', () => {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
      console.log('Theme toggled to:', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
  } else {
    console.error('Theme switch input (#theme-switch) not found in the DOM');
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
        } else {
          console.warn(`Navigation target ${targetId} not found`);
        }
      });
    });
  } else {
    console.warn('No navigation links (.nav-links a) found');
  }

  // Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
      console.log('Hamburger menu toggled');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
      });
    });
  } else {
    console.warn('Hamburger menu (.hamburger) or nav links (.nav-links) not found');
  }
  /* ----------------------------
   📬 Contact Form (Validation + Send to Formspree)
  ---------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
 
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const subject = document.getElementById('subject')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      const formMessage = document.getElementById('form-message');
 
      if (!formMessage) {
        console.error('Form message element (#form-message) not found');
        return;
      }
 
      formMessage.style.color = '#e63946'; // red by default
 
      if (!name || name.length < 2) {
        formMessage.innerText = '⚠️ Please enter a valid name (2+ characters).';
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMessage.innerText = '⚠️ Please enter a valid email address.';
        return;
      }
      if (!message || message.length < 10) {
        formMessage.innerText = '⚠️ Message must be at least 10 characters.';
        return;
      }
 
      // prepare data for Formspree
      const data = {
        name,
        email,
        subject,
        message
      };
 
      try {
        const response = await fetch('https://formspree.io/f/mzzaaogg', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
 
        if (response.ok) {
          formMessage.style.color = '#2a9d8f'; // green
          formMessage.innerText = '✅ Thanks! Your message has been sent successfully.';
          contactForm.reset();
          console.log('Form submitted successfully to Formspree');
        } else {
          formMessage.innerText = '❌ Oops! Something went wrong. Please try again later.';
          console.error('Form submission failed:', response.statusText);
        }
      } catch (error) {
        formMessage.innerText = '❌ Network error. Please check your connection.';
        console.error('Error submitting form:', error);
      }
    });
  } else {
    console.warn('Contact form (#contact-form) not found');
  }
  // Scroll Animations
  const observerOptions = {
    root: null,
    threshold: 0.1
  };
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // For cards in Projects, Education, and Contact
        if (entry.target.classList.contains('project-card') || 
            entry.target.classList.contains('education-card') || 
            entry.target.classList.contains('cert-card') || 
            entry.target.classList.contains('contact-message') || 
            entry.target.classList.contains('contact-info')) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 200); // Staggered delay for cards
        } else {
          // For section content
          entry.target.classList.add('visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.animate-section, .project-card, .education-card, .cert-card, .contact-message.card, .contact-info.card');
  if (elementsToAnimate.length > 0) {
    elementsToAnimate.forEach(element => scrollObserver.observe(element));
  } else {
    console.warn('No elements found for scroll animations');
  }
});
// Timeline scroll animation
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });
  
  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  animateTimeline();
  
  // Re-run on resize
  window.addEventListener('resize', animateTimeline);
});
// skills-animations.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize skills section animations
  initSkillsAnimations();
  initSmoothScrolling();
  initCardHoverEffects();
});

// Skills Section Animations
function initSkillsAnimations() {
  // Select all animated elements
  const animatedElements = document.querySelectorAll('.skill-card, .experience-card, .tech-item');
  
  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe each element
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Calculate position with header offset
      const headerHeight = document.querySelector('header')?.offsetHeight || 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      // Smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// Card Hover Effects
function initCardHoverEffects() {
  // Add hover effects to skill cards
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (this.classList.contains('visible')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });
  
  // Add hover effects to tech items
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    item.addEventListener('mouseleave', function() {
      if (this.classList.contains('visible')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });
}

// Progressive Enhancement for Skill Proficiency Bars
function initProficiencyBars() {
  const proficiencyBars = document.querySelectorAll('.proficiency-level');
  
  proficiencyBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
}

// Initialize when skills section is in view
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initProficiencyBars();
      skillsObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

// Observe skills section
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Parallax effect for section background
function initSkillsParallax() {
  const skillsSection = document.querySelector('.skills-section');
  
  if (!skillsSection) return;
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    // Subtle parallax for background elements
    const bgElements = skillsSection.querySelectorAll('.skill-icon lottie-player');
    bgElements.forEach((element, index) => {
      const speed = 0.1 + (index * 0.05);
      element.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Optional: Initialize on load
window.addEventListener('load', function() {
  initSkillsParallax();
});

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initSkillsAnimations,
    initSmoothScrolling,
    initCardHoverEffects,
    initProficiencyBars
  };
}
// why-me-animations.js
document.addEventListener('DOMContentLoaded', function() {
  initWhyMeAnimations();
  initWhyMeInteractions();
  initEmployerCTA();
});

// Initialize Why Me Animations
function initWhyMeAnimations() {
  // Select all animated elements
  const animatedElements = document.querySelectorAll('.why-card, .value-point, .testimonial-preview');
  
  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe each element
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize Why Me Interactions
function initWhyMeInteractions() {
  // Card hover effects
  const whyCards = document.querySelectorAll('.why-card');
  
  whyCards.forEach(card => {
    // Scale icon on hover
    const icon = card.querySelector('.why-icon');
    
    card.addEventListener('mouseenter', function() {
      if (icon) {
        icon.style.transform = 'scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
    
    // Click to expand
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  });
  
  // Value points animation
  const valuePoints = document.querySelectorAll('.value-point');
  
  valuePoints.forEach(point => {
    point.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.value-icon');
      if (icon) {
        icon.style.transform = 'rotate(10deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    point.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.value-icon');
      if (icon) {
        icon.style.transform = 'rotate(0)';
      }
    });
  });
}

// Initialize Employer CTA
function initEmployerCTA() {
  const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
  
  ctaButtons.forEach(button => {
    // Add ripple effect
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
      `;
      
      this.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
    
    // Add hover animation
    button.addEventListener('mouseenter', function() {
      const svg = this.querySelector('svg');
      if (svg) {
        svg.style.transform = 'translateX(3px)';
        svg.style.transition = 'transform 0.3s ease';
      }
    });
    
    button.addEventListener('mouseleave', function() {
      const svg = this.querySelector('svg');
      if (svg) {
        svg.style.transform = 'translateX(0)';
      }
    });
  });
  
  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .cta-buttons .btn {
      position: relative;
      overflow: hidden;
    }
    
    .why-card.expanded {
      transform: translateY(-8px) scale(1.02);
    }
    
    .why-card.expanded .why-icon {
      transform: scale(1.2) !important;
    }
    
    @media (max-width: 768px) {
      .cta-buttons .btn {
        padding: 0.7rem 1.2rem;
        font-size: 0.9rem;
      }
    }
  `;
  document.head.appendChild(style);
}

// Stats counter animation (optional)
function initStatsCounter() {
  const statsSection = document.querySelector('.why-section');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate project count
        const projectCount = document.querySelector('.project-count');
        if (projectCount) {
          animateCounter(projectCount, 0, 6, 1000);
        }
        
        statsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });
  
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
}

// Counter animation helper
function animateCounter(element, start, end, duration) {
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current;
    
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Initialize on load
window.addEventListener('load', function() {
  initStatsCounter();
});

// Smooth scroll for CTA buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.hash) {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
// about-animations.js
document.addEventListener('DOMContentLoaded', function() {
  initAboutAnimations();
  initAboutInteractions();
  initProfileImageEffects();
});

// Initialize About Section Animations
function initAboutAnimations() {
  // Intersection Observer for reveal animations
  const aboutSection = document.querySelector('.about-section');
  const animatedElements = document.querySelectorAll('.about-content.animate-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate profile stats
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach((stat, index) => {
          setTimeout(() => {
            animateCounter(stat);
          }, index * 200);
        });
        
        // Animate journey points
        const journeyPoints = entry.target.querySelectorAll('.journey-point');
        journeyPoints.forEach((point, index) => {
          setTimeout(() => {
            point.classList.add('animated');
          }, index * 150);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Animate counter for stats
function animateCounter(element) {
  const target = parseInt(element.textContent.replace('+', ''));
  const duration = 1000;
  const start = 0;
  const increment = 1;
  const stepTime = Math.floor(duration / target);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current + (element.textContent.includes('+') ? '+' : '');
    
    if (current >= target) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Initialize About Interactions
function initAboutInteractions() {
  // Profile image hover effect
  const profileImage = document.querySelector('.profile-image');
  const profileCard = document.querySelector('.profile-card');
  
  if (profileCard) {
    profileCard.addEventListener('mouseenter', function() {
      const imageGlow = this.querySelector('.image-glow');
      const imageOverlay = this.querySelector('.image-overlay');
      
      if (imageGlow) imageGlow.style.opacity = '0.3';
      if (imageOverlay) imageOverlay.style.opacity = '0.8';
    });
    
    profileCard.addEventListener('mouseleave', function() {
      const imageGlow = this.querySelector('.image-glow');
      const imageOverlay = this.querySelector('.image-overlay');
      
      if (imageGlow) imageGlow.style.opacity = '0';
      if (imageOverlay) imageOverlay.style.opacity = '1';
    });
  }
  
  // Expertise tags hover effect
  const expertiseTags = document.querySelectorAll('.expertise-tag');
  
  expertiseTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.tag-icon');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    tag.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.tag-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0)';
      }
    });
  });
  
  // Journey points hover effect
  const journeyPoints = document.querySelectorAll('.journey-point');
  
  journeyPoints.forEach(point => {
    point.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.point-icon');
      if (icon) {
        icon.style.transform = 'scale(1.2)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    point.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.point-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });
  
  // Button hover effects
  const aboutButtons = document.querySelectorAll('.about-actions .btn');
  
  aboutButtons.forEach(button => {
    // Add ripple effect
    button.addEventListener('click', function(e) {
      createRippleEffect(this, e);
    });
    
    // Add arrow animation
    const svg = button.querySelector('svg');
    if (svg) {
      button.addEventListener('mouseenter', function() {
        svg.style.transform = 'translateX(5px)';
        svg.style.transition = 'transform 0.3s ease';
      });
      
      button.addEventListener('mouseleave', function() {
        svg.style.transform = 'translateX(0)';
      });
    }
  });
}

// Ripple effect helper
function createRippleEffect(button, event) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    width: ${size}px;
    height: ${size}px;
    top: ${y}px;
    left: ${x}px;
    pointer-events: none;
  `;
  
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Initialize profile image effects
function initProfileImageEffects() {
  const profileImage = document.querySelector('.profile-image');
  
  if (profileImage) {
    // Lazy load image
    profileImage.addEventListener('load', function() {
      this.classList.add('loaded');
      this.style.opacity = '1';
    });
    
    // Add loading state
    profileImage.style.opacity = '0';
    profileImage.style.transition = 'opacity 0.5s ease';
    
    // Preload image
    const img = new Image();
    img.src = profileImage.src;
    img.onload = function() {
      profileImage.classList.add('loaded');
      profileImage.style.opacity = '1';
    };
  }
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .journey-point.animated {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .profile-image.loaded {
      filter: grayscale(0.1);
    }
    
    .profile-badge {
      animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(-5px); }
    }
  `;
  document.head.appendChild(style);
}

// Parallax effect for section
function initAboutParallax() {
  const aboutSection = document.querySelector('.about-section');
  
  if (!aboutSection) return;
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2;
    
    // Subtle parallax for background elements
    const bgElements = aboutSection.querySelectorAll('.profile-card, .biography-card');
    bgElements.forEach((element, index) => {
      const speed = 0.1 + (index * 0.05);
      element.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Initialize on load
window.addEventListener('load', function() {
  initAboutParallax();
});

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initAboutAnimations,
    initAboutInteractions,
    initProfileImageEffects
  };
}
// interests-animations.js
document.addEventListener('DOMContentLoaded', function() {
  initInterestsAnimations();
  initInterestsInteractions();
  initArticleReadTime();
});

// Initialize Interests Animations
function initInterestsAnimations() {
  // Intersection Observer for article animations
  const articles = document.querySelectorAll('.interest-article');
  const cta = document.querySelector('.interests-cta');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
        
        // Animate elements within article
        if (entry.target.classList.contains('interest-article')) {
          animateArticleElements(entry.target);
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observe articles
  articles.forEach(article => {
    observer.observe(article);
  });
  
  // Observe CTA
  if (cta) {
    observer.observe(cta);
  }
}

// Animate elements within article
function animateArticleElements(article) {
  // Animate article points
  const points = article.querySelectorAll('.article-point');
  points.forEach((point, index) => {
    setTimeout(() => {
      point.classList.add('animated');
    }, index * 200);
  });
  
  // Animate tags
  const tags = article.querySelectorAll('.article-tag');
  tags.forEach((tag, index) => {
    setTimeout(() => {
      tag.style.opacity = '1';
      tag.style.transform = 'translateY(0)';
    }, index * 100);
  });
  
  // Initialize Lottie player if needed
  const lottiePlayer = article.querySelector('lottie-player');
  if (lottiePlayer && !lottiePlayer.hasAttribute('initialized')) {
    lottiePlayer.setAttribute('initialized', 'true');
    // Optional: Add hover effect to Lottie animation
    lottiePlayer.addEventListener('mouseenter', function() {
      this.setAttribute('speed', '1.5');
    });
    
    lottiePlayer.addEventListener('mouseleave', function() {
      this.setAttribute('speed', '1');
    });
  }
}

// Initialize Interests Interactions
function initInterestsInteractions() {
  // Article hover effects
  const articles = document.querySelectorAll('.interest-article');
  
  articles.forEach(article => {
    // Add click to expand/collapse functionality
    const header = article.querySelector('.article-header');
    if (header) {
      header.addEventListener('click', function() {
        article.classList.toggle('expanded');
      });
    }
    
    // Article point hover effects
    const points = article.querySelectorAll('.article-point');
    points.forEach(point => {
      point.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
      });
      
      point.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
      });
    });
    
    // Tag hover effects
    const tags = article.querySelectorAll('.article-tag');
    tags.forEach(tag => {
      tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
      });
      
      tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  });
  
  // CTA button effects
  const ctaButton = document.querySelector('.interests-cta .btn');
  if (ctaButton) {
    // Add ripple effect
    ctaButton.addEventListener('click', function(e) {
      createRippleEffect(this, e);
    });
    
    // Add icon animation
    const svg = ctaButton.querySelector('svg');
    if (svg) {
      ctaButton.addEventListener('mouseenter', function() {
        svg.style.transform = 'translateX(5px) rotate(-5deg)';
        svg.style.transition = 'transform 0.3s ease';
      });
      
      ctaButton.addEventListener('mouseleave', function() {
        svg.style.transform = 'translateX(0) rotate(0)';
      });
    }
  }
}

// Calculate and display estimated read time
function initArticleReadTime() {
  const articles = document.querySelectorAll('.interest-article');
  
  articles.forEach(article => {
    const articleBody = article.querySelector('.article-body');
    if (!articleBody) return;
    
    // Calculate word count
    const text = articleBody.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    
    // Calculate read time (average reading speed: 200 words per minute)
    const readTime = Math.ceil(wordCount / 200);
    
    // Create read time element
    const readTimeElement = document.createElement('span');
    readTimeElement.className = 'article-read-time';
    readTimeElement.textContent = `📖 ${readTime} min read`;
    readTimeElement.style.cssText = `
      font-size: 0.85rem;
      color: var(--secondary-text-color);
      padding: 0.3rem 0.8rem;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.05);
      margin-left: auto;
    `;
    
    // Add to article meta
    const articleMeta = article.querySelector('.article-meta');
    if (articleMeta) {
      articleMeta.appendChild(readTimeElement);
    }
  });
}

// Ripple effect helper
function createRippleEffect(button, event) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    width: ${size}px;
    height: ${size}px;
    top: ${y}px;
    left: ${x}px;
    pointer-events: none;
  `;
  
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .article-point.animated {
    animation: slideIn 0.6s ease forwards;
    opacity: 0;
    transform: translateX(-20px);
  }
  
  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .article-tag {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .interest-article.expanded {
    transform: translateY(-5px) !important;
  }
  
  .interest-article.expanded .article-body {
    max-height: none;
  }
  
  .interest-article .article-body {
    overflow: hidden;
  }
  
  /* Dark mode adjustments */
  body.dark-theme .article-date,
  body.dark-theme .article-read-time {
    background: rgba(255, 255, 255, 0.05);
  }
  
  /* Print styles */
  @media print {
    .interest-article {
      break-inside: avoid;
      box-shadow: none;
      border: 1px solid #ddd;
    }
    
    .interests-cta {
      display: none;
    }
  }
`;
document.head.appendChild(style);

// Scroll to article functionality (optional)
function initArticleNavigation() {
  // Add ID to each article for direct linking
  const articles = document.querySelectorAll('.interest-article');
  const articleTitles = ['ai-machine-learning', 'cybersecurity', 'cloud-emerging-tech'];
  
  articles.forEach((article, index) => {
    if (articleTitles[index]) {
      article.id = articleTitles[index];
    }
  });
  
  // Update URL hash when clicking on article (optional feature)
  articles.forEach(article => {
    const header = article.querySelector('.article-header');
    if (header && article.id) {
      header.style.cursor = 'pointer';
      header.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') return;
        history.pushState(null, null, `#${article.id}`);
      });
    }
  });
}

// Initialize on load
window.addEventListener('load', function() {
  initArticleNavigation();
  
  // Add smooth scroll for article links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#ai-') || href.startsWith('#cyber') || href.startsWith('#cloud')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initInterestsAnimations,
    initInterestsInteractions,
    initArticleReadTime
  };
}
