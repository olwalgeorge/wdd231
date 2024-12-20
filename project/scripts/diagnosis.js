document.addEventListener('DOMContentLoaded', () => {
    const mapSection = document.querySelector('.map-section');
    const locationToggle = document.querySelector('.location-toggle input');
    const takePhotoButton = document.querySelector('.action-btn:nth-child(2)');
    const uploadButton = document.querySelector('.action-btn:first-child');
    const capturedImage = document.getElementById('captured-image');
    const identifyButton = document.querySelector('.identify-btn');
    const kindwiseApiKey = document.getElementById('kindwise-api').getAttribute('data-api-key');

    let map = null;
    let marker = null;
    let stream = null;

    function initMap() {
        if (!map) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -1.2921, lng: 36.8219 },
                zoom: 12
            });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        map.setCenter(pos);
                        if (marker) {
                            marker.setMap(null);
                        }
                        marker = new google.maps.Marker({
                            position: pos,
                            map: map
                        });
                    },
                    (error) => {
                        alert('Geolocation error:');
                    }
                );
            }
        }
    }

    function toggleMap() {
        if (locationToggle.checked) {
            mapSection.style.display = 'block';
            initMap();
        } else {
            mapSection.style.display = 'none';
            if (marker) {
                marker.setMap(null);
            }
        }
    }

    takePhotoButton.addEventListener('click', () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(videoStream => {
                    stream = videoStream;
                    const video = document.createElement('video');
                    video.srcObject = stream;
                    video.play();
                    video.addEventListener('loadeddata', () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        canvas.getContext('2d').drawImage(video, 0, 0);
                        capturedImage.src = canvas.toDataURL('image/jpeg');
                        capturedImage.style.display = 'block';
                        stream.getTracks().forEach(track => track.stop());
                    });
                })
                .catch(error => {
                    alert('Error accessing camera:');
                });
        } else {
            alert('Your browser does not support camera access.');
        }
    });

    uploadButton.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    capturedImage.src = e.target.result;
                    capturedImage.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
        fileInput.click();
    });

    identifyButton.addEventListener('click', identifyCropDisease);
    function identifyCropDisease() {
        if (!capturedImage.src) {
            alert('Please capture or upload an image first.');
            return;
        }
    
        const canvas = document.createElement('canvas');
        canvas.width = capturedImage.width;
        canvas.height = capturedImage.height;
        canvas.getContext('2d').drawImage(capturedImage, 0, 0);
        const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
    
        const requestBody = {
            images: [
                `data:image/jpeg;base64,${base64Image}`
            ],
            modifiers: ["similar_images=true"],
            plant_details: ["common_names", "url", "wiki_description", "taxonomy"]
        };
    
        fetch('https://crop.kindwise.com/api/v1/identification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': kindwiseApiKey
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            alert('An error occurred during identification. Please try again.');
        });
    }
    
    function displayResults(data) {
        // Implement this function to show the results to the user
    }

    // Set initial state
    toggleMap();

    // Handle toggle changes
    locationToggle.addEventListener('change', toggleMap);
});

