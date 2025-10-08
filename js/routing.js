/**
 * Simple routing functionality for festival website
 * Handles special URLs and redirects to appropriate sections
 */

document.addEventListener('DOMContentLoaded', () => {
    handleSpecialUrls();
});

/**
 * Check the current URL and handle special paths
 */
function handleSpecialUrls() {
    // Get the current path from the URL
    const path = window.location.pathname;
    
    // Define routes and their corresponding section IDs
    const routes = {
        '/encomenda': 'encomenda',
        '/localizacao': 'localizacao',
        '/eventos': 'eventos-calendario',
        '/galeria': 'galeria-eventos',
        '/destaques': 'destaques'
    };
    
    // Check if the current path matches any defined routes
    if (routes[path]) {
        // Scroll to the section with smooth behavior
        const targetElement = document.getElementById(routes[path]);
        if (targetElement) {
            // Update URL to main page but maintain the virtual route for sharing
            const stateObj = { path: path };
            window.history.pushState(stateObj, '', '/');
            
            // Scroll to the element with a slight delay to ensure smooth transition
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Add highlight effect to the section
                addTemporaryHighlight(targetElement);
            }, 100);
        }
    }
}

/**
 * Add temporary highlight effect to the target element
 * @param {HTMLElement} element - The element to highlight
 */
function addTemporaryHighlight(element) {
    // Make this function available globally for the hamburger menu
    window.addTemporaryHighlight = addTemporaryHighlight;
    // Add a highlight class
    element.classList.add('section-highlight');
    
    // Remove the highlight after animation completes
    setTimeout(() => {
        element.classList.remove('section-highlight');
    }, 2000);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.path) {
        const routes = {
            '/encomenda': 'encomenda',
            '/localizacao': 'localizacao',
            '/eventos': 'eventos-calendario',
            '/galeria': 'galeria-eventos',
            '/destaques': 'destaques'
        };
        
        const targetId = routes[event.state.path];
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});