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
// ==========================================
// ===== WEEK 4: JOBS & PROPOSALS ==========
// ==========================================

// ===== SAMPLE JOBS DATA =====
let jobs = [
    {
        id: 1,
        title: "Need a React Developer for E-commerce Site",
        category: "web",
        description: "Looking for an experienced React developer to build a modern e-commerce website. Must have experience with React, Redux, and payment integration.",
        budget: 800,
        duration: 14,
        skills: ["React", "Redux", "Stripe"],
        postedDate: "2026-09-05",
        proposals: 5
    },
    {
        id: 2,
        title: "Logo Design for Tech Startup",
        category: "design",
        description: "We need a modern, minimal logo for our AI startup. Should be clean, professional, and memorable.",
        budget: 250,
        duration: 5,
        skills: ["Logo Design", "Branding", "Illustrator"],
        postedDate: "2026-09-04",
        proposals: 12
    },
    {
        id: 3,
        title: "Mobile App Development (iOS & Android)",
        category: "mobile",
        description: "Build a cross-platform mobile app for food delivery. Features: user auth, restaurant listing, cart, and payment.",
        budget: 1500,
        duration: 30,
        skills: ["React Native", "Firebase", "API"],
        postedDate: "2026-09-03",
        proposals: 8
    },
    {
        id: 4,
        title: "Data Analysis for Sales Report",
        category: "data",
        description: "Analyze 2 years of sales data and create a dashboard with insights. Tools: Excel or Power BI.",
        budget: 400,
        duration: 7,
        skills: ["Excel", "Power BI", "SQL"],
        postedDate: "2026-09-02",
        proposals: 3
    },
    {
        id: 5,
        title: "Social Media Marketing Campaign",
        category: "marketing",
        description: "Plan and execute a 1-month social media campaign for a fashion brand. Includes content creation and ads.",
        budget: 600,
        duration: 30,
        skills: ["Social Media", "Content", "Ads"],
        postedDate: "2026-09-01",
        proposals: 7
    },
    {
        id: 6,
        title: "Video Editing for YouTube Channel",
        category: "video",
        description: "Edit 4 videos per month for a tech YouTube channel. Includes cuts, transitions, and basic motion graphics.",
        budget: 300,
        duration: 30,
        skills: ["Premiere Pro", "After Effects"],
        postedDate: "2026-08-30",
        proposals: 10
    }
];

let nextJobId = 7;

// ===== PROPOSALS DATA =====
let proposals = [
    {
        id: 1,
        jobId: 1,
        jobTitle: "Need a React Developer for E-commerce Site",
        coverLetter: "I have 4 years of experience building e-commerce sites with React and Redux. I can deliver this project within 10 days.",
        price: 750,
        delivery: 10,
        skills: ["React", "Redux", "Stripe"],
        status: "pending",
        submittedDate: "2026-09-06"
    }
];

let nextProposalId = 2;

// ===== DOM ELEMENTS =====
const findJobsSection = document.getElementById('findJobs');
const jobDetailsSection = document.getElementById('jobDetails');
const postJobSection = document.getElementById('postJob');
const submitProposalSection = document.getElementById('submitProposal');
const myProposalsSection = document.getElementById('myProposals');

// ===== FUNCTION: SHOW FIND JOBS =====
function showFindJobs() {
    hideAllSections();
    findJobsSection.style.display = 'block';
    displayJobs(jobs);
    window.scrollTo(0, 0);
}

// ===== FUNCTION: SHOW JOB DETAILS =====
function showJobDetails(id) {
    const job = jobs.find(j => j.id === id);
    if (!job) return;
    
    hideAllSections();
    jobDetailsSection.style.display = 'block';
    
    document.getElementById('jobDetailsContent').innerHTML = `
        <div class="profile-container">
            <h2 style="margin-bottom:10px;">${job.title}</h2>
            <span class="job-category" style="display:inline-block;margin-bottom:15px;">${getCategoryName(job.category)}</span>
            <p style="color:#475569;line-height:1.8;margin:15px 0;">${job.description}</p>
            
            <div class="profile-stats" style="margin:20px 0;">
                <div>
                    <div class="stat-number">$${job.budget}</div>
                    <div class="stat-label">Budget</div>
                </div>
                <div>
                    <div class="stat-number">${job.duration} days</div>
                    <div class="stat-label">Duration</div>
                </div>
                <div>
                    <div class="stat-number">${job.proposals}</div>
                    <div class="stat-label">Proposals</div>
                </div>
            </div>
            
            <div class="detail-item">
                <h4>Required Skills</h4>
                <div class="skills-list">
                    ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            
            <div class="profile-actions">
                <button class="btn-primary" onclick="showSubmitProposal(${job.id})">Submit Proposal</button>
                <button class="btn-secondary" onclick="showFindJobs()">Back to Jobs</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

// ===== FUNCTION: SHOW POST JOB =====
function showPostJob() {
    hideAllSections();
    postJobSection.style.display = 'block';
    document.getElementById('postJobForm').reset();
    window.scrollTo(0, 0);
}

// ===== FUNCTION: SHOW SUBMIT PROPOSAL =====
function showSubmitProposal(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    hideAllSections();
    submitProposalSection.style.display = 'block';
    document.getElementById('proposalJobTitle').textContent = `Applying for: ${job.title}`;
    document.getElementById('proposalJobId').value = jobId;
    document.getElementById('submitProposalForm').reset();
    window.scrollTo(0, 0);
}

// ===== FUNCTION: SHOW MY PROPOSALS =====
function showMyProposals() {
    hideAllSections();
    myProposalsSection.style.display = 'block';
    displayProposals();
    window.scrollTo(0, 0);
}

// ===== FUNCTION: DISPLAY JOBS =====
function displayJobs(jobList) {
    const grid = document.getElementById('jobsGrid');
    
    if (jobList.length === 0) {
        grid.innerHTML = `
            <div class="no-jobs">
                <i class="fas fa-search"></i>
                <h3>No Jobs Found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = jobList.map(job => `
        <div class="job-card">
            <div class="job-header">
                <h3>${job.title}</h3>
                <span class="job-category">${getCategoryName(job.category)}</span>
            </div>
            <div class="job-budget">$${job.budget} <span>budget</span></div>
            <div class="job-skills">
                ${job.skills.map(s => `<span>${s}</span>`).join('')}
            </div>
            <p style="color:#64748b;font-size:14px;">${job.description.substring(0, 90)}...</p>
            <div class="job-footer">
                <span class="job-date"><i class="fas fa-calendar"></i> ${job.postedDate}</span>
                <span class="job-proposals"><i class="fas fa-file-alt"></i> ${job.proposals} proposals</span>
            </div>
            <div style="display:flex;gap:10px;margin-top:12px;">
                <button class="btn-small btn-view" onclick="showJobDetails(${job.id})">View Details</button>
                <button class="btn-small btn-edit" onclick="showSubmitProposal(${job.id})">Apply</button>
            </div>
        </div>
    `).join('');
}

// ===== FUNCTION: DISPLAY PROPOSALS =====
function displayProposals() {
    const list = document.getElementById('proposalsList');
    
    if (proposals.length === 0) {
        list.innerHTML = `
            <div class="no-proposals">
                <i class="fas fa-file-alt"></i>
                <h3>No Proposals Yet</h3>
                <p>Browse jobs and submit your first proposal!</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = proposals.map(p => `
        <div class="proposal-card">
            <div class="proposal-header">
                <h3>${p.jobTitle}</h3>
                <span class="proposal-status ${p.status}">${p.status.charAt(0).toUpperCase() + p.status.slice(1)}</span>
            </div>
            <div class="proposal-details">
                <span><i class="fas fa-dollar-sign"></i> $${p.price}</span>
                <span><i class="fas fa-clock"></i> ${p.delivery} days</span>
                <span><i class="fas fa-calendar"></i> ${p.submittedDate}</span>
            </div>
            <p class="proposal-cover">${p.coverLetter}</p>
            <div class="job-skills">
                ${p.skills.map(s => `<span>${s}</span>`).join('')}
            </div>
            <div style="display:flex;gap:10px;margin-top:12px;">
                <button class="btn-small btn-view" onclick="showJobDetails(${p.jobId})">View Job</button>
                <button class="btn-small btn-delete" onclick="withdrawProposal(${p.id})">Withdraw</button>
            </div>
        </div>
    `).join('');
}

// ===== FUNCTION: WITHDRAW PROPOSAL =====
function withdrawProposal(id) {
    if (confirm('Are you sure you want to withdraw this proposal?')) {
        proposals = proposals.filter(p => p.id !== id);
        displayProposals();
        alert('Proposal withdrawn successfully!');
    }
}

// ===== FUNCTION: FILTER JOBS =====
function filterJobs() {
    const search = document.getElementById('jobSearchInput').value.toLowerCase();
    const category = document.getElementById('jobCategoryFilter').value;
    
    let filtered = jobs.filter(j => {
        const matchesSearch = j.title.toLowerCase().includes(search) ||
                             j.skills.some(s => s.toLowerCase().includes(search));
        const matchesCategory = category === 'all' || j.category === category;
        return matchesSearch && matchesCategory;
    });
    
    displayJobs(filtered);
}

// ===== EVENT: POST JOB FORM =====
document.getElementById('postJobForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('jobTitle').value.trim();
    const category = document.getElementById('jobCategory').value;
    const description = document.getElementById('jobDescription').value.trim();
    const budget = parseFloat(document.getElementById('jobBudget').value);
    const duration = parseInt(document.getElementById('jobDuration').value);
    const skills = document.getElementById('jobSkills').value.split(',').map(s => s.trim()).filter(s => s);
    
    if (!title || !category || !description || !budget || !duration) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const newJob = {
        id: nextJobId++,
        title,
        category,
        description,
        budget,
        duration,
        skills: skills.length ? skills : ['General'],
        postedDate: new Date().toISOString().split('T')[0],
        proposals: 0
    };
    
    jobs.push(newJob);
    alert('Job posted successfully!');
    showFindJobs();
});

// ===== EVENT: SUBMIT PROPOSAL FORM =====
document.getElementById('submitProposalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const jobId = parseInt(document.getElementById('proposalJobId').value);
    const job = jobs.find(j => j.id === jobId);
    const coverLetter = document.getElementById('coverLetter').value.trim();
    const price = parseFloat(document.getElementById('proposedPrice').value);
    const delivery = parseInt(document.getElementById('proposedDelivery').value);
    const skills = document.getElementById('proposalSkills').value.split(',').map(s => s.trim()).filter(s => s);
    
    if (!coverLetter || !price || !delivery) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const newProposal = {
        id: nextProposalId++,
        jobId,
        jobTitle: job.title,
        coverLetter,
        price,
        delivery,
        skills: skills.length ? skills : ['General'],
        status: 'pending',
        submittedDate: new Date().toISOString().split('T')[0]
    };
    
    proposals.push(newProposal);
    job.proposals++;
    
    alert('Proposal submitted successfully!');
    showFindJobs();
});

// ===== UPDATE HIDE ALL SECTIONS (Include Week 4 sections) =====
const originalHideAllSections = hideAllSections;
hideAllSections = function() {
    document.querySelectorAll('.hero, .categories, .features, .about, .footer, .freelancers-section').forEach(el => {
        if (el) el.style.display = 'none';
    });
    
    document.getElementById('userProfile').style.display = 'none';
    document.getElementById('editProfile').style.display = 'none';
    document.getElementById('myServices').style.display = 'none';
    document.getElementById('createService').style.display = 'none';
    document.getElementById('serviceDetails').style.display = 'none';
    
    findJobsSection.style.display = 'none';
    jobDetailsSection.style.display = 'none';
    postJobSection.style.display = 'none';
    submitProposalSection.style.display = 'none';
    myProposalsSection.style.display = 'none';
};

//  EVENT LISTENERS 
document.getElementById('jobSearchInput').addEventListener('input', filterJobs);
document.getElementById('jobCategoryFilter').addEventListener('change', filterJobs);

// ADD "MY PROPOSALS" LINK TO PROFILE ACTIONS 
// Update profile buttons to include My Proposals
