// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = [
  'Full Stack Developer',
  'Software Engineer', 
  'AI Enthusiast',
  'Problem Solver',
  'Tech Innovator'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeEffect, typeSpeed);
}

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function showSection(sectionId) {
  console.log('Showing section:', sectionId); // Debug log
  
  // Hide all sections
  sections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = 'block';
    // Use setTimeout to ensure display change takes effect before adding active class
    setTimeout(() => {
      targetSection.classList.add('active');
    }, 10);
  } else {
    console.error('Section not found:', sectionId);
  }
  
  // Update active nav link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });
  
  // Close mobile menu
  if (navMenu) {
    navMenu.classList.remove('active');
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Navigation event listeners
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    console.log('Nav link clicked:', sectionId); // Debug log
    showSection(sectionId);
  });
});

// Hamburger menu
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// PPT Viewer Functions
function openPPTViewer() {
  const modal = document.getElementById('pptModal');
  const iframe = document.getElementById('pptFrame');
  
  if (modal && iframe) {
    // Set the PDF source with view-only parameters
    iframe.src = 'Durvesh Group 14 stage 1 PPT.pdf#toolbar=0&navpanes=0&scrollbar=0';
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closePPTViewer() {
  const modal = document.getElementById('pptModal');
  const iframe = document.getElementById('pptFrame');
  
  if (modal && iframe) {
    modal.style.display = 'none';
    iframe.src = ''; // Clear the iframe source
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
  const modal = document.getElementById('pptModal');
  if (event.target === modal) {
    closePPTViewer();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePPTViewer();
  }
});

// Skill bar animations
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  skillBars.forEach(bar => {
    const level = bar.getAttribute('data-level');
    if (level) {
      bar.style.setProperty('--level', level + '%');
    }
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Animate skill bars when skills section is visible
      if (entry.target.id === 'skills') {
        setTimeout(animateSkillBars, 500);
      }
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  observer.observe(section);
});

// Smooth scrolling for scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    showSection('about');
  });
}

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
  }
});

// Particle effect for hero section
function createParticles() {
  const heroSection = document.getElementById('home');
  if (!heroSection) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(0, 212, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      animation: float ${Math.random() * 10 + 10}s infinite linear;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 10}s;
    `;
    heroSection.appendChild(particle);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing...'); // Debug log
  
  // Start typing animation
  setTimeout(typeEffect, 1000);
  
  // Show home section by default
  showSection('home');
  
  // Create particles
  createParticles();
  
  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Add click handlers for buttons - make them global
window.showSection = showSection;
window.openPPTViewer = openPPTViewer;
window.closePPTViewer = closePPTViewer;

// Preload images
const imageUrls = [
  'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
];

imageUrls.forEach(url => {
  const img = new Image();
  img.src = url;
});

// Add some interactive elements
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    const xOffset = (x - 0.5) * speed * 20;
    const yOffset = (y - 0.5) * speed * 20;
    
    shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  const currentSection = document.querySelector('.section.active');
  if (!currentSection) return;
  
  const currentIndex = Array.from(sections).indexOf(currentSection);
  
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextSection = sections[nextIndex];
    showSection(nextSection.id);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    const prevSection = sections[prevIndex];
    showSection(prevSection.id);
  }
});

// Fix for button clicks in hero section
document.addEventListener('click', (e) => {
  // Handle "View My Work" button
  if (e.target.closest('.btn-primary') && e.target.closest('#home')) {
    e.preventDefault();
    showSection('projects');
  }
  
  // Handle "Get In Touch" button
  if (e.target.closest('.btn-secondary') && e.target.closest('#home')) {
    e.preventDefault();
    showSection('contact');
  }
});
