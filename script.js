//  HAMBURGER MENU TOGGLE
// Get the hamburger menu and nav links elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// When someone clicks the hamburger icon...
hamburger.addEventListener('click', function() {
    // Toggle the "active" class on navLinks
    // If "active" exists, remove it. If it doesn't exist, add it.
    navLinks.classList.toggle('active');
});

// CLOSE MENU WHEN A LINK IS CLICKED 
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

// SMOOTH SCROLLING FOR NAV LINKS 
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

//  STICKY NAVBAR SHADOW ON SCROLL 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

//  CONSOLE WELCOME MESSAGE 
console.log(' Welcome to FreelanceHub!');
console.log(' You built this page! Amazing work!');
//  WEEK 2: FREELANCER DATA & UI 

//  SAMPLE FREELANCER DATA
const freelancers = [
    {
        id: 1,
        name: "Ali Hassan",
        service: "Full Stack Web Developer",
        category: "web",
        price: 85,
        rating: 4.9,
        reviews: 127,
        description: "Full stack developer with 5 years of experience in React, Node.js, and MongoDB. I build fast, responsive web applications from scratch.",
        avatar: "AH"
    },
    {
        id: 2,
        name: "Sana Malik",
        service: "UI/UX & Graphic Designer",
        category: "design",
        price: 65,
        rating: 4.8,
        reviews: 98,
        description: "Creative designer specializing in branding, UI/UX design, and illustration. I help businesses look professional and stand out.",
        avatar: "SM"
    },
    {
        id: 3,
        name: "Usman Khan",
        service: "Mobile App Developer",
        category: "mobile",
        price: 95,
        rating: 4.7,
        reviews: 83,
        description: "Experienced mobile developer building apps for iOS and Android using React Native and Flutter. I create smooth, high-quality apps.",
        avatar: "UK"
    },
    {
        id: 4,
        name: "Fatima Ali",
        service: "Data Analyst & BI Specialist",
        category: "data",
        price: 75,
        rating: 4.9,
        reviews: 56,
        description: "Data analyst with expertise in Python, SQL, Power BI, and Tableau. I turn raw data into actionable insights.",
        avatar: "FA"
    },
    {
        id: 5,
        name: "Ahmed Raza",
        service: "Digital Marketing Expert",
        category: "marketing",
        price: 55,
        rating: 4.6,
        reviews: 112,
        description: "Digital marketer specializing in SEO, content marketing, and social media management. I help businesses grow their online presence.",
        avatar: "AR"
    },
    {
        id: 6,
        name: "Zara Ahmed",
        service: "Video Editor & Animator",
        category: "video",
        price: 70,
        rating: 4.8,
        reviews: 64,
        description: "Video editor with 4 years of experience in motion graphics, video editing, and animation. I create engaging video content.",
        avatar: "ZA"
    }
];

// DOM ELEMENTS 
const freelancersGrid = document.getElementById('freelancersGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const profilePage = document.getElementById('profilePage');
const profileContent = document.getElementById('profileContent');
const backBtn = document.getElementById('backBtn');

//FUNCTION: DISPLAY FREELANCERS
function displayFreelancers(data) {
    if (data.length === 0) {
        freelancersGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No freelancers found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    freelancersGrid.innerHTML = data.map(freelancer => `
        <div class="freelancer-card" data-id="${freelancer.id}">
            <div class="card-header">
                <div class="profile-img">${freelancer.avatar}</div>
                <div>
                    <h3>${freelancer.name}</h3>
                    <div class="service-title">${freelancer.service}</div>
                </div>
            </div>
            <div class="category-tag">${getCategoryName(freelancer.category)}</div>
            <div class="card-details">
                <div class="price">$${freelancer.price} <span>/ hr</span></div>
                <div class="rating">⭐ ${freelancer.rating} <span>(${freelancer.reviews})</span></div>
            </div>
            <button class="view-btn" onclick="viewProfile(${freelancer.id})">View Profile</button>
        </div>
    `).join('');
}

// FUNCTION: GET CATEGORY NAME 
function getCategoryName(category) {
    const categories = {
        'web': 'Web Development',
        'design': 'Graphic Design',
        'mobile': 'Mobile Apps',
        'data': 'Data Analysis',
        'marketing': 'Digital Marketing',
        'video': 'Video Production'
    };
    return categories[category] || category;
}

//FUNCTION: FILTER AND SORT 
function filterAndSort() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sort = sortFilter.value;
    
    // Filter
    let filtered = freelancers.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(searchTerm) || 
                             f.service.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || f.category === category;
        return matchesSearch && matchesCategory;
    });
    
    // Sort
    if (sort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }
    
    displayFreelancers(filtered);
}

// FUNCTION: VIEW PROFILE 
function viewProfile(id) {
    const freelancer = freelancers.find(f => f.id === id);
    if (!freelancer) return;
    
    // Hide freelancers grid, show profile
    document.querySelector('.freelancers-section').style.display = 'none';
    profilePage.style.display = 'block';
    
    // Populate profile
    profileContent.innerHTML = `
        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-avatar">${freelancer.avatar}</div>
                <div class="profile-info">
                    <h2>${freelancer.name}</h2>
                    <div class="profile-service">${freelancer.service}</div>
                    <div class="profile-category">${getCategoryName(freelancer.category)}</div>
                </div>
            </div>
            <div class="profile-stats">
                <div>
                    <div class="stat-number">$${freelancer.price}</div>
                    <div class="stat-label">Hourly Rate</div>
                </div>
                <div>
                    <div class="stat-number">⭐ ${freelancer.rating}</div>
                    <div class="stat-label">Rating</div>
                </div>
                <div>
                    <div class="stat-number">${freelancer.reviews}</div>
                    <div class="stat-label">Reviews</div>
                </div>
            </div>
            <div class="profile-description">
                <p>${freelancer.description}</p>
            </div>
            <br>
            <button class="btn-primary" style="width:100%; text-align:center; border:none; padding:14px; border-radius:8px; cursor:pointer;">Hire Now</button>
        </div>
    `;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// FUNCTION: BACK TO FREELANCERS 
function goBack() {
    document.querySelector('.freelancers-section').style.display = 'block';
    profilePage.style.display = 'none';
    window.scrollTo(0, 0);
}

//  EVENT LISTENERS
searchInput.addEventListener('input', filterAndSort);
categoryFilter.addEventListener('change', filterAndSort);
sortFilter.addEventListener('change', filterAndSort);
backBtn.addEventListener('click', goBack);

// INITIAL DISPLAY 
displayFreelancers(freelancers);
