// Premium Greenstar Solar Website JavaScript
// High-end interactions and animations for luxury experience

class GreenstarWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupNavigation();
        this.setupParallax();
        this.setupAnimations();
        this.setupFormHandling();
        this.setupStats();
        this.setupHeroEffects();
    }

    // Smooth scrolling navigation
    setupNavigation() {
        // Navbar scroll behavior
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(30px)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'none';
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Premium parallax effects
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        const heroBackground = document.querySelector('.hero-background');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // Hero parallax
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }

            // Other parallax sections
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Advanced scroll animations
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animation for grid items
                    if (entry.target.classList.contains('solutions-grid') || 
                        entry.target.classList.contains('portfolio-grid')) {
                        this.staggerAnimation(entry.target.children);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(`
            .section-header,
            .solutions-grid,
            .portfolio-grid,
            .about-content,
            .contact-content,
            .solution-card,
            .portfolio-item
        `);

        animatedElements.forEach(el => observer.observe(el));
    }

    // Stagger animations for grid items
    staggerAnimation(elements) {
        Array.from(elements).forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // Premium animations setup
    setupAnimations() {
        // Add initial styles for animated elements
        const style = document.createElement('style');
        style.textContent = `
            .solution-card,
            .portfolio-item {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .section-header {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }

            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            .solution-card:hover .card-icon {
                transform: scale(1.1) rotate(5deg);
                transition: all 0.3s ease;
            }

            .portfolio-item:hover .portfolio-image {
                transform: scale(1.05);
                transition: all 0.5s ease;
            }

            /* Luxury hover effects */
            .btn-primary,
            .btn-secondary {
                position: relative;
                overflow: hidden;
            }

            .btn-primary::before,
            .btn-secondary::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                transition: left 0.5s ease;
            }

            .btn-primary:hover::before,
            .btn-secondary:hover::before {
                left: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    // Animated counter for stats
    setupStats() {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isMoney = target.includes('$');
        const hasPlus = target.includes('+');
        
        let numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
        
        if (isMoney && target.includes('M')) {
            numericTarget = numericTarget;
        }

        let current = 0;
        const increment = numericTarget / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isMoney) {
                displayValue = `$${displayValue}M`;
            }
            if (hasPlus) {
                displayValue += '+';
            }
            if (isPercentage) {
                displayValue += '%';
            }
            
            element.textContent = displayValue;
        }, 30);
    }

    // Hero section premium effects
    setupHeroEffects() {
        const heroTitle = document.querySelector('.hero-title');
        const heroBackground = document.querySelector('.hero-background');

        // Mouse movement parallax effect for hero
        document.addEventListener('mousemove', (e) => {
            if (window.scrollY < window.innerHeight) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                const moveX = (mouseX - 0.5) * 20;
                const moveY = (mouseY - 0.5) * 20;
                
                if (heroBackground) {
                    heroBackground.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            }
        });

        // Typing effect for hero title (premium touch)
        if (heroTitle) {
            this.setupTypingEffect(heroTitle);
        }
    }

    setupTypingEffect(element) {
        const lines = element.querySelectorAll('.title-line');
        lines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            setTimeout(() => {
                this.typeText(line, text);
            }, 500 + (index * 1000));
        });
    }

    typeText(element, text) {
        let i = 0;
        const speed = 100;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Premium form handling
    setupFormHandling() {
        const form = document.querySelector('.contact-form form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });

            // Premium input effects
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });

                // Add floating labels effect
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            });
        }
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Premium loading state
        submitBtn.textContent = 'Scheduling...';
        submitBtn.style.background = 'linear-gradient(135deg, #00B894 0%, #00A085 100%)';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual form handling)
        setTimeout(() => {
            submitBtn.textContent = 'Consultation Scheduled ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #00D4AA 0%, #00B894 100%)';
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    }

    // Premium scroll indicator
    setupScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-progress';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #00D4AA, #00B894);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = `${scrolled}%`;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GreenstarWebsite();
});

// Premium loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add premium cursor for desktop
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'premium-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 212, 170, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            backdrop-filter: blur(5px);
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Scale cursor on hover over interactive elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('button, a, .solution-card, .portfolio-item')) {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(0, 212, 170, 0.5)';
            } else {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(0, 212, 170, 0.8)';
            }
        });
    }
});