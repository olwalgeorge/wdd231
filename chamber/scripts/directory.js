// directory.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');
    const directory = document.getElementById('directory');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 
            hamburger.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
        navMenu.classList.toggle('show');
    });

    // View toggle handlers
    gridBtn?.addEventListener('click', () => {
        directory.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        localStorage.setItem('viewPreference', 'grid');
    });

    listBtn?.addEventListener('click', () => {
        directory.classList.add('list-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        localStorage.setItem('viewPreference', 'list');
    });

    // Load saved view preference
    const savedView = localStorage.getItem('viewPreference');
    if (savedView === 'list') {
        listBtn?.click();
    }

    // Fetch members data from JSON file
    async function getMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error('Failed to fetch members data');
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Error:', error);
            directory.innerHTML = '<p class="error">Error loading member data. Please try again later.</p>';
        }
    }

    // Get membership level badge
    function getMembershipBadge(level) {
        switch(level) {
            case 3:
                return '<span class="badge gold">Gold Member</span>';
            case 2:
                return '<span class="badge silver">Silver Member</span>';
            case 1:
                return '<span class="badge bronze">Bronze Member</span>';
            default:
                return '';
        }
    }

    // Display members
    function displayMembers(members) {
        directory.innerHTML = members.map(member => `
            <div class="business-card membership-${member.membershipLevel}">
                <img src="images/${member.image}" alt="${member.name} logo">
                <div class="business-info">
                    <h2>${member.name}</h2>
                    <p class="description">${member.description}</p>
                    <p class="address">${member.address}</p>
                    <p class="phone">${member.phone}</p>
                    <p class="website"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                    ${getMembershipBadge(member.membershipLevel)}
                </div>
            </div>
        `).join('');
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('show');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Update footer information
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;

    // Initialize directory
    getMembers();
});