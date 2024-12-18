let map;
let isMapVisible = true;

function initMap() {
    const initialLocation = { lat: -1.286389, lng: 36.817223 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: initialLocation,
        zoom: 8,
        mapTypeId: 'roadmap'
    });
}

function toggleMapVisibility() {
    const mapContainer = document.getElementById("map");
    if (isMapVisible) {
        mapContainer.style.display = "block";
    } else {
        mapContainer.style.display = "none";
    }
    isMapVisible = !isMapVisible;
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleCheckbox = document.querySelector('.location-toggle input');
    toggleCheckbox.addEventListener('change', toggleMapVisibility);
});
