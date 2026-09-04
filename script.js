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

//  WEEK 3: PROFILE & SERVICES 

//  USER PROFILE DATA
let userProfile = {
    name: "Fizza Nadeem",
    title: "Web Developer & Designer",
    category: "web",
    bio: "Passionate web developer with 3 years of experience building responsive websites and web applications. I love creating clean, user-friendly interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    experience: "3 years of professional web development experience. Worked with various clients on projects ranging from landing pages to full-stack applications."
};

// USER SERVICES DATA 
let userServices = [
    {
        id: 1,
        title: "Full Stack Web Development",
        category: "web",
        description: "Complete web development service from frontend to backend. I build responsive, fast, and scalable web applications.",
        price: 85,
        delivery: 5,
        skills: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 2,
        title: "Responsive Website Design",
        category: "design",
        description: "Modern, responsive website designs that look great on all devices. I create pixel-perfect designs with clean code.",
        price: 65,
        delivery: 3,
        skills: ["HTML", "CSS", "JavaScript"]
    }
];

let nextServiceId = 3;

//  DOM ELEMENTS 
const userProfileSection = document.getElementById('userProfile');
const editProfileSection = document.getElementById('editProfile');
const myServicesSection = document.getElementById('myServices');
const createServiceSection = document.getElementById('createService');
const serviceDetailsSection = document.getElementById('serviceDetails');

// FUNCTION: SHOW PROFILE 
function showProfile() {
    hideAllSections();
    userProfileSection.style.display = 'block';
    updateProfileDisplay();
    window.scrollTo(0, 0);
}

// FUNCTION: SHOW EDIT PROFILE 
function showEditProfile() {
    hideAllSections();
    editProfileSection.style.display = 'block';
    // Pre-fill form with current profile data
    document.getElementById('editName').value = userProfile.name;
    document.getElementById('editTitle').value = userProfile.title;
    document.getElementById('editCategory').value = userProfile.category;
    document.getElementById('editBio').value = userProfile.bio;
    document.getElementById('editSkills').value = userProfile.skills.join(', ');
    document.getElementById('editExperience').value = userProfile.experience;
    window.scrollTo(0, 0);
}

// FUNCTION: SHOW MY SERVICES 
function showMyServices() {
    hideAllSections();
    myServicesSection.style.display = 'block';
    displayMyServices();
    window.scrollTo(0, 0);
}

// FUNCTION: SHOW CREATE SERVICE
function showCreateService() {
    hideAllSections();
    createServiceSection.style.display = 'block';
    document.getElementById('createServiceForm').reset();
    window.scrollTo(0, 0);
}

//  FUNCTION: SHOW SERVICE DETAILS 
function showServiceDetails(id) {
    const service = userServices.find(s => s.id === id);
    if (!service) return;
    
    hideAllSections();
    serviceDetailsSection.style.display = 'block';
    
    document.getElementById('serviceDetailsContent').innerHTML = `
        <div class="profile-container">
            <h2 style="margin-bottom:10px;">${service.title}</h2>
            <span class="service-category" style="display:inline-block;margin-bottom:15px;">${getCategoryName(service.category)}</span>
            <p style="color:#475569;margin-bottom:15px;">${service.description}</p>
            <div class="profile-stats" style="margin:20px 0;">
                <div>
                    <div class="stat-number">$${service.price}</div>
                    <div class="stat-label">Hourly Rate</div>
                </div>
                <div>
                    <div class="stat-number">${service.delivery} days</div>
                    <div class="stat-label">Delivery Time</div>
                </div>
            </div>
            <div class="detail-item">
                <h4>Skills</h4>
                <div class="skills-list">
                    ${service.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="profile-actions">
                <button class="btn-small btn-edit" onclick="editService(${service.id})">Edit Service</button>
                <button class="btn-small btn-delete" onclick="deleteService(${service.id})">Delete Service</button>
                <button class="btn-secondary" onclick="showMyServices()">Back to Services</button>
            </div>
        </div>
    `;
}

//  FUNCTION: GO BACK TO HOME
function goBackToHome() {
    hideAllSections();
    document.querySelector('.hero').style.display = 'flex';
    document.querySelector('.categories').style.display = 'block';
    document.querySelector('.features').style.display = 'block';
    document.querySelector('.about').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
    document.querySelector('.freelancers-section').style.display = 'block';
    window.scrollTo(0, 0);
}

// FUNCTION: HIDE ALL SECTIONS
function hideAllSections() {
    document.querySelectorAll('.hero, .categories, .features, .about, .footer, .freelancers-section').forEach(el => {
        if (el) el.style.display = 'none';
    });
    
    userProfileSection.style.display = 'none';
    editProfileSection.style.display = 'none';
    myServicesSection.style.display = 'none';
    createServiceSection.style.display = 'none';
    serviceDetailsSection.style.display = 'none';
}

// FUNCTION: UPDATE PROFILE DISPLAY 
function updateProfileDisplay() {
    document.getElementById('profileAvatar').textContent = userProfile.name.split(' ').map(n => n[0]).join('');
    document.getElementById('profileName').textContent = userProfile.name;
    document.getElementById('profileTitle').textContent = userProfile.title;
    document.getElementById('profileCategory').textContent = getCategoryName(userProfile.category);
    document.getElementById('profileBio').textContent = userProfile.bio;
    document.getElementById('profileExperience').textContent = userProfile.experience;
    document.getElementById('profileServices').textContent = userServices.length;
    
    const skillsHTML = userProfile.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');
    document.getElementById('profileSkills').innerHTML = skillsHTML;
}

// FUNCTION: DISPLAY MY SERVICES
function displayMyServices() {
    const grid = document.getElementById('myServicesGrid');
    
    if (userServices.length === 0) {
        grid.innerHTML = `
            <div class="no-services">
                <i class="fas fa-box"></i>
                <h3>No Services Yet</h3>
                <p>Click "Create New Service" to add your first service!</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = userServices.map(service => `
        <div class="service-card">
            <div class="service-header">
                <h3>${service.title}</h3>
                <span class="service-category">${getCategoryName(service.category)}</span>
            </div>
            <p style="color:#64748b;font-size:14px;margin:8px 0;">${service.description.substring(0, 80)}...</p>
            <div class="service-price">$${service.price} <span>/ hour</span></div>
            <div class="service-actions">
                <button class="btn-small btn-view" onclick="showServiceDetails(${service.id})">View</button>
                <button class="btn-small btn-edit" onclick="editService(${service.id})">Edit</button>
                <button class="btn-small btn-delete" onclick="deleteService(${service.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// FUNCTION: DELETE SERVICE 
function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        userServices = userServices.filter(s => s.id !== id);
        displayMyServices();
        updateProfileDisplay();
        alert('Service deleted successfully!');
    }
}

//FUNCTION: EDIT SERVICE
function editService(id) {
    const service = userServices.find(s => s.id === id);
    if (!service) return;
    
    // Create a simple edit prompt (you can make this more advanced later)
    const newTitle = prompt('Edit Service Title:', service.title);
    if (newTitle !== null) service.title = newTitle || service.title;
    
    const newPrice = prompt('Edit Price ($/hour):', service.price);
    if (newPrice !== null) service.price = parseFloat(newPrice) || service.price;
    
    displayMyServices();
    updateProfileDisplay();
    alert('Service updated!');
}

//  EVENT: EDIT PROFILE FORM SUBMIT 
document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    userProfile.name = document.getElementById('editName').value || userProfile.name;
    userProfile.title = document.getElementById('editTitle').value || userProfile.title;
    userProfile.category = document.getElementById('editCategory').value;
    userProfile.bio = document.getElementById('editBio').value || userProfile.bio;
    userProfile.skills = document.getElementById('editSkills').value.split(',').map(s => s.trim()).filter(s => s);
    userProfile.experience = document.getElementById('editExperience').value || userProfile.experience;
    
    alert('Profile updated successfully!');
    showProfile();
});

//  EVENT: CREATE SERVICE FORM SUBMIT 
document.getElementById('createServiceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('serviceTitle').value.trim();
    const category = document.getElementById('serviceCategory').value;
    const description = document.getElementById('serviceDescription').value.trim();
    const price = parseFloat(document.getElementById('servicePrice').value);
    const delivery = parseInt(document.getElementById('serviceDelivery').value);
    const skills = document.getElementById('serviceSkills').value.split(',').map(s => s.trim()).filter(s => s);
    
    // Validation
    if (!title || !category || !description || !price || !delivery) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const newService = {
        id: nextServiceId++,
        title,
        category,
        description,
        price,
        delivery,
        skills: skills.length ? skills : ['General']
    };
    
    userServices.push(newService);
    alert('Service created successfully!');
    showMyServices();
});

// SHOW PROFILE BY DEFAULT 
// Hide profile sections initially
hideAllSections();

// Let's show the home page by default
document.querySelector('.hero').style.display = 'flex';
document.querySelector('.categories').style.display = 'block';
document.querySelector('.features').style.display = 'block';
document.querySelector('.about').style.display = 'block';
document.querySelector('.footer').style.display = 'block';
document.querySelector('.freelancers-section').style.display = 'block';

//  PAGE NAVIGATION (Home vs Profile) 

// This function hides the homepage and shows the Profile page
function showProfile() {
    // 1. Hide the entire homepage sections
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.categories').style.display = 'none';
    document.querySelector('.features').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    document.querySelector('.freelancers-section').style.display = 'none';

    // 2. Show the Profile page
    document.getElementById('userProfile').style.display = 'block';
    
    // 3. Scroll to the top
    window.scrollTo(0, 0);
}

// This function hides the Profile and shows the Homepage
function showHome() {
    // 1. Hide the Profile page
    document.getElementById('userProfile').style.display = 'none';

    // 2. Show all the homepage sections
    document.querySelector('.hero').style.display = 'flex';
    document.querySelector('.categories').style.display = 'block';
    document.querySelector('.features').style.display = 'block';
    document.querySelector('.about').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
    document.querySelector('.freelancers-section').style.display = 'block';
    
    // 3. Scroll to the top
    window.scrollTo(0, 0);
}
