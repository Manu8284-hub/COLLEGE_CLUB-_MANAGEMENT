// auth.js

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('.btn');

    // Loading state
    let isLoading = false;

    // Form validation
    function validateForm() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        // Clear previous errors
        clearErrors();

        // Email validation
        if (!email) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Password validation
        if (!password) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error message
    function showError(input, message) {
        const inputGroup = input.parentElement;
        
        // Add error class
        inputGroup.classList.add('error');
        
        // Create or update error message
        let errorElement = inputGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            inputGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    // Clear all errors
    function clearErrors() {
        document.querySelectorAll('.input-group').forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        if (isLoading) return;
        
        // Show loading state
        setLoadingState(true);
        
        // Simulate API call
        setTimeout(() => {
            // For demo purposes, always succeed
            handleSuccessfulLogin();
        }, 1500);
    });

    // Real-time validation
    emailInput.addEventListener('blur', validateForm);
    passwordInput.addEventListener('blur', validateForm);

    // Clear errors on input
    emailInput.addEventListener('input', function() {
        clearSingleError(this);
    });

    passwordInput.addEventListener('input', function() {
        clearSingleError(this);
    });

    function clearSingleError(input) {
        const inputGroup = input.parentElement;
        inputGroup.classList.remove('error');
        const errorElement = inputGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Loading state management
    function setLoadingState(loading) {
        isLoading = loading;
        submitButton.disabled = loading;
        
        if (loading) {
            submitButton.innerHTML = '<div class="loading-spinner"></div> Logging in...';
            submitButton.style.opacity = '0.7';
        } else {
            submitButton.innerHTML = 'Login';
            submitButton.style.opacity = '1';
        }
    }

    // Successful login handler
    function handleSuccessfulLogin() {
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', emailInput.value.trim());
        
        // Show success message
        showSuccessMessage();
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }

    // Show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Login successful! Redirecting...';
        successMessage.style.cssText = `
            background: #d4edda;
            color: #155724;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
            border: 1px solid #c3e6cb;
        `;
        
        loginForm.insertBefore(successMessage, loginForm.firstChild);
    }

    // Password visibility toggle
    const passwordToggle = document.createElement('button');
    passwordToggle.type = 'button';
    passwordToggle.innerHTML = '👁️';
    passwordToggle.className = 'password-toggle';
    passwordToggle.style.cssText = `
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        opacity: 0.6;
        transition: opacity 0.3s ease;
    `;

    passwordToggle.addEventListener('mouseenter', () => {
        passwordToggle.style.opacity = '1';
    });

    passwordToggle.addEventListener('mouseleave', () => {
        passwordToggle.style.opacity = '0.6';
    });

    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // Add toggle to password input group
    const passwordGroup = passwordInput.parentElement;
    passwordGroup.style.position = 'relative';
    passwordGroup.appendChild(passwordToggle);

    // Demo credentials auto-fill for testing
    const demoButton = document.createElement('button');
    demoButton.type = 'button';
    demoButton.textContent = 'Use Demo Credentials';
    demoButton.className = 'btn btn-outline';
    demoButton.style.cssText = `
        width: 100%;
        margin-top: 10px;
        background: transparent;
        border: 2px solid #9b59b6;
        color: #9b59b6;
    `;

    demoButton.addEventListener('click', function() {
        emailInput.value = 'demo@college.edu';
        passwordInput.value = 'demo123';
        clearErrors();
        
        // Show demo info
        const demoInfo = document.createElement('div');
        demoInfo.className = 'demo-info';
        demoInfo.textContent = 'Demo credentials filled! Click Login to continue.';
        demoInfo.style.cssText = `
            background: #e8f4fd;
            color: #0c5460;
            padding: 10px;
            border-radius: 4px;
            margin-top: 10px;
            text-align: center;
            border: 1px solid #b8daff;
            font-size: 0.9rem;
        `;
        
        // Remove existing demo info if any
        const existingInfo = document.querySelector('.demo-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        loginForm.insertBefore(demoInfo, submitButton);
    });

    loginForm.insertBefore(demoButton, document.querySelector('.signup-text'));

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + / to fill demo credentials
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            demoButton.click();
        }
        
        // Enter key to submit form (when not in demo button)
        if (e.key === 'Enter' && e.target !== demoButton) {
            if (!isLoading) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
    });

    // Input animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Page load animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate login card
        const loginCard = document.querySelector('.login-card');
        loginCard.style.opacity = '0';
        loginCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            loginCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            loginCard.style.opacity = '1';
            loginCard.style.transform = 'translateY(0)';
        }, 100);
    });

    // Check if user is already logged in
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            // Show already logged in message
            const loggedInMessage = document.createElement('div');
            loggedInMessage.className = 'info-message';
            loggedInMessage.innerHTML = `
                You're already logged in. <a href="dashboard.html">Go to Dashboard</a> or 
                <a href="#" id="logout-link">Logout</a>.
            `;
            loggedInMessage.style.cssText = `
                background: #fff3cd;
                color: #856404;
                padding: 12px;
                border-radius: 4px;
                margin-bottom: 20px;
                text-align: center;
                border: 1px solid #ffeaa7;
            `;
            
            loginForm.parentElement.insertBefore(loggedInMessage, loginForm);
            
            // Add logout functionality
            document.getElementById('logout-link').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                window.location.reload();
            });
        }
    }

    // Run login status check
    checkLoginStatus();
});

// Add CSS styles for the JavaScript functionality
const authStyles = `
/* Error states */
.input-group.error input {
    border-color: #e74c3c;
    background-color: #fdf2f2;
}

.error-message {
    color: #e74c3c;
    font-size: 0.8rem;
    margin-top: 5px;
    display: block;
}

/* Focus states */
.input-group.focused label {
    color: #9b59b6;
    transform: translateY(-20px) scale(0.8);
}

/* Loading spinner */
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

/* Button states */
.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Input transitions */
.input-group {
    transition: all 0.3s ease;
}

.input-group label {
    transition: all 0.3s ease;
}

/* Success message animation */
.success-message {
    animation: slideDown 0.5s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Login card animation */
.login-card {
    transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Page load animation */
body:not(.loaded) {
    opacity: 0;
}

body.loaded {
    opacity: 1;
    transition: opacity 0.3s ease;
}

/* Demo button hover effect */
.btn-outline:hover {
    background: #9b59b6 !important;
    color: white !important;
}

/* Password toggle focus */
.password-toggle:focus {
    outline: 2px solid #9b59b6;
    outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
    .password-toggle {
        right: 8px;
        font-size: 0.9rem;
    }
}
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', `<style>${authStyles}</style>`);