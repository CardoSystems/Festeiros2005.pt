/* Additional script for highlights gallery */
document.addEventListener('DOMContentLoaded', function() {
    // Add animation effects to highlights section
    const highlightItems = document.querySelectorAll('.highlight-item');
    
    if (highlightItems.length) {
        // Add staggered entrance animation
        highlightItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        });
        
        // Add hover effects
        highlightItems.forEach(item => {
            const overlay = item.querySelector('.overlay');
            if (overlay) {
                overlay.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                overlay.style.transform = 'translateY(10px)';
                overlay.style.opacity = '0.8';
                
                item.addEventListener('mouseenter', () => {
                    overlay.style.transform = 'translateY(0)';
                    overlay.style.opacity = '1';
                });
                
                item.addEventListener('mouseleave', () => {
                    overlay.style.transform = 'translateY(10px)';
                    overlay.style.opacity = '0.8';
                });
            }
        });
    }
});