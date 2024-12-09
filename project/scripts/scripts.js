// Update copyright year
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Update last modified date
document.getElementById('lastModified').textContent = document.lastModified;

// Add hover effect to color samples
const colorSamples = document.querySelectorAll('.color-sample');
colorSamples.forEach(sample => {
    sample.addEventListener('mouseover', () => {
        sample.style.transform = 'scale(1.1)';
        sample.style.transition = 'transform 0.3s ease';
    });
    sample.addEventListener('mouseout', () => {
        sample.style.transform = 'scale(1)';
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add a simple animation to the header
const header = document.querySelector('header');
window.addEventListener('load', () => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    header.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);
});