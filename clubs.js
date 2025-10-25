// // clubs.js

// document.addEventListener('DOMContentLoaded', function() {
//     // Mobile Navigation Toggle
//     const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
//     const navMenu = document.querySelector('.nav-menu');
//     const body = document.body;

//     // Mobile menu functionality
//     mobileMenuBtn.addEventListener('click', function() {
//         const isExpanded = this.getAttribute('aria-expanded') === 'true';
//         this.setAttribute('aria-expanded', !isExpanded);
//         navMenu.classList.toggle('active');
//         body.classList.toggle('menu-open');
        
//         // Change menu icon
//         this.textContent = isExpanded ? '☰' : '✕';
//     });

//     // Close mobile menu when clicking on links
//     document.querySelectorAll('.nav-menu a').forEach(link => {
//         link.addEventListener('click', () => {
//             navMenu.classList.remove('active');
//             mobileMenuBtn.setAttribute('aria-expanded', 'false');
//             mobileMenuBtn.textContent = '☰';
//             body.classList.remove('menu-open');
//         });
//     });

//     // Club card animations
//     const clubCards = document.querySelectorAll('.club-card');
    
//     const clubObserver = new IntersectionObserver((entries) => {
//         entries.forEach((entry, index) => {
//             if (entry.isIntersecting) {
//                 setTimeout(() => {
//                     entry.target.style.opacity = '1';
//                     entry.target.style.transform = 'translateY(0) scale(1)';
//                 }, index * 150);
//                 clubObserver.unobserve(entry.target);
//             }
//         });
//     }, {
//         threshold: 0.1,
//         rootMargin: '0px 0px -50px 0px'
//     });

//     clubCards.forEach(card => {
//         card.style.opacity = '0';
//         card.style.transform = 'translateY(30px) scale(0.95)';
//         card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
//         clubObserver.observe(card);
//     });

//     // Join club button functionality
//     document.querySelectorAll('.btn-primary').forEach(button => {
//         if (button.textContent.includes('Join Now')) {
//             button.addEventListener('click', function(e) {
//                 e.preventDefault();
//                 const clubCard = this.closest('.club-card');
//                 const clubName = clubCard.querySelector('h3').textContent;
//                 const clubDescription = clubCard.querySelector('p').textContent;
                
//                 // Check if user is logged in
//                 const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                
//                 if (!isLoggedIn) {
//                     // Redirect to login page with return URL
//                     window.location.href = 'auth.html?redirect=clubs.html&club=' + encodeURIComponent(clubName);
//                     return;
//                 }

//                 // Show join confirmation
//                 showJoinConfirmation(clubName, clubDescription);
//             });
//         }
//     });

//     // Club card hover effects
//     clubCards.forEach(card => {
//         card.addEventListener('mouseenter', function() {
//             this.style.transform = 'translateY(-10px) scale(1.02)';
//             this.style.boxShadow = '0 15px 30px rgba(108, 92, 231, 0.2)';
//         });
        
//         card.addEventListener('mouseleave', function() {
//             this.style.transform = 'translateY(0) scale(1)';
//             this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
//         });

//         // Add click to show more info
//         card.addEventListener('click', function(e) {
//             if (!e.target.classList.contains('btn-primary')) {
//                 const clubName = this.querySelector('h3').textContent;
//                 const clubDescription = this.querySelector('p').textContent;
//                 const clubImage = this.querySelector('img').src;
//                 showClubModal(clubName, clubDescription, clubImage);
//             }
//         });
//     });

//     // Search functionality
//     function initSearch() {
//         const searchContainer = document.createElement('div');
//         searchContainer.className = 'search-container';
//         searchContainer.style.cssText = `
//             max-width: 500px;
//             margin: 0 auto 40px;
//             position: relative;
//         `;

//         const searchInput = document.createElement('input');
//         searchInput.type = 'text';
//         searchInput.placeholder = 'Search clubs by name or description...';
//         searchInput.className = 'search-input';
//         searchInput.style.cssText = `
//             width: 100%;
//             padding: 12px 20px;
//             border: 2px solid #9b59b6;
//             border-radius: 25px;
//             font-size: 1rem;
//             outline: none;
//             transition: all 0.3s ease;
//         `;

//         const searchIcon = document.createElement('span');
//         searchIcon.innerHTML = '🔍';
//         searchIcon.style.cssText = `
//             position: absolute;
//             right: 15px;
//             top: 50%;
//             transform: translateY(-50%);
//             cursor: pointer;
//         `;

//         searchContainer.appendChild(searchInput);
//         searchContainer.appendChild(searchIcon);
        
//         // Insert search after hero section
//         document.querySelector('.clubs-section').insertBefore(searchContainer, document.querySelector('.clubs-grid'));

//         searchInput.addEventListener('input', function(e) {
//             const searchTerm = e.target.value.toLowerCase().trim();
//             filterClubs(searchTerm);
//         });

//         searchIcon.addEventListener('click', function() {
//             searchInput.focus();
//         });
//     }

//     function filterClubs(searchTerm) {
//         const clubCards = document.querySelectorAll('.club-card');
//         let visibleCount = 0;

//         clubCards.forEach(card => {
//             const clubName = card.querySelector('h3').textContent.toLowerCase();
//             const clubDescription = card.querySelector('p').textContent.toLowerCase();
            
//             if (clubName.includes(searchTerm) || clubDescription.includes(searchTerm) || searchTerm === '') {
//                 card.style.display = 'block';
//                 visibleCount++;
                
//                 // Re-animate visible cards
//                 setTimeout(() => {
//                     card.style.opacity = '1';
//                     card.style.transform = 'translateY(0) scale(1)';
//                 }, 100);
//             } else {
//                 card.style.opacity = '0';
//                 card.style.transform = 'translateY(20px) scale(0.95)';
//                 setTimeout(() => {
//                     card.style.display = 'none';
//                 }, 300);
//             }
//         });

//         // Show no results message
//         const existingMessage = document.querySelector('.no-results');
//         if (existingMessage) {
//             existingMessage.remove();
//         }

//         if (visibleCount === 0 && searchTerm !== '') {
//             const noResults = document.createElement('div');
//             noResults.className = 'no-results';
//             noResults.innerHTML = `
//                 <h3>No clubs found</h3>
//                 <p>Try searching with different keywords</p>
//             `;
//             noResults.style.cssText = `
//                 text-align: center;
//                 padding: 40px;
//                 color: #666;
//             `;
//             document.querySelector('.clubs-grid').appendChild(noResults);
//         }
//     }

//     // Initialize search
//     initSearch();

//     // Category filtering
//     function initCategoryFilter() {
//         const categories = ['All', 'Tech', 'Cultural', 'Sports', 'Literary'];
//         const filterContainer = document.createElement('div');
//         filterContainer.className = 'category-filter';
//         filterContainer.style.cssText = `
//             display: flex;
//             justify-content: center;
//             gap: 10px;
//             margin-bottom: 30px;
//             flex-wrap: wrap;
//         `;

//         categories.forEach(category => {
//             const button = document.createElement('button');
//             button.textContent = category;
//             button.className = 'filter-btn';
//             if (category === 'All') {
//                 button.classList.add('active');
//             }
//             button.style.cssText = `
//                 padding: 8px 16px;
//                 border: 2px solid #9b59b6;
//                 background: ${category === 'All' ? '#9b59b6' : 'transparent'};
//                 color: ${category === 'All' ? 'white' : '#9b59b6'};
//                 border-radius: 20px;
//                 cursor: pointer;
//                 transition: all 0.3s ease;
//                 font-weight: 500;
//             `;

//             button.addEventListener('click', function() {
//                 // Remove active class from all buttons
//                 document.querySelectorAll('.filter-btn').forEach(btn => {
//                     btn.style.background = 'transparent';
//                     btn.style.color = '#9b59b6';
//                     btn.classList.remove('active');
//                 });

//                 // Add active class to clicked button
//                 this.style.background = '#9b59b6';
//                 this.style.color = 'white';
//                 this.classList.add('active');

//                 filterByCategory(category);
//             });

//             filterContainer.appendChild(button);
//         });

//         // Insert filter after search
//         document.querySelector('.search-container').insertAdjacentElement('afterend', filterContainer);
//     }

//     function filterByCategory(category) {
//         const clubCards = document.querySelectorAll('.club-card');
        
//         clubCards.forEach(card => {
//             const clubName = card.querySelector('h3').textContent.toLowerCase();
            
//             if (category === 'All' || clubName.includes(category.toLowerCase())) {
//                 card.style.display = 'block';
//                 setTimeout(() => {
//                     card.style.opacity = '1';
//                     card.style.transform = 'translateY(0) scale(1)';
//                 }, 100);
//             } else {
//                 card.style.opacity = '0';
//                 card.style.transform = 'translateY(20px) scale(0.95)';
//                 setTimeout(() => {
//                     card.style.display = 'none';
//                 }, 300);
//             }
//         });
//     }

//     // Initialize category filter
//     initCategoryFilter();

//     // Utility functions
//     function showJoinConfirmation(clubName, clubDescription) {
//         const modal = document.createElement('div');
//         modal.className = 'confirmation-modal';
//         modal.style.cssText = `
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0,0,0,0.5);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             z-index: 1000;
//             opacity: 0;
//             transition: opacity 0.3s ease;
//         `;
        
//         modal.innerHTML = `
//             <div style="
//                 background: white; 
//                 padding: 2rem; 
//                 border-radius: 12px; 
//                 text-align: center;
//                 max-width: 400px;
//                 width: 90%;
//                 transform: scale(0.9);
//                 transition: transform 0.3s ease;
//             ">
//                 <h3 style="color: #9b59b6; margin-bottom: 10px;">Join ${clubName}</h3>
//                 <p style="color: #666; margin-bottom: 20px;">${clubDescription}</p>
//                 <p style="color: #888; font-size: 0.9rem; margin-bottom: 20px;">
//                     Are you sure you want to join this club? You'll receive updates about meetings and events.
//                 </p>
//                 <div style="display: flex; gap: 10px; justify-content: center;">
//                     <button class="btn btn-primary confirm-join">Yes, Join Club</button>
//                     <button class="btn btn-outline cancel-join">Cancel</button>
//                 </div>
//             </div>
//         `;

//         document.body.appendChild(modal);

//         // Animate modal in
//         setTimeout(() => {
//             modal.style.opacity = '1';
//             modal.querySelector('div').style.transform = 'scale(1)';
//         }, 10);

//         // Close modal functionality
//         const closeModal = () => {
//             modal.style.opacity = '0';
//             modal.querySelector('div').style.transform = 'scale(0.9)';
//             setTimeout(() => {
//                 document.body.removeChild(modal);
//             }, 300);
//         };

//         modal.querySelector('.confirm-join').addEventListener('click', () => {
//             // Store joined clubs in localStorage
//             const joinedClubs = JSON.parse(localStorage.getItem('joinedClubs') || '[]');
//             if (!joinedClubs.includes(clubName)) {
//                 joinedClubs.push(clubName);
//                 localStorage.setItem('joinedClubs', JSON.stringify(joinedClubs));
//             }
            
//             // Show success message
//             showSuccessMessage(`Successfully joined ${clubName}!`);
//             closeModal();
//         });

//         modal.querySelector('.cancel-join').addEventListener('click', closeModal);
//         modal.addEventListener('click', (e) => {
//             if (e.target === modal) {
//                 closeModal();
//             }
//         });

//         // Close on escape key
//         document.addEventListener('keydown', function closeOnEscape(e) {
//             if (e.key === 'Escape') {
//                 closeModal();
//                 document.removeEventListener('keydown', closeOnEscape);
//             }
//         });
//     }

//     function showClubModal(clubName, clubDescription, clubImage) {
//         const modal = document.createElement('div');
//         modal.className = 'club-modal';
//         modal.style.cssText = `
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0,0,0,0.5);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             z-index: 1000;
//             opacity: 0;
//             transition: opacity 0.3s ease;
//         `;
        
//         modal.innerHTML = `
//             <div style="
//                 background: white; 
//                 padding: 2rem; 
//                 border-radius: 12px; 
//                 max-width: 500px;
//                 width: 90%;
//                 max-height: 80vh;
//                 overflow-y: auto;
//                 transform: scale(0.9);
//                 transition: transform 0.3s ease;
//             ">
//                 <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
//                     <h3 style="color: #9b59b6; margin: 0;">${clubName}</h3>
//                     <button class="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">×</button>
//                 </div>
//                 <img src="${clubImage}" alt="${clubName}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
//                 <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">${clubDescription}</p>
//                 <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
//                     <h4 style="color: #9b59b6; margin-bottom: 10px;">Club Details</h4>
//                     <p style="margin: 5px 0; color: #666;"><strong>Meeting Schedule:</strong> Weekly sessions</p>
//                     <p style="margin: 5px 0; color: #666;"><strong>Members:</strong> 50+ active students</p>
//                     <p style="margin: 5px 0; color: #666;"><strong>Activities:</strong> Workshops, competitions, social events</p>
//                 </div>
//                 <button class="btn btn-primary join-from-modal" style="width: 100%;">Join Club</button>
//             </div>
//         `;

//         document.body.appendChild(modal);

//         // Animate modal in
//         setTimeout(() => {
//             modal.style.opacity = '1';
//             modal.querySelector('div').style.transform = 'scale(1)';
//         }, 10);

//         // Close modal functionality
//         const closeModal = () => {
//             modal.style.opacity = '0';
//             modal.querySelector('div').style.transform = 'scale(0.9)';
//             setTimeout(() => {
//                 document.body.removeChild(modal);
//             }, 300);
//         };

//         modal.querySelector('.close-modal').addEventListener('click', closeModal);
//         modal.querySelector('.join-from-modal').addEventListener('click', () => {
//             closeModal();
//             showJoinConfirmation(clubName, clubDescription);
//         });
//         modal.addEventListener('click', (e) => {
//             if (e.target === modal) {
//                 closeModal();
//             }
//         });

//         // Close on escape key
//         document.addEventListener('keydown', function closeOnEscape(e) {
//             if (e.key === 'Escape') {
//                 closeModal();
//                 document.removeEventListener('keydown', closeOnEscape);
//             }
//         });
//     }

//     function showSuccessMessage(message) {
//         const successMessage = document.createElement('div');
//         successMessage.className = 'success-message';
//         successMessage.textContent = message;
//         successMessage.style.cssText = `
//             position: fixed;
//             top: 20px;
//             right: 20px;
//             background: #4CAF50;
//             color: white;
//             padding: 15px 20px;
//             border-radius: 8px;
//             z-index: 1001;
//             animation: slideInRight 0.3s ease;
//         `;
        
//         document.body.appendChild(successMessage);
        
//         setTimeout(() => {
//             successMessage.style.animation = 'slideOutRight 0.3s ease';
//             setTimeout(() => {
//                 document.body.removeChild(successMessage);
//             }, 300);
//         }, 3000);
//     }

//     // Hero section typing effect
//     const heroTitle = document.querySelector('.hero h1');
//     const heroText = heroTitle.textContent;
//     heroTitle.textContent = '';
//     let i = 0;
    
//     function typeWriter() {
//         if (i < heroText.length) {
//             heroTitle.textContent += heroText.charAt(i);
//             i++;
//             setTimeout(typeWriter, 50);
//         }
//     }
    
//     // Start typing effect when hero section is in view
//     const heroObserver = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 typeWriter();
//                 heroObserver.unobserve(entry.target);
//             }
//         });
//     });
    
//     heroObserver.observe(document.querySelector('.hero'));

//     // Loading state
//     window.addEventListener('load', () => {
//         document.body.classList.add('loaded');
//     });

//     // Keyboard navigation
//     document.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape') {
//             // Close any open modals
//             const modals = document.querySelectorAll('.confirmation-modal, .club-modal');
//             modals.forEach(modal => {
//                 if (modal.parentNode) {
//                     modal.parentNode.removeChild(modal);
//                 }
//             });
//             navMenu.classList.remove('active');
//             mobileMenuBtn.setAttribute('aria-expanded', 'false');
//             mobileMenuBtn.textContent = '☰';
//         }
//     });

//     // Check URL parameters for auto-join
//     function checkURLParameters() {
//         const urlParams = new URLSearchParams(window.location.search);
//         const autoJoinClub = urlParams.get('club');
//         const fromLogin = urlParams.get('fromLogin');
        
//         if (autoJoinClub && fromLogin === 'true') {
//             // Find and auto-join the club
//             const clubCards = document.querySelectorAll('.club-card');
//             clubCards.forEach(card => {
//                 const clubName = card.querySelector('h3').textContent;
//                 if (clubName === autoJoinClub) {
//                     const clubDescription = card.querySelector('p').textContent;
//                     showJoinConfirmation(clubName, clubDescription);
                    
//                     // Clean URL
//                     window.history.replaceState({}, document.title, window.location.pathname);
//                 }
//             });
//         }
//     }

//     // Run URL parameter check
//     checkURLParameters();
// });

// // Add CSS styles for the JavaScript functionality
// const clubsStyles = `
// /* Add to your existing clubs.css */

// /* Search and filter styles */
// .search-input:focus {
//     box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.1);
// }

// .filter-btn:hover {
//     background: #9b59b6 !important;
//     color: white !important;
// }

// /* Modal animations */
// .confirmation-modal, .club-modal {
//     backdrop-filter: blur(5px);
// }

// /* Success message animations */
// @keyframes slideInRight {
//     from {
//         transform: translateX(100%);
//         opacity: 0;
//     }
//     to {
//         transform: translateX(0);
//         opacity: 1;
//     }
// }

// @keyframes slideOutRight {
//     from {
//         transform: translateX(0);
//         opacity: 1;
//     }
//     to {
//         transform: translateX(100%);
//         opacity: 0;
//     }
// }

// /* Loading state */
// body:not(.loaded) * {
//     transition: none !important;
// }

// /* Mobile menu styles */
// body.menu-open {
//     overflow: hidden;
// }

// .nav-menu.active {
//     display: flex !important;
//     flex-direction: column;
//     position: fixed;
//     top: 80px;
//     left: 0;
//     width: 100%;
//     height: calc(100vh - 80px);
//     background: white;
//     padding: 2rem;
//     box-shadow: 0 5px 20px rgba(0,0,0,0.1);
// }

// .nav-menu.active li {
//     margin: 1rem 0;
// }

// /* Accessibility */
// .btn:focus, 
// .filter-btn:focus,
// .search-input:focus {
//     outline: 2px solid #9b59b6;
//     outline-offset: 2px;
// }

// /* Responsive adjustments */
// @media (max-width: 768px) {
//     .category-filter {
//         gap: 5px !important;
//     }
    
//     .filter-btn {
//         padding: 6px 12px !important;
//         font-size: 0.9rem !important;
//     }
    
//     .search-input {
//         padding: 10px 15px !important;
//     }
// }

// /* Club card enhancements */
// .club-card {
//     cursor: pointer;
//     transition: all 0.3s ease !important;
// }

// .club-card:hover {
//     transform: translateY(-5px) scale(1.02) !important;
// }

// /* No results styling */
// .no-results h3 {
//     color: #9b59b6;
//     margin-bottom: 10px;
// }

// .no-results p {
//     color: #666;
// }
// `;

// // Inject styles
// document.head.insertAdjacentHTML('beforeend', `<style>${clubsStyles}</style>`);






// // clubs.js - Modified with dynamic club management

// // Club data structure - Add new clubs here
// const clubsData = [
//     {
//         id: 1,
//         name: "Tech Club",
//         description: "Learn coding, robotics, and tech innovations with workshops and hackathons.",
//         category: "Tech",
//         image: "data:image/jpeg;base64,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",
//         members: 145,
//         meetingSchedule: "Weekly Meetings",
//         activities: ["Coding Workshops", "Hackathons", "Tech Talks", "Project Development"]
//     },
//     {
//         id: 2,
//         name: "Cultural Club",
//         description: "Celebrate diversity through art, dance, and music performances.",
//         category: "Cultural",
//         image: "data:image/jpeg;base64,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",
//         members: 92,
//         meetingSchedule: "Bi-weekly Meetings",
//         activities: ["Dance Workshops", "Music Performances", "Art Exhibitions", "Cultural Festivals"]
//     },
//     {
//         id: 3,
//         name: "Sports Club",
//         description: "Play, compete, and stay active with our sports activities and tournaments.",
//         category: "Sports",
//         image: "data:image/png;base64,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
//     }
// ]    






// clubs.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Mobile menu functionality
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

    // Club card animations
    const clubCards = document.querySelectorAll('.club-card');
    
    const clubObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
                clubObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    clubCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
        clubObserver.observe(card);
    });

    // Join club button functionality
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.includes('Join Now')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const clubCard = this.closest('.club-card');
                const clubName = clubCard.querySelector('h3').textContent;
                const clubDescription = clubCard.querySelector('p').textContent;
                
                // Check if user is logged in
                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                
                if (!isLoggedIn) {
                    // Redirect to login page with return URL
                    window.location.href = 'auth.html?redirect=clubs.html&club=' + encodeURIComponent(clubName);
                    return;
                }

                // Show join confirmation
                showJoinConfirmation(clubName, clubDescription);
            });
        }
    });

    // Club card hover effects
    clubCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(108, 92, 231, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        });

        // Add click to show more info
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn-primary')) {
                const clubName = this.querySelector('h3').textContent;
                const clubDescription = this.querySelector('p').textContent;
                const clubImage = this.querySelector('img').src;
                showClubModal(clubName, clubDescription, clubImage);
            }
        });
    });

    // Search functionality
    function initSearch() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            max-width: 500px;
            margin: 0 auto 40px;
            position: relative;
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search clubs by name or description...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            width: 100%;
            padding: 12px 20px;
            border: 2px solid #9b59b6;
            border-radius: 25px;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
        `;

        const searchIcon = document.createElement('span');
        searchIcon.innerHTML = '🔍';
        searchIcon.style.cssText = `
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        `;

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchIcon);
        
        // Insert search after hero section
        document.querySelector('.clubs-section').insertBefore(searchContainer, document.querySelector('.clubs-grid'));

        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterClubs(searchTerm);
        });

        searchIcon.addEventListener('click', function() {
            searchInput.focus();
        });
    }

    function filterClubs(searchTerm) {
        const clubCards = document.querySelectorAll('.club-card');
        let visibleCount = 0;

        clubCards.forEach(card => {
            const clubName = card.querySelector('h3').textContent.toLowerCase();
            const clubDescription = card.querySelector('p').textContent.toLowerCase();
            
            if (clubName.includes(searchTerm) || clubDescription.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
                visibleCount++;
                
                // Re-animate visible cards
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Show no results message
        const existingMessage = document.querySelector('.no-results');
        if (existingMessage) {
            existingMessage.remove();
        }

        if (visibleCount === 0 && searchTerm !== '') {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <h3>No clubs found</h3>
                <p>Try searching with different keywords</p>
            `;
            noResults.style.cssText = `
                text-align: center;
                padding: 40px;
                color: #666;
            `;
            document.querySelector('.clubs-grid').appendChild(noResults);
        }
    }

    // Initialize search
    initSearch();

    // Category filtering
    function initCategoryFilter() {
        const categories = ['All', 'Tech', 'Cultural', 'Sports', 'Literary'];
        const filterContainer = document.createElement('div');
        filterContainer.className = 'category-filter';
        filterContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        `;

        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.className = 'filter-btn';
            if (category === 'All') {
                button.classList.add('active');
            }
            button.style.cssText = `
                padding: 8px 16px;
                border: 2px solid #9b59b6;
                background: ${category === 'All' ? '#9b59b6' : 'transparent'};
                color: ${category === 'All' ? 'white' : '#9b59b6'};
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
            `;

            button.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.style.background = 'transparent';
                    btn.style.color = '#9b59b6';
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                this.style.background = '#9b59b6';
                this.style.color = 'white';
                this.classList.add('active');

                filterByCategory(category);
            });

            filterContainer.appendChild(button);
        });

        // Insert filter after search
        document.querySelector('.search-container').insertAdjacentElement('afterend', filterContainer);
    }

    function filterByCategory(category) {
        const clubCards = document.querySelectorAll('.club-card');
        
        clubCards.forEach(card => {
            const clubName = card.querySelector('h3').textContent.toLowerCase();
            
            if (category === 'All' || clubName.includes(category.toLowerCase())) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Initialize category filter
    initCategoryFilter();

    // Utility functions
    function showJoinConfirmation(clubName, clubDescription) {
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
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white; 
                padding: 2rem; 
                border-radius: 12px; 
                text-align: center;
                max-width: 400px;
                width: 90%;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                <h3 style="color: #9b59b6; margin-bottom: 10px;">Join ${clubName}</h3>
                <p style="color: #666; margin-bottom: 20px;">${clubDescription}</p>
                <p style="color: #888; font-size: 0.9rem; margin-bottom: 20px;">
                    Are you sure you want to join this club? You'll receive updates about meetings and events.
                </p>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button class="btn btn-primary confirm-join">Yes, Join Club</button>
                    <button class="btn btn-outline cancel-join">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate modal in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 10);

        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('div').style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };

        modal.querySelector('.confirm-join').addEventListener('click', () => {
            // Store joined clubs in localStorage
            const joinedClubs = JSON.parse(localStorage.getItem('joinedClubs') || '[]');
            if (!joinedClubs.includes(clubName)) {
                joinedClubs.push(clubName);
                localStorage.setItem('joinedClubs', JSON.stringify(joinedClubs));
            }
            
            // Show success message
            showSuccessMessage(`Successfully joined ${clubName}!`);
            closeModal();
        });

        modal.querySelector('.cancel-join').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    function showClubModal(clubName, clubDescription, clubImage) {
        const modal = document.createElement('div');
        modal.className = 'club-modal';
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
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white; 
                padding: 2rem; 
                border-radius: 12px; 
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                    <h3 style="color: #9b59b6; margin: 0;">${clubName}</h3>
                    <button class="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">×</button>
                </div>
                <img src="${clubImage}" alt="${clubName}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
                <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">${clubDescription}</p>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h4 style="color: #9b59b6; margin-bottom: 10px;">Club Details</h4>
                    <p style="margin: 5px 0; color: #666;"><strong>Meeting Schedule:</strong> Weekly sessions</p>
                    <p style="margin: 5px 0; color: #666;"><strong>Members:</strong> 50+ active students</p>
                    <p style="margin: 5px 0; color: #666;"><strong>Activities:</strong> Workshops, competitions, social events</p>
                </div>
                <button class="btn btn-primary join-from-modal" style="width: 100%;">Join Club</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate modal in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 10);

        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('div').style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };

        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.querySelector('.join-from-modal').addEventListener('click', () => {
            closeModal();
            showJoinConfirmation(clubName, clubDescription);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    function showSuccessMessage(message) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = message;
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 300);
        }, 3000);
    }

    // Hero section typing effect
    const heroTitle = document.querySelector('.hero h1');
    const heroText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < heroText.length) {
            heroTitle.textContent += heroText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect when hero section is in view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(document.querySelector('.hero'));

    // Loading state
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.confirmation-modal, .club-modal');
            modals.forEach(modal => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            });
            navMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.textContent = '☰';
        }
    });

    // Check URL parameters for auto-join
    function checkURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const autoJoinClub = urlParams.get('club');
        const fromLogin = urlParams.get('fromLogin');
        
        if (autoJoinClub && fromLogin === 'true') {
            // Find and auto-join the club
            const clubCards = document.querySelectorAll('.club-card');
            clubCards.forEach(card => {
                const clubName = card.querySelector('h3').textContent;
                if (clubName === autoJoinClub) {
                    const clubDescription = card.querySelector('p').textContent;
                    showJoinConfirmation(clubName, clubDescription);
                    
                    // Clean URL
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            });
        }
    }

    // Run URL parameter check
    checkURLParameters();
});

// Add CSS styles for the JavaScript functionality
const clubsStyles = `
/* Add to your existing clubs.css */

/* Search and filter styles */
.search-input:focus {
    box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.1);
}

.filter-btn:hover {
    background: #9b59b6 !important;
    color: white !important;
}

/* Modal animations */
.confirmation-modal, .club-modal {
    backdrop-filter: blur(5px);
}

/* Success message animations */
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

/* Loading state */
body:not(.loaded) * {
    transition: none !important;
}

/* Mobile menu styles */
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
    background: white;
    padding: 2rem;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.nav-menu.active li {
    margin: 1rem 0;
}

/* Accessibility */
.btn:focus, 
.filter-btn:focus,
.search-input:focus {
    outline: 2px solid #9b59b6;
    outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .category-filter {
        gap: 5px !important;
    }
    
    .filter-btn {
        padding: 6px 12px !important;
        font-size: 0.9rem !important;
    }
    
    .search-input {
        padding: 10px 15px !important;
    }
}

/* Club card enhancements */
.club-card {
    cursor: pointer;
    transition: all 0.3s ease !important;
}

.club-card:hover {
    transform: translateY(-5px) scale(1.02) !important;
}

/* No results styling */
.no-results h3 {
    color: #9b59b6;
    margin-bottom: 10px;
}

.no-results p {
    color: #666;
}
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', `<style>${clubsStyles}</style>`);






// clubs.js - Modified with dynamic club management

// Club data structure - Add new clubs here
const clubsData = [
    {
        id: 1,
        name: "Tech Club",
        description: "Learn coding, robotics, and tech innovations with workshops and hackathons.",
        category: "Tech",
        image: "data:image/jpeg;base64,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",
        members: 145,
        meetingSchedule: "Weekly Meetings",
        activities: ["Coding Workshops", "Hackathons", "Tech Talks", "Project Development"]
    },
    {
        id: 2,
        name: "Cultural Club",
        description: "Celebrate diversity through art, dance, and music performances.",
        category: "Cultural",
        image: "data:image/jpeg;base64,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",
        members: 92,
        meetingSchedule: "Bi-weekly Meetings",
        activities: ["Dance Workshops", "Music Performances", "Art Exhibitions", "Cultural Festivals"]
    },
    {
        id: 3,
        name: "Sports Club",
        description: "Play, compete, and stay active with our sports activities and tournaments.",
        category: "Sports",
        image: "data:image/png;base64,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
    }
]    