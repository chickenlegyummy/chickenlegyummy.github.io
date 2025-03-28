// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after 2 seconds
    setTimeout(function() {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        
        // Remove preloader from DOM after fade out
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
    
    // Scroll animation functionality
    const aboutmeSection = document.getElementById('aboutme');
    const portalSection = document.getElementById('portal');
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    function handleScrollAnimation() {
        // Get viewport dimensions
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        
        // Check if we're viewing the about me section
        const aboutmeTop = aboutmeSection.offsetTop;
        const aboutmeHeight = aboutmeSection.offsetHeight;
        const aboutmeBottom = aboutmeTop + aboutmeHeight;
        
        // Check if we're viewing the portal section
        const portalTop = portalSection.offsetTop;
        const portalHeight = portalSection.offsetHeight;
        const portalBottom = portalTop + portalHeight;
        
        // Calculate if sections are in view
        const aboutmeInView = (scrollPosition + viewportHeight * 0.5 >= aboutmeTop) && 
                           (scrollPosition < aboutmeBottom);
        
        const portalInView = (scrollPosition + viewportHeight * 0.5 >= portalTop) && 
                          (scrollPosition < portalBottom);
        
        // Apply animations to each section
        scrollElements.forEach(element => {
            const section = element.closest('section');
            
            if (section === aboutmeSection && aboutmeInView) {
                element.classList.add('show-element');
            } else if (section === aboutmeSection && !aboutmeInView) {
                element.classList.remove('show-element');
            }
            
            if (section === portalSection && portalInView) {
                element.classList.add('show-element');
            } else if (section === portalSection && !portalInView) {
                element.classList.remove('show-element');
            }
        });
    }
    
    // Initial check and add scroll event listener
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Handle dark/light mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});