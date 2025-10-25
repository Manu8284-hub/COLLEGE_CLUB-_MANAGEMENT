// main.js

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Change menu icon
        this.textContent = isExpanded ? '☰' : '✕';
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.textContent = '☰';
            body.classList.remove('menu-open');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);

    // Club card hover effects
    const clubCards = document.querySelectorAll('.club-card');
    clubCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Join club button functionality
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.includes('Join Club')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const clubName = this.closest('.club-card').querySelector('h3').textContent;
                
                // Check if user is logged in (you'll need to implement actual auth)
                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                
                if (!isLoggedIn) {
                    // Redirect to login page or show login modal
                    window.location.href = 'auth.html?redirect=' + encodeURIComponent(window.location.pathname);
                    return;
                }

                // Show confirmation
                showJoinConfirmation(clubName);
            });
        }
    });

    // Event item animations
    const eventItems = document.querySelectorAll('.event-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    eventItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });

    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }

        // Hide/show header on scroll
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // Search functionality (you can expand this)
    function initSearch() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search clubs...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            padding: 8px 15px;
            border: 2px solid var(--primary);
            border-radius: 25px;
            margin-left: 20px;
            display: none;
        `;

        // Add search input to navigation (optional)
        // navMenu.parentElement.insertBefore(searchInput, navMenu);

        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterClubs(searchTerm);
        });
    }

    function filterClubs(searchTerm) {
        const clubCards = document.querySelectorAll('.club-card');
        clubCards.forEach(card => {
            const clubName = card.querySelector('h3').textContent.toLowerCase();
            const clubDescription = card.querySelector('p').textContent.toLowerCase();
            
            if (clubName.includes(searchTerm) || clubDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Initialize search (uncomment if you want to add search)
    // initSearch();

    // Newsletter signup (example functionality)
    const newsletterForm = document.createElement('form');
    newsletterForm.className = 'newsletter-form';
    newsletterForm.innerHTML = `
        <h3>Stay Updated</h3>
        <input type="email" placeholder="Enter your email" required>
        <button type="submit" class="btn btn-primary">Subscribe</button>
    `;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        // Here you would typically send this to your backend
        console.log('Newsletter signup:', email);
        alert('Thanks for subscribing!');
        this.reset();
    });

    // Add newsletter to footer (optional)
    // document.querySelector('.footer-grid').appendChild(newsletterForm);

    // Club member count animation
    function animateMemberCounts() {
        const memberCounts = document.querySelectorAll('.club-meta span:last-child');
        memberCounts.forEach(countElement => {
            const currentText = countElement.textContent;
            const match = currentText.match(/(\d+)\+? Members/);
            if (match) {
                const targetCount = parseInt(match[1]);
                animateCounter(countElement, targetCount);
            }
        });
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // Adjust speed
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = `👤 ${Math.floor(current)}+ Members`;
        }, 30);
    }

    // Run member count animation when in view
    const memberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMemberCounts();
                memberObserver.unobserve(entry.target);
            }
        });
    });

    memberObserver.observe(document.querySelector('.clubs'));

    // Utility functions
    function showJoinConfirmation(clubName) {
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 10px; text-align: center;">
                <h3>Join ${clubName}</h3>
                <p>Are you sure you want to join this club?</p>
                <div style="margin-top: 1rem;">
                    <button class="btn btn-primary confirm-join">Yes, Join</button>
                    <button class="btn btn-outline cancel-join" style="margin-left: 1rem;">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.confirm-join').addEventListener('click', () => {
            // Here you would typically make an API call to join the club
            alert(`Successfully joined ${clubName}!`);
            document.body.removeChild(modal);
        });

        modal.querySelector('.cancel-join').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            navMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.textContent = '☰';
        }
    });
});

// Add these CSS styles to your existing styles.css for the JS functionality
const additionalStyles = `
/* Add to your existing CSS */
body.menu-open {
    overflow: hidden;
}

.nav-menu.active {
    display: flex !important;
    flex-direction: column;
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px);
    background: var(--white);
    padding: 2rem;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.nav-menu.active li {
    margin: 1rem 0;
}

.search-input {
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
}

.confirmation-modal {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Loading state */
body:not(.loaded) * {
    transition: none !important;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Focus styles for keyboard navigation */
a:focus, button:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}
`;

// You can inject these styles dynamically or add them to your CSS file
// document.head.insertAdjacentHTML('beforeend', `<style>${additionalStyles}</style>`);