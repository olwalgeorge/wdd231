document.getElementById('hamburger').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        menu.style.position = 'absolute';
        menu.style.top = '50px';
        menu.style.width = '100%';
        menu.style.backgroundColor = '#444';
        menu.style.boxShadow = '.2rem .2rem .5rem rgba(0,0,0,.3)';
        menu.style.borderRadius = '.5rem';
        menu.style.zIndex = '1000'; // Ensure it appears above other elements
    }
 });