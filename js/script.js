// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Show success message (in real application, you would send this to a server)
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Add scroll-based animation for elements
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Facts carousel auto-scroll
const factsCarousel = document.querySelector('.facts-carousel');
if (factsCarousel) {
    setInterval(() => {
        factsCarousel.scrollLeft += 320;
        if (factsCarousel.scrollLeft >= factsCarousel.scrollWidth - factsCarousel.clientWidth) {
            factsCarousel.scrollLeft = 0;
        }
    }, 3000);
}

// Add animation for process steps
const steps = document.querySelectorAll('.step');
steps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    setTimeout(() => {
        step.style.transition = 'all 0.5s ease';
        step.style.opacity = '1';
        step.style.transform = 'translateY(0)';
    }, index * 200);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Animate numbers in stats
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate process steps on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
};

const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = "translateY(0)";
            entry.target.style.opacity = "1";
        }
    });
}, observerOptions);

document.querySelectorAll('.step').forEach(step => {
    step.style.transform = "translateY(30px)";
    step.style.opacity = "0";
    step.style.transition = "all 0.6s ease-out";
    processObserver.observe(step);
});

// Interactive facts carousel
const facts = document.querySelectorAll('.fact');
facts.forEach(fact => {
    fact.addEventListener('mouseenter', function() {
        this.style.transform = "scale(1.05) translateY(-10px)";
    });
    fact.addEventListener('mouseleave', function() {
        this.style.transform = "scale(1) translateY(0)";
    });
});

// Impact section scroll buttons
const impactGrid = document.querySelector('.impact-grid');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

if (scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
        impactGrid.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        impactGrid.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });
}

// Show/hide scroll buttons based on scroll position
const updateScrollButtons = () => {
    if (impactGrid) {
        const { scrollLeft, scrollWidth, clientWidth } = impactGrid;
        scrollLeftBtn.style.display = scrollLeft > 0 ? 'block' : 'none';
        scrollRightBtn.style.display = scrollLeft < scrollWidth - clientWidth ? 'block' : 'none';
    }
};

if (impactGrid) {
    impactGrid.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons();
}

// Improved Impact section auto-scroll
class ImpactScroller {
    constructor(element, options = {}) {
        this.container = element;
        this.interval = options.interval || 3000;
        this.scrollAmount = options.scrollAmount || 320;
        this.autoScrollTimer = null;
        this.userScrollTimer = null;
        this.isMouseOver = false;
        
        this.init();
    }

    init() {
        this.startAutoScroll();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.container.addEventListener('mouseenter', () => {
            this.isMouseOver = true;
            this.stopAutoScroll();
        });

        this.container.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
            this.startAutoScroll();
        });

        this.container.addEventListener('scroll', () => this.handleUserScroll());
    }

    startAutoScroll() {
        if (!this.isMouseOver) {
            this.autoScrollTimer = setInterval(() => this.scroll(), this.interval);
        }
    }

    stopAutoScroll() {
        if (this.autoScrollTimer) {
            clearInterval(this.autoScrollTimer);
            this.autoScrollTimer = null;
        }
    }

    handleUserScroll() {
        this.stopAutoScroll();
        if (this.userScrollTimer) {
            clearTimeout(this.userScrollTimer);
        }
        
        this.userScrollTimer = setTimeout(() => {
            if (!this.isMouseOver) {
                this.startAutoScroll();
            }
        }, 2000);
    }

    scroll() {
        if (this.container.scrollLeft >= this.container.scrollWidth - this.container.clientWidth) {
            // Smooth reset to start when reaching the end
            this.container.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            this.container.scrollBy({
                left: this.scrollAmount,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize impact section scroller
const impactSection = document.querySelector('.impact-scroll');
if (impactSection) {
    new ImpactScroller(impactSection, {
        interval: 3000,
        scrollAmount: 320
    });
}

// Enhanced scroll-based animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (elementTop < triggerPoint) {
            element.classList.add('animate');
        }
    });
};

// Improved carousel functionality
class Carousel {
    constructor(element, options = {}) {
        this.container = element;
        this.interval = options.interval || 3000;
        this.autoplay = options.autoplay !== false;
        this.items = this.container.children;
        this.currentIndex = 0;
        
        this.init();
    }

    init() {
        if (this.autoplay) {
            this.play();
        }
        
        this.container.addEventListener('mouseenter', () => this.pause());
        this.container.addEventListener('mouseleave', () => this.play());
    }

    play() {
        this.interval = setInterval(() => this.next(), this.interval);
    }

    pause() {
        clearInterval(this.interval);
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updatePosition();
    }

    updatePosition() {
        const offset = -this.currentIndex * this.items[0].offsetWidth;
        this.container.style.transform = `translateX(${offset}px)`;
    }
}

// Initialize carousels
document.querySelectorAll('.carousel').forEach(carousel => {
    new Carousel(carousel);
});

// Enhanced form handling with validation
const enhancedFormHandler = (form) => {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (validateForm(form)) {
            await submitForm(form);
        }
    });
};

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    const isValid = value.length > 0;
    
    input.classList.toggle('invalid', !isValid);
    return isValid;
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    return Array.from(inputs).every(input => validateInput({ target: input }));
}

async function submitForm(form) {
    try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccessMessage();
        form.reset();
    } catch (error) {
        showErrorMessage();
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', animateOnScroll);
    document.querySelectorAll('form').forEach(enhancedFormHandler);
    animateOnScroll();
});