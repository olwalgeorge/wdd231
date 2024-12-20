document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('thankYouModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeBtn = document.getElementsByClassName('close')[0];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        const now = new Date();
        const timestamp = now.toLocaleString();

        modalMessage.textContent = `Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon. (Submitted on: ${timestamp})`;
        modal.style.display = 'block';

        form.reset();
    });

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
