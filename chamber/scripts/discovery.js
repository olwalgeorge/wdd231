document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll(".lazy-image");
    
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    img.setAttribute('src', src);
                    img.addEventListener('load', function() {
                        img.classList.add('loaded');
                    });
                    img.addEventListener('error', function() {
                        img.src = 'images/placeholder.jpg'; // Fallback to placeholder on error
                    });
                    observer.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px 300px 0px"
        });

        io.observe(target);
    };

    lazyImages.forEach(lazyLoad);
});

// Visit counter using localStorage
document.addEventListener("DOMContentLoaded", function() {
    const visitorMessage = document.querySelector(".visitor-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = Date.now();

    if (!lastVisit) {
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSinceLastVisit === 1) {
            visitorMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitorMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentDate);
});

// Hover effect for gallery images (desktop only)
if (window.matchMedia("(min-width: 768px)").matches) {
    const galleryImages = document.querySelectorAll(".gallery figure");
    
    galleryImages.forEach(figure => {
        figure.addEventListener("mouseenter", () => {
            figure.style.transform = "scale(1.05)";
        });
        
        figure.addEventListener("mouseleave", () => {
            figure.style.transform = "scale(1)";
        });
    });
}