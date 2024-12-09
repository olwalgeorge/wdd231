document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll(".lazy-image");
    
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0) {
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

document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    const calendarTable = document.querySelector('.calendar table');
    const calendarHeader = document.querySelector('.calendar-header span:nth-child(2)');
    const prevButton = document.querySelector('.calendar-header .prev');
    const nextButton = document.querySelector('.calendar-header .next');

    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startingDay = firstDay.getDay();
        const today = new Date();
        
        let calendarHTML = '<tbody>';
        let day = 1;

        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr>';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startingDay) {
                    calendarHTML += '<td></td>';
                } else if (day > daysInMonth) {
                    calendarHTML += '<td></td>';
                } else {
                    let className = '';
                    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                        className = 'today';
                    }
                    calendarHTML += `<td class="${className}">${day}</td>`;
                    day++;
                }
            }
            calendarHTML += '</tr>';
            if (day > daysInMonth) break;
        }
        calendarHTML += '</tbody>';

        return calendarHTML;
    }

    function updateCalendar(date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        
        calendarHeader.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        
        const tableBody = generateCalendar(date.getFullYear(), date.getMonth());
        calendarTable.innerHTML = `
            <thead>
                <tr>
                    <th>Su</th><th>Mo</th><th>Tu</th>
                    <th>We</th><th>Th</th><th>Fr</th><th>Sa</th>
                </tr>
            </thead>
            ${tableBody}
        `;
    }

    function navigateMonth(direction) {
        if (direction === 'next') {
            currentDate.setMonth(currentDate.getMonth() + 1);
        } else if (direction === 'prev') {
            currentDate.setMonth(currentDate.getMonth() - 1);
        }
        updateCalendar(currentDate);
    }

    // Initial calendar setup
    updateCalendar(currentDate);

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => navigateMonth('prev'));
    nextButton.addEventListener('click', () => navigateMonth('next'));
});