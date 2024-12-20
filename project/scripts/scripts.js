
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

