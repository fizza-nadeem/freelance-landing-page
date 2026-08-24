// ===== HAMBURGER MENU TOGGLE =====
// Get the hamburger menu and nav links elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// When someone clicks the hamburger icon...
hamburger.addEventListener('click', function() {
    // Toggle the "active" class on navLinks
    // If "active" exists, remove it. If it doesn't exist, add it.
    navLinks.classList.toggle('active');
});

// ===== CLOSE MENU WHEN A LINK IS CLICKED =====
// Get all navigation links
const navItems = document.querySelectorAll('.nav-links li a');

// Loop through each link
navItems.forEach(function(link) {
    // When a link is clicked...
    link.addEventListener('click', function() {
        // Remove the "active" class (close the menu)
        navLinks.classList.remove('active');
    });
});

// ===== SMOOTH SCROLLING FOR NAV LINKS =====
// Get all links that start with "#" (same-page links)
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        // Prevent default jump behavior
        e.preventDefault();
        
        // Get the target element (what the link points to)
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Smoothly scroll to the target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== STICKY NAVBAR SHADOW ON SCROLL =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('🚀 Welcome to FreelanceHub!');
console.log('✨ You built this page! Amazing work!');