/**
 * Highlights alert functionality
 * Shows an informative alert that users can dismiss
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the highlights alert
    initHighlightsAlert();
});

/**
 * Initialize the highlights alert functionality
 */
function initHighlightsAlert() {
    const alertElement = document.getElementById('highlights-alert');
    const closeButton = alertElement.querySelector('.close-alert');
    
    // Check if user has previously closed the alert
    const alertClosed = localStorage.getItem('highlightsAlertClosed');
    
    // If user has closed the alert before, don't show it
    if (alertClosed === 'true') {
        alertElement.style.display = 'none';
    }
    
    // Add event listener to close button
    closeButton.addEventListener('click', function() {
        // Hide the alert with animation
        alertElement.style.opacity = '0';
        alertElement.style.transform = 'translateY(-10px)';
        
        // After animation completes, hide the element
        setTimeout(() => {
            alertElement.style.display = 'none';
        }, 500);
        
        // Save user preference
        localStorage.setItem('highlightsAlertClosed', 'true');
    });
    
    // Auto-hide the alert after 7 seconds
    setTimeout(() => {
        // Only auto-hide if it hasn't been manually closed
        if (alertElement.style.display !== 'none') {
            alertElement.style.opacity = '0';
            alertElement.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                alertElement.style.display = 'none';
            }, 500);
        }
    }, 7000);
}