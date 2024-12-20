
// Hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active'); 

        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex'; 
            setTimeout(() => {
                navLinks.style.maxHeight = '300px'; 
                navLinks.style.opacity = '1'; 
            }, 10); 
        } else {
            navLinks.style.maxHeight = '0'; 
            navLinks.style.opacity = '0'; 
            setTimeout(() => {
                navLinks.style.display = 'none'; 
            }, 300); 
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const breadcrumb = document.querySelector('.breadcrumb');
    const links = breadcrumb.querySelectorAll('a');
    const currentPage = breadcrumb.querySelector('.current-page');

    links.forEach(link => {
        if (link.getAttribute('href') === window.location.pathname) {
            currentPage.textContent = link.textContent;
        }
    });
});

// Update last modified date
document.getElementById('year').textContent = new Date().getFullYear();

const lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent = lastModified.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.getElementById('welcome-message');
    const currentDate = new Date();

    if (!localStorage.getItem('lastVisit')) {
        // First time visit
        welcomeMessage.innerHTML = `
            <h2>Welcome to CropDaktari!</h2>
            <p>We're excited to have you here. Start exploring our AI-powered crop diagnosis tools today!</p>
        `;
        localStorage.setItem('lastVisit', currentDate.toISOString());
    } else {
        // Returning visit
        const lastVisit = new Date(localStorage.getItem('lastVisit'));
        const timeDifference = currentDate - lastVisit;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        let message;
        if (daysDifference < 1) {
            const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
            message = `Welcome back! Your last visit was ${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago.`;
        } else {
            const daysAgo = Math.floor(daysDifference);
            message = `Welcome back! It's been ${daysAgo} day${daysAgo !== 1 ? 's' : ''} since your last visit.`;
        }

        welcomeMessage.innerHTML = `
            <h2>Hello again!</h2>
            <p>${message}</p>
            <p>Ready to check on your crops?</p>
        `;

        localStorage.setItem('lastVisit', currentDate.toISOString());
    }
});

document.querySelector('.btn-primary').addEventListener('click', () => {
    window.location.href = 'disease-diagnosis.html'; 
});

document.querySelector('.btn-secondary').addEventListener('click', () => {
    window.location.href = 'pest-diagnosis.html'; 
});

