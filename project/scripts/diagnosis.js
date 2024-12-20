document.addEventListener('DOMContentLoaded', () => {
    const mapSection = document.querySelector('.map-section');
    const locationToggle = document.querySelector('.location-toggle input');
    const takePhotoButton = document.querySelector('.action-btn:nth-child(2)');
    const uploadButton = document.querySelector('.action-btn:first-child');
    const capturedImage = document.getElementById('captured-image');
    const identifyButton = document.querySelector('.identify-btn');
    const kindwiseApiKey = document.getElementById('kindwise-api').getAttribute('data-api-key');
    console.log('API Key:', kindwiseApiKey);

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
                        console.error('Geolocation error:', error);
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
        console.log('Take photo button clicked');
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
                        console.log('Photo captured');
                        stream.getTracks().forEach(track => track.stop());
                    });
                })
                .catch(error => {
                    console.error('Error accessing camera:', error);
                    alert('Unable to access camera. Please make sure you have given permission.');
                });
        } else {
            alert('Your browser does not support camera access.');
        }
    });

    uploadButton.addEventListener('click', () => {
        console.log('Upload button clicked');
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
                    console.log('Image uploaded');
                };
                reader.readAsDataURL(file);
            }
        });
        fileInput.click();
    });

    identifyButton.addEventListener('click', identifyCropDisease);
    function identifyCropDisease() {
        console.log('Identify button clicked');
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
    
        console.log('Sending request to Kindwise API');
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
            console.log('Identification result:', data);
            displayResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during identification. Please try again.');
        });
    }
    
    function displayResults(data) {
        console.log('Displaying results:', data);
        // Implement this function to show the results to the user
        // Example: You could create HTML elements to display the plant details
    }

    // Set initial state
    toggleMap();

    // Handle toggle changes
    locationToggle.addEventListener('change', toggleMap);
});
