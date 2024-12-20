// Sample data
const records = [
    {
        "date": "Jan 15, 2025",
        "type": "Disease",
        "diagnosis": "Leaf Rust",
        "location": "Nairobi, Kenya",
        "status": "Pending",
        "image": "images/leaf_rust.webp"
    },
    {
        "date": "Jan 14, 2025",
        "type": "Pest",
        "diagnosis": "Aphids",
        "location": "Mombasa, Kenya",
        "status": "Completed",
        "image": "images/aphids.webp"
    },
    {
        "date": "Jan 13, 2025",
        "type": "Disease",
        "diagnosis": "Powdery Mildew",
        "location": "Kisumu, Kenya",
        "status": "Pending",
        "image": "images/powdery_mildew.webp"
    },
    {
        "date": "Jan 12, 2025",
        "type": "Pest",
        "diagnosis": "Whiteflies",
        "location": "Eldoret, Kenya",
        "status": "Completed",
        "image": "images/whiteflies.webp"
    },
    {
        "date": "Jan 11, 2025",
        "type": "Disease",
        "diagnosis": "Blight",
        "location": "Nakuru, Kenya",
        "status": "Pending",
        "image": "images/blight.webp"
    },
    {
        "date": "Jan 10, 2025",
        "type": "Pest",
        "diagnosis": "Spider Mites",
        "location": "Thika, Kenya",
        "status": "Completed",
        "image": "images/spider_mites.webp"
    },
    {
        "date": "Jan 9, 2025",
        "type": "Disease",
        "diagnosis": "Downy Mildew",
        "location": "Naivasha, Kenya",
        "status": "Pending",
        "image": "images/downy_mildew.webp"
    },
    {
        "date": "Jan 8, 2025",
        "type": "Pest",
        "diagnosis": "Cutworms",
        "location": "Machakos, Kenya",
        "status": "Completed",
        "image": "images/cutworms.webp"
    },
    {
        "date": "Jan 7, 2025",
        "type": "Disease",
        "diagnosis": "Root Rot",
        "location": "Meru, Kenya",
        "status": "Pending",
        "image": "images/root_rot.webp"
    },
    {
        "date": "Jan 6, 2025",
        "type": "Pest",
        "diagnosis": "Armyworms",
        "location": "Kakamega, Kenya",
        "status": "Completed",
        "image": "images/armyworms.webp"
    }
];

function renderRecords() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.type}</td>
            <td>${record.diagnosis}</td>
            <td>${record.location}</td>
            <td><span class="status ${record.status.toLowerCase()}">${record.status}</span></td>
            <td><img src="images/view.svg" alt="View" class="action-icon" data-image="${record.image}" data-diagnosis="${record.diagnosis}"></td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listeners to view icons
    const viewIcons = document.querySelectorAll('.action-icon');
    viewIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const diagnosis = this.getAttribute('data-diagnosis');
            openModal(imageSrc, diagnosis);
        });
    });
}

function openModal(imageSrc, diagnosis) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalDiagnosis = document.getElementById('modal-diagnosis');
    modalImage.src = imageSrc;
    modalDiagnosis.textContent = diagnosis;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

window.onload = function() {
    renderRecords();
    
    // Add modal HTML to the document body
    const modalHTML = `
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <img id="modal-image" src="" alt="Diagnosis Image">
            <p id="modal-diagnosis"></p>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add event listener to close button
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);

    // Add event listener to close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });
};
