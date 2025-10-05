// Scroll Animation Script for HomeTech Spares

document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with reveal class
    const revealElements = document.querySelectorAll('.reveal');
    
    // Function to check if element is in viewport
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check on page load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
});