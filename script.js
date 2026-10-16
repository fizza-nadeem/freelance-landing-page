// ==========================================
// ===== WEEK 1: NAVIGATION =================
// ==========================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links li a').forEach(function(link) {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

// ==========================================
// ===== TOAST NOTIFICATION HELPER ==========
// ==========================================

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ==========================================
// ===== WEEK 2: FREELANCER DATA ============
// ==========================================

const freelancers = [
    { id: 1, name: "Ali Hassan", service: "Full Stack Web Developer", category: "web", price: 85, rating: 4.9, reviews: 127, description: "Full stack developer with 5 years of experience in React, Node.js, and MongoDB. I build fast, responsive web applications from scratch.", avatar: "AH", dateAdded: "2026-09-01" },
    { id: 2, name: "Sana Malik", service: "UI/UX & Graphic Designer", category: "design", price: 65, rating: 4.8, reviews: 98, description: "Creative designer specializing in branding, UI/UX design, and illustration. I help businesses look professional and stand out.", avatar: "SM", dateAdded: "2026-09-03" },
    { id: 3, name: "Usman Khan", service: "Mobile App Developer", category: "mobile", price: 95, rating: 4.7, reviews: 83, description: "Experienced mobile developer building apps for iOS and Android using React Native and Flutter. I create smooth, high-quality apps.", avatar: "UK", dateAdded: "2026-09-05" },
    { id: 4, name: "Fatima Ali", service: "Data Analyst & BI Specialist", category: "data", price: 75, rating: 4.9, reviews: 56, description: "Data analyst with expertise in Python, SQL, Power BI, and Tableau. I turn raw data into actionable insights.", avatar: "FA", dateAdded: "2026-08-28" },
    { id: 5, name: "Ahmed Raza", service: "Digital Marketing Expert", category: "marketing", price: 55, rating: 4.6, reviews: 112, description: "Digital marketer specializing in SEO, content marketing, and social media management. I help businesses grow their online presence.", avatar: "AR", dateAdded: "2026-09-02" },
    { id: 6, name: "Zara Ahmed", service: "Video Editor & Animator", category: "video", price: 70, rating: 4.8, reviews: 64, description: "Video editor with 4 years of experience in motion graphics, video editing, and animation. I create engaging video content.", avatar: "ZA", dateAdded: "2026-08-30" }
];

// ==========================================
// ===== WEEK 7: FAVORITES ==================
// ==========================================

let favorites = { freelancers: [], services: [] };

function loadFavorites() {
    const saved = localStorage.getItem('freelanceHub_favorites');
    if (saved) {
        try { favorites = JSON.parse(saved); } catch (e) { favorites = { freelancers: [], services: [] }; }
    }
}

function saveFavorites() {
    localStorage.setItem('freelanceHub_favorites', JSON.stringify(favorites));
    updateFavBadge();
}

function updateFavBadge() {
    const total = favorites.freelancers.length + favorites.services.length;
    const badge = document.getElementById('favBadge');
    if (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'inline-block' : 'none';
    }
}

function toggleFavFreelancer(id, event) {
    if (event) event.stopPropagation();
    const index = favorites.freelancers.indexOf(id);
    if (index > -1) {
        favorites.freelancers.splice(index, 1);
        showToast('Removed from favorites', 'info');
    } else {
        favorites.freelancers.push(id);
        showToast('Added to favorites', 'success');
    }
    saveFavorites();
    if (document.querySelector('.freelancers-section').style.display !== 'none') {
        displayFreelancers(filterFreelancers());
    }
}

function isFavFreelancer(id) { return favorites.freelancers.includes(id); }

// ==========================================
// ===== WEEK 7: FAVORITES PAGE =============
// ==========================================

let currentFavTab = 'freelancers';

function showFavorites() {
    hideAllSections();
    document.getElementById('favorites').style.display = 'block';
    displayFavorites();
    window.scrollTo(0, 0);
}

function showFavTab(tab, event) {
    currentFavTab = tab;
    document.querySelectorAll('.fav-tab').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
    displayFavorites();
}

function displayFavorites() {
    const grid = document.getElementById('favoritesGrid');

    if (currentFavTab === 'freelancers') {
        const favFreelancers = freelancers.filter(f => favorites.freelancers.includes(f.id));
        if (favFreelancers.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart-broken"></i>
                    <h3>No Favorite Freelancers Yet</h3>
                    <p>Browse freelancers and click the heart icon to save them here.</p>
                    <button class="btn-primary" onclick="showFindFreelancers()">Find Freelancers</button>
                </div>`;
            return;
        }
        grid.innerHTML = favFreelancers.map(freelancer => `
            <div class="freelancer-card">
                <button class="fav-btn active" onclick="toggleFavFreelancer(${freelancer.id}, event); displayFavorites();">
                    <i class="fas fa-heart"></i>
                </button>
                <div class="card-header">
                    <div class="profile-img">${freelancer.avatar}</div>
                    <div><h3>${freelancer.name}</h3><div class="service-title">${freelancer.service}</div></div>
                </div>
                <div class="category-tag">${getCategoryName(freelancer.category)}</div>
                <div class="card-details">
                    <div class="price">$${freelancer.price} <span>/ hr</span></div>
                    <div class="rating">⭐ ${freelancer.rating} <span>(${freelancer.reviews})</span></div>
                </div>
                <button class="view-btn" onclick="viewProfile(${freelancer.id})">View Profile</button>
            </div>
        `).join('');
    } else {
        const favServices = userServices.filter(s => favorites.services.includes(s.id));
        if (favServices.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart-broken"></i>
                    <h3>No Favorite Services Yet</h3>
                    <p>Save services you like and they'll appear here.</p>
                    <button class="btn-primary" onclick="showMyServices()">Browse Services</button>
                </div>`;
            return;
        }
        grid.innerHTML = favServices.map(service => `
            <div class="service-card">
                <div class="service-header">
                    <h3>${service.title}</h3>
                    <span class="service-category">${getCategoryName(service.category)}</span>
                </div>
                <p style="color:#64748b;font-size:14px;margin:8px 0;">${service.description.substring(0, 80)}...</p>
                <div class="service-price">$${service.price} <span>/ hour</span></div>
                <div class="service-actions">
                    <button class="btn-small btn-view" onclick="showServiceDetails(${service.id})">View</button>
                </div>
            </div>
        `).join('');
    }
}

// ==========================================