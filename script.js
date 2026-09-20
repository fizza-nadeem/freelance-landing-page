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
// ==========================================
// ===== WEEK 5: ORDERS & PROJECTS =========
// ==========================================

// ===== SAMPLE ORDERS DATA =====
let orders = [
    {
        id: 1,
        title: "E-commerce Website Development",
        client: "TechCorp Inc.",
        freelancer: "Fizza Nadeem",
        description: "Build a complete e-commerce website with product listings, cart, and payment integration using React and Node.js.",
        budget: 800,
        deadline: 14,
        status: "in-progress",
        createdDate: "2026-09-10",
        progress: 65,
        milestones: [
            { id: 1, title: "Design Mockups", description: "Create UI/UX designs", completed: true },
            { id: 2, title: "Frontend Development", description: "Build React components", completed: true },
            { id: 3, title: "Backend API", description: "Create Node.js APIs", completed: false },
            { id: 4, title: "Payment Integration", description: "Add Stripe payment", completed: false },
            { id: 5, title: "Testing & Deployment", description: "Test and deploy the site", completed: false }
        ],
        delivery: null
    },
    {
        id: 2,
        title: "Mobile App UI Design",
        client: "StartupXYZ",
        freelancer: "Fizza Nadeem",
        description: "Design a modern, clean UI for a food delivery mobile app. Include 15+ screens with interactions.",
        budget: 450,
        deadline: 10,
        status: "completed",
        createdDate: "2026-09-01",
        progress: 100,
        milestones: [
            { id: 1, title: "Wireframes", description: "Create basic layouts", completed: true },
            { id: 2, title: "High-Fidelity Designs", description: "Design all screens", completed: true },
            { id: 3, title: "Prototype", description: "Interactive prototype", completed: true },
            { id: 4, title: "Handoff", description: "Deliver files", completed: true }
        ],
        delivery: {
            message: "All 15 screens designed and delivered in Figma. Prototype includes all interactions.",
            link: "https://figma.com/project",
            date: "2026-09-08"
        }
    },
    {
        id: 3,
        title: "Data Analysis Dashboard",
        client: "DataViz Corp",
        freelancer: "Fizza Nadeem",
        description: "Create an interactive dashboard for sales data using Power BI. Include charts, filters, and insights.",
        budget: 350,
        deadline: 7,
        status: "pending",
        createdDate: "2026-09-12",
        progress: 0,
        milestones: [
            { id: 1, title: "Data Cleaning", description: "Clean and prepare data", completed: false },
            { id: 2, title: "Dashboard Design", description: "Design dashboard layout", completed: false },
            { id: 3, title: "Visualizations", description: "Create charts and graphs", completed: false }
        ],
        delivery: null
    },
    {
        id: 4,
        title: "Social Media Campaign",
        client: "FashionBrand",
        freelancer: "Fizza Nadeem",
        description: "Plan and execute a 1-month social media campaign for a fashion brand. Includes content calendar and ads.",
        budget: 600,
        deadline: 30,
        status: "submitted",
        createdDate: "2026-08-20",
        progress: 90,
        milestones: [
            { id: 1, title: "Strategy", description: "Create campaign strategy", completed: true },
            { id: 2, title: "Content Calendar", description: "Plan 30 days of content", completed: true },
            { id: 3, title: "Ad Creation", description: "Design ad creatives", completed: true },
            { id: 4, title: "Launch & Monitor", description: "Run campaign and track results", completed: false }
        ],
        delivery: {
            message: "Campaign strategy and content calendar delivered. Ads are ready to launch.",
            link: "https://drive.google.com/campaign",
            date: "2026-09-11"
        }
    }
];

let nextOrderId = 5;

// ===== DOM ELEMENTS =====
const myOrdersSection = document.getElementById('myOrders');
const orderDetailsSection = document.getElementById('orderDetails');
const createOrderSection = document.getElementById('createOrder');
const deliverySection = document.getElementById('deliverySection');

// ===== FUNCTION: SHOW MY ORDERS =====
function showMyOrders() {
    hideAllSections();
    myOrdersSection.style.display = 'block';
    displayOrders(orders);
    window.scrollTo(0, 0);
}

// ===== FUNCTION: SHOW ORDER DETAILS =====
function showOrderDetails(id) {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    
    hideAllSections();
    orderDetailsSection.style.display = 'block';
    
    const completedMilestones = order.milestones.filter(m => m.completed).length;
    const totalMilestones = order.milestones.length;
    
    document.getElementById('orderDetailsContent').innerHTML = `
        <div class="profile-container">
            <div class="order-header" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:15px;">
                <h2 style="margin:0;">${order.title}</h2>
                <span class="order-status ${order.status}">${order.status.replace('-', ' ')}</span>
            </div>
            
            <p style="color:#475569;line-height:1.8;margin:15px 0;">${order.description}</p>
            
            <div class="profile-stats" style="margin:20px 0;">
                <div>
                    <div class="stat-number">$${order.budget}</div>
                    <div class="stat-label">Budget</div>
                </div>
                <div>
                    <div class="stat-number">${order.deadline} days</div>
                    <div class="stat-label">Deadline</div>
                </div>
                <div>
                    <div class="stat-number">${completedMilestones}/${totalMilestones}</div>
                    <div class="stat-label">Milestones</div>
                </div>
            </div>
            
            <div class="detail-item">
                <h4>Client</h4>
                <p>${order.client}</p>
            </div>
            
            <div class="detail-item">
                <h4>Freelancer</h4>
                <p>${order.freelancer}</p>
            </div>
            
            <div class="detail-item">
                <h4>Progress</h4>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Completed</span>
                        <span>${order.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${order.progress}%;"></div>
                    </div>
                </div>
            </div>
            
            <div class="detail-item">
                <h4>Milestones</h4>
                <div class="milestones-list">
                    ${order.milestones.map(m => `
                        <div class="milestone-item">
                            <div class="milestone-check ${m.completed ? 'done' : ''}">
                                ${m.completed ? '<i class="fas fa-check"></i>' : ''}
                            </div>
                            <div class="milestone-info">
                                <h4>${m.title}</h4>
                                <p>${m.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${order.delivery ? `
            <div class="delivery-info">
                <h4 style="margin-bottom:8px;">Delivery Submitted</h4>
                <p>${order.delivery.message}</p>
                ${order.delivery.link ? `<p style="margin-top:8px;"><a href="${order.delivery.link}" target="_blank" style="color:#2563eb;">View Delivery</a></p>` : ''}
                <p style="color:#94a3b8;font-size:13px;margin-top:8px;">Submitted on ${order.delivery.date}</p>
            </div>
            ` : ''}
            
            <div class="profile-actions">
                ${order.status !== 'completed' && order.status !== 'cancelled' ? 
                    `<button class="btn-primary" onclick="showDeliveryForm(${order.id})">Submit Delivery</button>` : ''}
                ${order.status === 'pending' ? 
                    `<button class="btn-small btn-edit" onclick="updateOrderStatus(${order.id}, 'in-progress')">Start Project</button>` : ''}
                ${order.status === 'in-progress' ? 
                    `<button class="btn-small btn-edit" onclick="updateOrderStatus(${order.id}, 'submitted')">Mark as Submitted</button>` : ''}
                ${order.status === 'submitted' ? 
                    `<button class="btn-small btn-edit" onclick="updateOrderStatus(${order.id}, 'completed')">Mark as Completed</button>` : ''}
                <button class="btn-secondary" onclick="showMyOrders()">Back to Orders</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

// ===== FUNCTION: SHOW CREATE ORDER =====
function showCreateOrder() {
    hideAllSections();
    createOrderSection.style.display = 'block';
    document.getElementById('createOrderForm').reset();
    window.scrollTo(0, 0);
}

// ===== FUNCTION: SHOW DELIVERY FORM =====
function showDeliveryForm(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    hideAllSections();
    deliverySection.style.display = 'block';
    document.getElementById('deliveryOrderTitle').textContent = `Delivering: ${order.title}`;
    document.getElementById('deliveryOrderId').value = orderId;
    document.getElementById('deliveryForm').reset();
    window.scrollTo(0, 0);
}

// ===== FUNCTION: DISPLAY ORDERS =====
function displayOrders(orderList) {
    const grid = document.getElementById('ordersGrid');
    
    if (orderList.length === 0) {
        grid.innerHTML = `
            <div class="no-orders">
                <i class="fas fa-clipboard-list"></i>
                <h3>No Orders Found</h3>
                <p>You don't have any orders yet.</p>
                <button class="btn-primary" style="margin-top:15px;" onclick="showCreateOrder()">Create Order</button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = orderList.map(order => {
        const completedMilestones = order.milestones.filter(m => m.completed).length;
        return `
            <div class="order-card">
                <div class="order-header">
                    <h3>${order.title}</h3>
                    <span class="order-status ${order.status}">${order.status.replace('-', ' ')}</span>
                </div>
                <div class="order-details">
                    <span><i class="fas fa-user"></i> ${order.client}</span>
                    <span><i class="fas fa-dollar-sign"></i> $${order.budget}</span>
                    <span><i class="fas fa-clock"></i> ${order.deadline} days</span>
                </div>
                <div class="progress-container">
                    <div class="progress-label">
                        <span>Progress</span>
                        <span>${order.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${order.progress}%;"></div>
                    </div>
                </div>
                <p style="color:#64748b;font-size:14px;margin:10px 0;">
                    ${order.milestones.length} milestones (${completedMilestones} completed)
                </p>
                <div style="display:flex;gap:10px;margin-top:12px;">
                    <button class="btn-small btn-view" onclick="showOrderDetails(${order.id})">View Details</button>
                    ${order.status === 'pending' ? 
                        `<button class="btn-small btn-edit" onclick="updateOrderStatus(${order.id}, 'in-progress')">Start</button>` : ''}
                    ${order.status === 'in-progress' ? 
                        `<button class="btn-small btn-edit" onclick="showDeliveryForm(${order.id})">Deliver</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// ===== FUNCTION: FILTER ORDERS =====
function filterOrders(filter) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    let filtered;
    if (filter === 'all') {
        filtered = orders;
    } else if (filter === 'active') {
        filtered = orders.filter(o => o.status === 'in-progress' || o.status === 'pending' || o.status === 'submitted');
    } else if (filter === 'completed') {
        filtered = orders.filter(o => o.status === 'completed');
    }
    
    displayOrders(filtered);
}

// ===== FUNCTION: UPDATE ORDER STATUS =====
function updateOrderStatus(id, newStatus) {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    
    order.status = newStatus;
    
    // Update progress based on status
    if (newStatus === 'in-progress') {
        order.progress = Math.max(order.progress, 10);
    } else if (newStatus === 'submitted') {
        order.progress = Math.max(order.progress, 90);
    } else if (newStatus === 'completed') {
        order.progress = 100;
        order.milestones.forEach(m => m.completed = true);
    }
    
    alert(`Order status updated to "${newStatus.replace('-', ' ')}"`);
    displayOrders(orders);
    
    // If we're on the details page, refresh it
    if (orderDetailsSection.style.display === 'block') {
        showOrderDetails(id);
    }
}

// ===== EVENT: CREATE ORDER FORM =====
document.getElementById('createOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('orderTitle').value.trim();
    const client = document.getElementById('orderClient').value.trim();
    const freelancer = document.getElementById('orderFreelancer').value.trim();
    const description = document.getElementById('orderDescription').value.trim();
    const budget = parseFloat(document.getElementById('orderBudget').value);
    const deadline = parseInt(document.getElementById('orderDeadline').value);
    const status = document.getElementById('orderStatus').value;
    
    if (!title || !client || !freelancer || !description || !budget || !deadline) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const newOrder = {
        id: nextOrderId++,
        title,
        client,
        freelancer,
        description,
        budget,
        deadline,
        status,
        createdDate: new Date().toISOString().split('T')[0],
        progress: status === 'in-progress' ? 10 : 0,
        milestones: [
            { id: 1, title: "Project Kickoff", description: "Start the project", completed: status === 'in-progress' },
            { id: 2, title: "Development", description: "Work on the project", completed: false },
            { id: 3, title: "Delivery", description: "Submit final work", completed: false }
        ],
        delivery: null
    };
    
    orders.push(newOrder);
    alert('Order created successfully!');
    showMyOrders();
});

// ===== EVENT: DELIVERY FORM =====
document.getElementById('deliveryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const orderId = parseInt(document.getElementById('deliveryOrderId').value);
    const order = orders.find(o => o.id === orderId);
    const message = document.getElementById('deliveryMessage').value.trim();
    const link = document.getElementById('deliveryLink').value.trim();
    
    if (!message) {
        alert('Please describe your delivery.');
        return;
    }
    
    order.delivery = {
        message,
        link: link || null,
        date: new Date().toISOString().split('T')[0]
    };
    order.status = 'submitted';
    order.progress = 90;
    
    alert('Delivery submitted successfully!');
    showOrderDetails(orderId);
});

// ===== UPDATE HIDE ALL SECTIONS =====
const originalHideAllSectionsWeek5 = hideAllSections;
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
    
    myOrdersSection.style.display = 'none';
    orderDetailsSection.style.display = 'none';
    createOrderSection.style.display = 'none';
    deliverySection.style.display = 'none';
};
// ==========================================
// ===== WEEK 6: MESSAGES & REVIEWS ========
// ==========================================

// ===== CONVERSATIONS DATA =====
let conversations = [
    {
        id: 1,
        name: "TechCorp Inc.",
        avatar: "TC",
        lastMessage: "Great! When can you start?",
        time: "10:30 AM",
        unread: true,
        messages: [
            { id: 1, text: "Hi, I saw your proposal for our e-commerce project.", sender: "them", time: "10:00 AM" },
            { id: 2, text: "Yes! I'd love to work on it. I have 4 years of React experience.", sender: "me", time: "10:05 AM" },
            { id: 3, text: "That sounds perfect. What's your timeline?", sender: "them", time: "10:15 AM" },
            { id: 4, text: "I can start immediately and deliver in 14 days.", sender: "me", time: "10:20 AM" },
            { id: 5, text: "Great! When can you start?", sender: "them", time: "10:30 AM" }
        ]
    },
    {
        id: 2,
        name: "StartupXYZ",
        avatar: "SX",
        lastMessage: "Thanks for the designs!",
        time: "Yesterday",
        unread: false,
        messages: [
            { id: 1, text: "Hi, how's the mobile app UI coming along?", sender: "them", time: "Yesterday 2:00 PM" },
            { id: 2, text: "Going great! I've finished 12 screens so far.", sender: "me", time: "Yesterday 2:30 PM" },
            { id: 3, text: "Thanks for the designs!", sender: "them", time: "Yesterday 3:00 PM" }
        ]
    },
    {
        id: 3,
        name: "FashionBrand",
        avatar: "FB",
        lastMessage: "Let's discuss the campaign",
        time: "2 days ago",
        unread: false,
        messages: [
            { id: 1, text: "Can we schedule a call to discuss the social media campaign?", sender: "them", time: "2 days ago" },
            { id: 2, text: "Sure! How about tomorrow at 2 PM?", sender: "me", time: "2 days ago" },
            { id: 3, text: "Let's discuss the campaign", sender: "them", time: "2 days ago" }
        ]
    }
];

let currentConversationId = null;

// ===== NOTIFICATIONS DATA =====
let notifications = [
    {
        id: 1,
        type: "message",
        icon: "fa-envelope",
        title: "New Message",
        message: "TechCorp Inc. sent you a message",
        time: "10:30 AM",
        read: false
    },
    {
        id: 2,
        type: "proposal",
        icon: "fa-file-alt",
        title: "Proposal Accepted",
        message: "Your proposal for 'Mobile App UI Design' was accepted!",
        time: "Yesterday",
        read: false
    },
    {
        id: 3,
        type: "project",
        icon: "fa-check-circle",
        title: "Project Completed",
        message: "Project 'Social Media Campaign' was marked as completed",
        time: "2 days ago",
        read: false
    },
    {
        id: 4,
        type: "review",
        icon: "fa-star",
        title: "New Review",
        message: "You received a 5-star review from StartupXYZ",
        time: "3 days ago",
        read: true
    }
];

// ===== REVIEWS DATA =====
let reviews = [
    {
        id: 1,
        reviewer: "TechCorp Inc.",
        avatar: "TC",
        rating: 5,
        text: "Fizza delivered exceptional work on our e-commerce site. Highly recommended!",
        date: "2026-09-15"
    },
    {
        id: 2,
        reviewer: "StartupXYZ",
        avatar: "SX",
        rating: 4,
        text: "Great designs and good communication throughout the project.",
        date: "2026-09-10"
    },
    {
        id: 3,
        reviewer: "FashionBrand",
        avatar: "FB",
        rating: 5,
        text: "Very professional and creative. Will definitely work with again!",
        date: "2026-09-05"
    }
];

let nextReviewId = 4;
let selectedRating = 0;

// ===== DOM ELEMENTS =====
const messagesSection = document.getElementById('messages');
const notificationsSection = document.getElementById('notifications');
const reviewsSection = document.getElementById('reviews');
const conversationList = document.getElementById('conversationList');
const chatMessages = document.getElementById('chatMessages');
const chatHeader = document.getElementById('chatHeader');
const chatInputArea = document.getElementById('chatInputArea');
const messageInput = document.getElementById('messageInput');
const notifBadge = document.getElementById('notifBadge');

// ===== FUNCTION: SHOW MESSAGES =====
function showMessages() {
    hideAllSections();
    messagesSection.style.display = 'block';
    displayConversations();
    window.scrollTo(0, 0);
}

// ===== FUNCTION: DISPLAY CONVERSATIONS =====
function displayConversations() {
    conversationList.innerHTML = conversations.map(conv => `
        <div class="conversation-item ${conv.unread ? 'unread' : ''} ${currentConversationId === conv.id ? 'active' : ''}" onclick="openConversation(${conv.id})">
            <div class="conv-avatar">${conv.avatar}</div>
            <div class="conv-info">
                <h4>${conv.name}</h4>
                <p>${conv.lastMessage}</p>
            </div>
            <div class="conv-meta">
                <div class="conv-time">${conv.time}</div>
                ${conv.unread ? '<div class="unread-dot"></div>' : ''}
            </div>
        </div>
    `).join('');
}

// ===== FUNCTION: OPEN CONVERSATION =====
function openConversation(id) {
    const conv = conversations.find(c => c.id === id);
    if (!conv) return;
    
    currentConversationId = id;
    conv.unread = false;
    
    // Update conversation list
    displayConversations();
    
    // Show chat header
    chatHeader.innerHTML = `
        <h4>${conv.name}</h4>
        <p>Online</p>
    `;
    
    // Show messages
    chatMessages.innerHTML = conv.messages.map(msg => `
        <div class="message ${msg.sender === 'me' ? 'sent' : 'received'}">
            ${msg.text}
            <span class="msg-time">${msg.time}</span>
        </div>
    `).join('');
    
    // Show input area
    chatInputArea.style.display = 'flex';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Update notification badge
    updateNotifBadge();
}

// ===== FUNCTION: SEND MESSAGE =====
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !currentConversationId) return;
    
    const conv = conversations.find(c => c.id === currentConversationId);
    if (!conv) return;
    
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add message
    conv.messages.push({
        id: conv.messages.length + 1,
        text: text,
        sender: 'me',
        time: time
    });
    conv.lastMessage = text;
    conv.time = time;
    
    // Clear input
    messageInput.value = '';
    
    // Refresh chat
    openConversation(currentConversationId);
    
    // Auto-reply after 1 second (simulated)
    setTimeout(() => {
        conv.messages.push({
            id: conv.messages.length + 1,
            text: "Thanks for your message! I'll get back to you soon.",
            sender: 'them',
            time: time
        });
        conv.lastMessage = "Thanks for your message! I'll get back to you soon.";
        
        // Add notification
        notifications.unshift({
            id: notifications.length + 1,
            type: "message",
            icon: "fa-envelope",
            title: "New Message",
            message: `${conv.name} replied to you`,
            time: "Just now",
            read: false
        });
        
        if (currentConversationId === conv.id) {
            openConversation(conv.id);
        }
        displayConversations();
        updateNotifBadge();
    }, 1500);
}

// ===== FUNCTION: SHOW NOTIFICATIONS =====
function showNotifications() {
    hideAllSections();
    notificationsSection.style.display = 'block';
    displayNotifications();
    window.scrollTo(0, 0);
}

// ===== FUNCTION: DISPLAY NOTIFICATIONS =====
function displayNotifications() {
    const list = document.getElementById('notificationsList');
    
    if (notifications.length === 0) {
        list.innerHTML = `
            <div class="no-orders">
                <i class="fas fa-bell-slash"></i>
                <h3>No Notifications</h3>
                <p>You're all caught up!</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = notifications.map(n => `
        <div class="notification-item ${n.read ? '' : 'unread'}">
            <div class="notif-icon"><i class="fas ${n.icon}"></i></div>
            <div class="notif-content">
                <h4>${n.title}</h4>
                <p>${n.message}</p>
            </div>
            <div class="notif-time">${n.time}</div>
        </div>
    `).join('');
}

// ===== FUNCTION: MARK ALL READ =====
function markAllRead() {
    notifications.forEach(n => n.read = true);
    displayNotifications();
    updateNotifBadge();
    alert('All notifications marked as read!');
}

// ===== FUNCTION: UPDATE NOTIFICATION BADGE =====
function updateNotifBadge() {
    const unreadCount = notifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
        notifBadge.textContent = unreadCount;
        notifBadge.style.display = 'inline-block';
    } else {
        notifBadge.style.display = 'none';
    }
}

// ===== FUNCTION: SHOW REVIEWS =====
function showReviews(orderId) {
    hideAllSections();
    reviewsSection.style.display = 'block';
    
    if (orderId) {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            document.getElementById('reviewOrderId').value = orderId;
            document.getElementById('reviewProjectName').textContent = `Reviewing: ${order.title}`;
        }
        document.getElementById('writeReviewContainer').style.display = 'block';
    } else {
        document.getElementById('writeReviewContainer').style.display = 'none';
    }
    
    displayReviews();
    window.scrollTo(0, 0);
}

// ===== FUNCTION: DISPLAY REVIEWS =====
function displayReviews() {
    const list = document.getElementById('reviewsList');
    
    if (reviews.length === 0) {
        list.innerHTML = `<p style="color:#94a3b8;text-align:center;">No reviews yet.</p>`;
        return;
    }
    
    list.innerHTML = reviews.map(r => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">${r.avatar}</div>
                <div class="review-info">
                    <h4>${r.reviewer}</h4>
                    <div class="review-stars">
                        ${'<i class="fas fa-star"></i>'.repeat(r.rating)}
                        ${'<i class="far fa-star"></i>'.repeat(5 - r.rating)}
                    </div>
                    <div class="review-date">${r.date}</div>
                </div>
            </div>
            <p class="review-text">${r.text}</p>
        </div>
    `).join('');
}

// ===== FUNCTION: SET RATING =====
function setRating(rating) {
    selectedRating = rating;
    const stars = document.querySelectorAll('#starRating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
    
    const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    document.getElementById('ratingText').textContent = texts[rating];
}

// ===== FUNCTION: SUBMIT REVIEW =====
function submitReview() {
    const orderId = parseInt(document.getElementById('reviewOrderId').value);
    const text = document.getElementById('reviewText').value.trim();
    
    if (selectedRating === 0) {
        alert('Please select a rating.');
        return;
    }
    
    if (!text) {
        alert('Please write a review.');
        return;
    }
    
    const order = orders.find(o => o.id === orderId);
    
    reviews.unshift({
        id: nextReviewId++,
        reviewer: "You",
        avatar: "ME",
        rating: selectedRating,
        text: text,
        date: new Date().toISOString().split('T')[0]
    });
    
    // Add notification
    notifications.unshift({
        id: notifications.length + 1,
        type: "review",
        icon: "fa-star",
        title: "Review Submitted",
        message: "Your review was submitted successfully!",
        time: "Just now",
        read: false
    });
    
    alert('Review submitted successfully!');
    
    // Reset
    selectedRating = 0;
    document.getElementById('reviewText').value = '';
    document.querySelectorAll('#starRating i').forEach(star => {
        star.classList.remove('fas', 'active');
        star.classList.add('far');
    });
    document.getElementById('ratingText').textContent = 'Select rating';
    
    displayReviews();
    updateNotifBadge();
}

// EVENT: ENTER KEY TO SEND MESSAGE 
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

//  UPDATE HIDE ALL SECTIONS 
const originalHideAllSectionsWeek6 = hideAllSections;
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
    
    myOrdersSection.style.display = 'none';
    orderDetailsSection.style.display = 'none';
    createOrderSection.style.display = 'none';
    deliverySection.style.display = 'none';
    
    messagesSection.style.display = 'none';
    notificationsSection.style.display = 'none';
    reviewsSection.style.display = 'none';
};

// ===== INITIAL NOTIFICATION BADGE =====
updateNotifBadge();
