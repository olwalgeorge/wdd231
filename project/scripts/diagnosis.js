document.addEventListener('DOMContentLoaded', () => {
    const mapSection = document.querySelector('.map-section');
    const locationToggle = document.querySelector('.location-toggle input');
    let map = null;
    let marker = null;

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

    // Set initial state
    toggleMap();

    // Handle toggle changes
    locationToggle.addEventListener('change', toggleMap);
});
