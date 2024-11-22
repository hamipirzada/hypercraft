// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navBrand = document.querySelector('.nav-brand');
let menuOpen = false;

// Initialize menu button
menuBtn.innerHTML = '<i class="fas fa-bars"></i>';

// Toggle menu
const toggleMenu = () => {
    menuOpen = !menuOpen;
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = menuOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
};

// Close menu
const closeMenu = () => {
    if (menuOpen) {
        menuOpen = false;
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
};

// Menu button click handler
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Logo click handler - scroll to top without toggling menu
navBrand.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (menuOpen && !e.target.closest('.navbar')) {
        closeMenu();
    }
});

// Prevent menu close when clicking inside
navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Handle navigation link clicks
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        
        // Close menu first
        closeMenu();
        
        // Then scroll to target
        setTimeout(() => {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Add loading state to submit button
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate form submission (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again later.');
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Intersection Observer for animation
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

// Add animation to elements
document.querySelectorAll('.service-card, .stat-item').forEach(element => {
    animateOnScroll.observe(element);
});

// Dynamic copyright year
document.querySelector('.footer-bottom p').innerHTML = 
    `&copy; ${new Date().getFullYear()} HyperCraft. All rights reserved.`;

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Testimonials Slider
const slider = document.querySelector('.testimonials-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.slider-dots');
let currentIndex = 0;
let autoSlideInterval;

// Initialize slider
function initSlider() {
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
    
    // Set initial position
    updateSlider();
    
    // Add button listeners
    prevBtn.addEventListener('click', () => {
        showPrevSlide();
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        showNextSlide();
        resetAutoSlide();
    });
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
}

function updateSlider() {
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
    updateButtons();
    updateDots();
}

function showPrevSlide() {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateSlider();
}

function showNextSlide() {
    currentIndex = Math.min(currentIndex + 1, cards.length - 1);
    updateSlider();
}

function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
    
    // Update button opacity based on state
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex === cards.length - 1 ? '0.5' : '1';
}

function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlider);
