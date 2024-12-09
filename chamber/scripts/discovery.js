// Visitor tracking
document.addEventListener('DOMContentLoaded', () => {
    const visitorMessage = document.querySelector('.visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();

    if (!lastVisit) {
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceVisit < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitorMessage.textContent = `You last visited ${daysSinceVisit} ${daysSinceVisit === 1 ? 'day' : 'days'} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', currentDate);

    // Lazy loading
    const images = document.querySelectorAll('.gallery img[data-src]');
    const imgOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const loadImages = (image) => {
        image.src = image.getAttribute('data-src');
        image.onload = () => {
            image.removeAttribute('data-src');
        };
    };

    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImages(entry.target);
                    imgObserver.unobserve(entry.target);
                }
            });
        }, imgOptions);

        images.forEach(img => imgObserver.observe(img));
    }

    // Footer year and last modified
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
});