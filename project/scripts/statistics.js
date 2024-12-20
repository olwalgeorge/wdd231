
import { records } from './data.js';
console.log(records);

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
