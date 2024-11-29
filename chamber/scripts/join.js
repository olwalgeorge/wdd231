document.addEventListener('DOMContentLoaded', function() {
    // Set current timestamp
    document.getElementById('timestamp').value = new Date().toISOString();

    // Validate organizational title
    const orgTitleInput = document.getElementById('orgTitle');
    orgTitleInput.addEventListener('input', function() {
        const pattern = /^[A-Za-z\s-]{7,}$/;
        if (this.value && !pattern.test(this.value)) {
            this.setCustomValidity('Please enter at least 7 characters, using only letters, spaces, and hyphens.');
        } else {
            this.setCustomValidity('');
        }
    });
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}

if (formSubmitHandler) {
    formSubmitHandler.addEventListener('submit', function(event) {
        event.preventDefault();
        // Assuming form validation and data collection happens here
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const business = document.getElementById('business').value;
        const submissionDate = new Date().toLocaleString();
        // Store the form data and redirect
        window.location.href = 'thankyou.html?first_name=' + encodeURIComponent(firstName) + '&last_name=' + encodeURIComponent(lastName) + '&email=' + encodeURIComponent(email) + '&mobile=' + encodeURIComponent(mobile) + '&business=' + encodeURIComponent(business) + '&submission_date=' + encodeURIComponent(submissionDate);
    });
}
