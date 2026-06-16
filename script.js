/**
 * Toruk Makto Core Interactive System Modules - Fully Fixed Version
 */

// 1. Clear any old dismissal memory immediately
localStorage.removeItem("designer_toast_hidden");

// 2. Trigger the toast layout animation directly 
setTimeout(() => {
    const toast = document.getElementById("designer-toast");
    if (toast) {
        toast.classList.add("slide-in");
    }
}, 1200);

// 3. Automated Active Navigation State Sync Engine
const currentPath = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (currentPath === linkPath || (currentPath === "" && linkPath === "index.html")) {
        link.classList.add("active");
    }
});

/**
 * Close the layout card visually
 */
function dismissDesignerToast() {
    const toast = document.getElementById("designer-toast");
    if (toast) {
        toast.classList.remove("slide-in");
    }
}

// Bind dismiss function to global context window for direct HTML inline execution
window.dismissDesignerToast = dismissDesignerToast;

// =============================================
// 4. COUNTER ANIMATIONS FOR STATS
// =============================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Trigger counters when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateCounters);
} else {
    animateCounters();
}

// =============================================
// 5. SCROLL ANIMATIONS (FIXED VISIBILITY BUG)
// =============================================

const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // CRITICAL FIX: Remove the hidden inline opacity style completely
            entry.target.style.removeProperty('opacity');
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Smart Scroll Initialization
document.querySelectorAll('.media-card, .team-card, .testimonial-card, .event-card').forEach(el => {
    const rect = el.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight && rect.bottom > 0;

    if (isAboveFold || rect.top === 0) {
        // If the card is already visible on load, keep it visible and animate cleanly
        el.style.removeProperty('opacity');
        el.style.animation = 'slideInUp 0.6s ease forwards';
    } else {
        // If it's below the fold, hide it temporarily until scrolled into view
        el.style.opacity = '0';
        observer.observe(el);
    }
});

// =============================================
// 6. NEWSLETTER SIGNUP
// =============================================

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const message = document.getElementById('newsletterMessage');
        message.textContent = '✓ Thank you for subscribing!';
        message.style.color = 'var(--accent-color)';
        message.style.display = 'block';
        this.reset();
        setTimeout(() => message.style.display = 'none', 3000);
    });
}

// =============================================
// 7. SCROLL TO TOP BUTTON
// =============================================

const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
