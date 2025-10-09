/**
 * Map functionality for the festival website
 * Using Leaflet to create an interactive map with a marker
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize map if map element exists
    const mapElement = document.getElementById('map');
    if (mapElement) {
        initializeMap();
    }
});

/**
 * Initialize the Leaflet map
 */
function initializeMap() {
    // Coordinates for R. de São Cristovão 4, 2420-091 Caranguejeira
    const latitude = 39.7437509;
    const longitude = -8.7102727;
    
    // Create the map centered on the location
    const map = L.map('map').setView([latitude, longitude], 16);
    
    // Add the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Create a custom icon for the marker
    const customIcon = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    // Add a marker with custom popup
    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
    
    // Custom popup HTML content
    const popupContent = `
        <div class="custom-popup">
            <h4>Festeiros 2005</h4>
            <p>R. de São Cristovão 4</p>
            <p>2420-091 Caranguejeira</p>
        </div>
    `;
    
    // Bind the popup to the marker and open it automatically
    marker.bindPopup(popupContent).openPopup();
    
    // Add a circle around the marker to make it stand out
    L.circle([latitude, longitude], {
        color: '#4e73df',
        fillColor: '#1a3a8f',
        fillOpacity: 0.1,
        radius: 100
    }).addTo(map);
    
    // Make sure map is properly sized
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
    
    // Run invalidateSize again after a longer delay to ensure map is visible
    // This helps with mobile rendering issues
    setTimeout(() => {
        map.invalidateSize();
    }, 500);
    
    // Handle window resize to refresh the map
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });
    
    // Handle orientation change specifically for mobile devices
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            map.invalidateSize();
        }, 200);
    });
}