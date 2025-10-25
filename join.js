// join.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Club registration functionality
    initializeClubRegistration();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
});

// Initialize club registration system
function initializeClubRegistration() {
    const joinButtons = document.querySelectorAll('.club-card .btn');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close-btn');
    const registrationForm = document.querySelector('#register form');
    const clubSelect = document.getElementById('club');

    // Open modal when join button is clicked
    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const clubCard = this.closest('.club-card');
            const clubName = clubCard.querySelector('h3').textContent;
            const clubDescription = clubCard.querySelector('p').textContent;
            
            openRegistrationModal(clubName, clubDescription);
        });
    });

    // Close modal functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeRegistrationModal();
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeRegistrationModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeRegistrationModal();
        }
    });

    // Form submission handling
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
        
        // Real-time validation
        const formInputs = registrationForm.querySelectorAll('input, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateRegistrationField);
            input.addEventListener('input', clearRegistrationFieldError);
        });

        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }
    }
}

// Open registration modal
function openRegistrationModal(clubName, clubDescription) {
    const modal = document.querySelector('.modal');
    const clubSelect = document.getElementById('club');
    const form = document.querySelector('#register form');
    
    if (modal && clubSelect) {
        // Set the selected club
        clubSelect.value = clubName;
        
        // Update modal title with club name
        const modalTitle = modal.querySelector('h2');
        if (modalTitle) {
            modalTitle.textContent = `Join ${clubName}`;
        }
        
        // Add club description if needed
        let descriptionElement = modal.querySelector('.club-description');
        if (!descriptionElement) {
            descriptionElement = document.createElement('p');
            descriptionElement.className = 'club-description';
            descriptionElement.style.color = '#666';
            descriptionElement.style.marginBottom = '20px';
            descriptionElement.style.fontSize = '0.95rem';
            modal.querySelector('.modal-content').insertBefore(descriptionElement, form);
        }
        descriptionElement.textContent = clubDescription;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Focus on first input
        const firstInput = form.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

// Close registration modal
function closeRegistrationModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset form
        const form = document.querySelector('#register form');
        if (form) {
            form.reset();
            clearRegistrationFormErrors();
        }
    }
}

// Handle registration form submission
function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate form
    if (!validateRegistrationForm(form)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="loading-spinner"></div> Registering...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const registrationData = Object.fromEntries(formData);
        
        // Save registration to localStorage
        saveRegistration(registrationData);
        
        // Show success message
        showRegistrationSuccess(registrationData.club);
        
        // Close modal after delay
        setTimeout(() => {
            closeRegistrationModal();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
        
    }, 1500);
}

// Validate registration form
function validateRegistrationForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateRegistrationField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Individual field validation for registration
function validateRegistrationField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearRegistrationFieldError(e);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        const cleanPhone = value.replace(/\s/g, '');
        if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number (at least 10 digits)';
        }
    }
    
    // Name validation
    if (fieldName === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name should be at least 2 characters long';
        }
    }
    
    if (!isValid) {
        showRegistrationFieldError(field, errorMessage);
    } else {
        markRegistrationFieldValid(field);
    }
    
    return isValid;
}

// Show field error for registration form
function showRegistrationFieldError(field, message) {
    field.style.borderColor = '#d24a4a';
    field.style.boxShadow = '0 0 0 4px rgba(210, 74, 74, 0.12)';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('small');
        errorElement.className = 'field-error';
        errorElement.style.color = '#d24a4a';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '5px';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Clear field error for registration form
function clearRegistrationFieldError(e) {
    const field = e.target;
    field.style.borderColor = '#e5e5e9';
    field.style.boxShadow = 'none';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear all form errors
function clearRegistrationFormErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('#register input, #register select');
    inputs.forEach(input => {
        input.style.borderColor = '#e5e5e9';
        input.style.boxShadow = 'none';
    });
}

// Mark field as valid
function markRegistrationFieldValid(field) {
    field.style.borderColor = '#1ea971';
    field.style.boxShadow = '0 0 0 4px rgba(30, 169, 113, 0.12)';
}

// Show registration success message
function showRegistrationSuccess(clubName) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <span>✓ Successfully registered for ${clubName}! You'll receive a confirmation email shortly.</span>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                z-index: 1001;
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }
            .notification.success {
                background: #27ae60;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 5000);
}

// Save registration data to localStorage
function saveRegistration(registrationData) {
    const registrations = JSON.parse(localStorage.getItem('clubRegistrations') || '[]');
    
    // Add timestamp
    registrationData.timestamp = new Date().toISOString();
    registrationData.id = Date.now().toString();
    
    registrations.push(registrationData);
    localStorage.setItem('clubRegistrations', JSON.stringify(registrations));
    
    console.log('Registration saved:', registrationData);
}

// Get user's registrations
function getUserRegistrations() {
    return JSON.parse(localStorage.getItem('clubRegistrations') || '[]');
}

// Check if user is already registered for a club
function isUserRegistered(clubName, email) {
    const registrations = getUserRegistrations();
    return registrations.some(reg => 
        reg.club === clubName && reg.email === email
    );
}

// Phone number formatting
function formatPhoneNumber(e) {
    const input = e.target;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 5) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
        } else if (value.length <= 10) {
            value = value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5);
        } else {
            value = value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5, 10);
        }
    }
    
    input.value = value;
}

// Smooth scrolling initialization
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function: Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize club card interactions
function initializeClubCards() {
    const clubCards = document.querySelectorAll('.club-card');
    
    clubCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click animation
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Add loading spinner styles
function addLoadingSpinnerStyles() {
    if (!document.querySelector('#join-spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'join-spinner-styles';
        style.textContent = `
            .loading-spinner {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid #ffffff;
                border-radius: 50%;
                border-top-color: transparent;
                animation: spin 1s ease-in-out infinite;
                margin-right: 8px;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            /* Modal backdrop blur effect */
            .modal {
                backdrop-filter: blur(5px);
            }
            
            /* Club card animations */
            .club-card {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeClubCards();
    addLoadingSpinnerStyles();
    
    // Check and update join button states based on existing registrations
    updateJoinButtonStates();
});

// Update join button states based on existing registrations
function updateJoinButtonStates() {
    const clubCards = document.querySelectorAll('.club-card');
    const userEmail = localStorage.getItem('userEmail'); // You might get this from auth system
    
    if (!userEmail) return;
    
    clubCards.forEach(card => {
        const clubName = card.querySelector('h3').textContent;
        const joinButton = card.querySelector('.btn');
        
        if (isUserRegistered(clubName, userEmail)) {
            joinButton.textContent = 'Already Joined ✓';
            joinButton.classList.add('joined');
            joinButton.disabled = true;
        }
    });
}

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeClubRegistration,
        saveRegistration,
        getUserRegistrations,
        isUserRegistered
    };
}