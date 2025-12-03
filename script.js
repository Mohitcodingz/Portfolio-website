// ============================================
// PORTFOLIO - INTERACTIVE FUNCTIONALITY
// ============================================

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add smooth scrolling to all nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .section-header');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 1rem;
        box-shadow: 0 16px 64px rgba(0, 0, 0, 0.4);
        z-index: 1000;
        text-align: center;
        animation: fadeInScale 0.5s ease-out;
    `;

    successMessage.innerHTML = `
        <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">Message Sent! 🎉</h3>
        <p style="margin: 0;">Thank you for reaching out. I'll get back to you soon!</p>
    `;

    // Add animation keyframes
    if (!document.getElementById('messageAnimations')) {
        const style = document.createElement('style');
        style.id = 'messageAnimations';
        style.textContent = `
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            @keyframes fadeOutScale {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Remove message after 3 seconds
    setTimeout(() => {
        successMessage.style.animation = 'fadeOutScale 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 3000);

    // Log form data (in a real application, you would send this to a server)
    console.log('Form submitted:', { name, email, message });
});

// ============================================
// DYNAMIC PROJECT IMAGES
// ============================================
// Generate placeholder images for projects
const projectImages = [
    { id: 'project-img-1', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'project-img-2', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 'project-img-3', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 'project-img-4', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
];

projectImages.forEach(({ id, gradient }) => {
    const img = document.getElementById(id);
    if (img) {
        // Create a canvas for the placeholder
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // Create gradient
        const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

        // Extract colors from gradient string (simplified)
        if (gradient.includes('667eea')) {
            grd.addColorStop(0, '#667eea');
            grd.addColorStop(1, '#764ba2');
        } else if (gradient.includes('f093fb')) {
            grd.addColorStop(0, '#f093fb');
            grd.addColorStop(1, '#f5576c');
        } else if (gradient.includes('4facfe')) {
            grd.addColorStop(0, '#4facfe');
            grd.addColorStop(1, '#00f2fe');
        } else if (gradient.includes('43e97b')) {
            grd.addColorStop(0, '#43e97b');
            grd.addColorStop(1, '#38f9d7');
        }

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add decorative elements
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 50 + 20;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Add text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Project Preview', canvas.width / 2, canvas.height / 2);

        // Convert canvas to image
        img.src = canvas.toDataURL();
    }
});

// ============================================
// CURSOR EFFECT (OPTIONAL PREMIUM FEATURE)
// ============================================
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(99, 102, 241, 0) 70%);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease-out;
    display: none;
`;
document.body.appendChild(cursor);

// Only show custom cursor on desktop
if (window.innerWidth > 768) {
    cursor.style.display = 'block';

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// TYPING EFFECT FOR HERO TITLE
// ============================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after page load
    setTimeout(typeWriter, 500);
}

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// SKILL CARDS ANIMATION
// ============================================
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Welcome to my Portfolio!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'color: #8b5cf6; font-size: 16px;');
console.log('%c📧 hello@portfolio.com', 'color: #ec4899; font-size: 14px;');

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// THEME TOGGLE (BONUS FEATURE)
// ============================================
// You can add a theme toggle button later if needed
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}
