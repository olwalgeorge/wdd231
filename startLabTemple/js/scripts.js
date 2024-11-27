import { temples, photoGalleryUrl } from "../data/temples.js";
console.log(temples);
console.log(photoGalleryUrl);

const showTemple = document.querySelector('#showHere');
const dialogBox = document.querySelector('#mydialog');
const templeTitle = document.querySelector('#mydialog h2');
const closeButton = document.querySelector('#mydialog button');
const templeInfo = document.querySelector('#mydialog p');
const navLinks = document.querySelectorAll('nav ul li a');

closeButton.addEventListener('click', () => {
    dialogBox.close();
});

function displayTemple(data) {
    showTemple.innerHTML = ''; // Clear existing content
    data.forEach(temple => {    
        const photo = document.createElement('img');
        
        photo.src = `${photoGalleryUrl}${temple.path}`;
        photo.alt = `${temple.name}`;

        photo.addEventListener('click', () => showTempleDialog(temple));
        
        showTemple.appendChild(photo);
    });
}

function showTempleDialog(temple) {
    dialogBox.showModal();
    templeTitle.textContent = temple.name;
    templeInfo.textContent = `Dedicated on ${temple.dedicated} by ${temple.person} as temple number ${temple.number}`;
}

function filterTemples(filter) {
    const currentYear = new Date().getFullYear();
    const cutoffYear = currentYear - 50; // Consider temples older than 50 years as "old"

    switch (filter) {
        case 'old':
            return temples.filter(temple => {
                const dedicationYear = parseInt(temple.dedicated.split(' ').pop());
                return dedicationYear < cutoffYear;
            });
        case 'new':
            return temples.filter(temple => {
                const dedicationYear = parseInt(temple.dedicated.split(' ').pop());
                return dedicationYear >= cutoffYear;
            });
        default:
            return temples;
    }
}

// Event listeners for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = e.target.textContent.toLowerCase();
        const filteredTemples = filterTemples(filter);
        displayTemple(filteredTemples);
    });
});

// Initial display of all temples
displayTemple(temples);