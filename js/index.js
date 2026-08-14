document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       Sticky Navbar Scroll Logic
       ========================================== */
    const header = document.querySelector('.navbar-area');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    /* ==========================================
       Mobile Menu Toggle Logic
       ========================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Create overlay
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
        
        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Set active navigation class
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    /* ==========================================
       Hero Slider Logic
       ========================================== */
    const slides = document.querySelectorAll('#heroSlider .slide');
    const dots = document.querySelectorAll('#sliderDots .dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let index = (currentSlide + 1) % slides.length;
        showSlide(index);
    };

    const prevSlide = () => {
        let index = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(index);
    };

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetSlideInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetSlideInterval();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            showSlide(index);
            resetSlideInterval();
        });
    });

    const startSlideInterval = () => {
        slideInterval = setInterval(nextSlide, 6000);
    };

    const resetSlideInterval = () => {
        clearInterval(slideInterval);
        startSlideInterval();
    };

    startSlideInterval();

    /* ==========================================
       Testimonials Carousel Logic
       ========================================== */
    const track = document.getElementById('testimonialTrack');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    let testimonialIndex = 0;

    const updateTestimonials = () => {
        if (track) {
            track.style.transform = `translateX(-${testimonialIndex * 100}%)`;
        }
    };

    if (nextTestimonial && prevTestimonial && cards.length > 0) {
        nextTestimonial.addEventListener('click', () => {
            testimonialIndex = (testimonialIndex + 1) % cards.length;
            updateTestimonials();
        });

        prevTestimonial.addEventListener('click', () => {
            testimonialIndex = (testimonialIndex - 1 + cards.length) % cards.length;
            updateTestimonials();
        });
    }

    /* ==========================================
       Accordion Logic (FAQs)
       ========================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                item.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });

    // Initialize first active FAQ content height
    const activeAccordion = document.querySelector('.accordion-item.active .accordion-content');
    if (activeAccordion) {
        activeAccordion.style.maxHeight = activeAccordion.scrollHeight + "px";
    }

    /* ==========================================
       Scroll Reveal Animations
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================
       Contact Form Submission Handler
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple visual validation & response triggers
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            if (name && email && phone && message) {
                formSuccess.style.display = 'block';
                contactForm.reset();
                
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }

    /* ==========================================
       Back to Top Button Logic
       ========================================== */
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

});
