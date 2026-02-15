/**
 * The Keiser Clinic - Main JavaScript
 * Handles: Navigation, Slider, Scroll Animations, Mobile Menu
 */

document.addEventListener('DOMContentLoaded', function() {
    // ================================================
    // HEADER SCROLL EFFECT
    // ================================================
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // ================================================
    // MOBILE MENU TOGGLE
    // ================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // ================================================
    // TREATMENT SLIDER
    // ================================================
    const slides = document.querySelectorAll('.treatment-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].style.display = 'grid';
        // Force reflow for animation
        slides[index].offsetHeight;
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Initialize slider
    if (slides.length > 0) {
        showSlide(0);
        startSlider();

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopSlider();
                showSlide(index);
                startSlider();
            });
        });

        // Pause on hover
        const sliderContainer = document.querySelector('.treatment-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
        }
    }

    // ================================================
    // TESTIMONIAL SLIDER
    // ================================================
    (function() {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');

        if (testimonialSlides.length === 0) return;

        let currentTestimonial = 0;
        let testimonialInterval = null;

        function showTestimonial(index) {
            testimonialSlides.forEach((slide) => {
                slide.classList.remove('active');
            });
            testimonialDots.forEach(dot => dot.classList.remove('active'));

            if (testimonialSlides[index]) {
                testimonialSlides[index].classList.add('active');
            }
            if (testimonialDots[index]) {
                testimonialDots[index].classList.add('active');
            }
            currentTestimonial = index;
        }

        function nextTestimonial() {
            let next = currentTestimonial + 1;
            if (next >= testimonialSlides.length) next = 0;
            showTestimonial(next);
        }

        function startTestimonialSlider() {
            if (testimonialInterval) clearInterval(testimonialInterval);
            testimonialInterval = setInterval(nextTestimonial, 4000);
        }

        function stopTestimonialSlider() {
            if (testimonialInterval) {
                clearInterval(testimonialInterval);
                testimonialInterval = null;
            }
        }

        // Initialize
        showTestimonial(0);
        startTestimonialSlider();

        // Dot click handlers
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopTestimonialSlider();
                showTestimonial(index);
                startTestimonialSlider();
            });
        });

        // Pause on hover
        const testimonialContainer = document.querySelector('.testimonial-slider');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('mouseenter', stopTestimonialSlider);
            testimonialContainer.addEventListener('mouseleave', startTestimonialSlider);
        }
    })();

    // ================================================
    // SCROLL ANIMATIONS
    // ================================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================================
    // LAZY LOADING IMAGES
    // ================================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ================================================
    // ANALYTICS TRACKING (placeholder)
    // ================================================
    function trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        // Console log for debugging
        console.log('Event:', category, action, label);
    }

    // Track CTA clicks
    document.querySelectorAll('.hero-cta, .nav-cta, .cta-button').forEach(cta => {
        cta.addEventListener('click', function() {
            trackEvent('CTA', 'click', this.textContent.trim());
        });
    });

    // Track condition card clicks
    document.querySelectorAll('.condition-card').forEach(card => {
        card.addEventListener('click', function() {
            const conditionName = this.querySelector('h4').textContent;
            trackEvent('Conditions', 'click', conditionName);
        });
    });

    // ================================================
    // FORM HANDLING - Email Capture
    // ================================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            var formName = form.getAttribute('name') || form.id || 'unknown';
            trackEvent('Lead Magnet', 'email_capture', formName);

            // Change button text to show confirmation
            var btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.textContent = 'Sending...';
                btn.disabled = true;
            }
        });
    });

    // ================================================
    // KEYBOARD NAVIGATION
    // ================================================
    document.addEventListener('keydown', function(e) {
        // Handle slider navigation with arrow keys when slider is focused
        const sliderContainer = document.querySelector('.treatment-slider');
        if (sliderContainer && sliderContainer.matches(':hover')) {
            if (e.key === 'ArrowRight') {
                stopSlider();
                nextSlide();
                startSlider();
            } else if (e.key === 'ArrowLeft') {
                stopSlider();
                let prev = currentSlide - 1;
                if (prev < 0) prev = slides.length - 1;
                showSlide(prev);
                startSlider();
            }
        }
    });

    // ================================================
    // PERFORMANCE MONITORING
    // ================================================
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page Load Time:', Math.round(perfData.loadEventEnd - perfData.startTime), 'ms');
                }
            }, 0);
        });
    }
});

// ================================================
// SERVICE WORKER REGISTRATION (for future PWA)
// ================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js');
    });
}
