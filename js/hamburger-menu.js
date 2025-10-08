/**
 * Professional Sticky Hamburger Menu
 * Fully implemented in JS with integrated CSS
 * Mobile and desktop friendly
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create and inject the CSS styles
    injectMenuStyles();
    
    // Create and inject the hamburger menu
    createHamburgerMenu();
    
    // Handle scroll events for sticky behavior
    initStickyBehavior();
    
    // Add event listeners
    setupEventListeners();
});

/**
 * Inject the CSS styles directly
 */
function injectMenuStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Hamburger menu container */
        .hamburger-menu-container {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            transition: transform 0.3s ease, background-color 0.3s ease;
            font-family: 'Arial', sans-serif;
        }
        
        /* Sticky effect classes */
        .hamburger-menu-container.sticky {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .hamburger-menu-container.hidden {
            transform: translateY(-100%);
        }
        
        /* Main menu bar */
        .hamburger-menu-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            transition: all 0.3s ease;
        }
        
        .hamburger-menu-container.sticky .hamburger-menu-bar {
            padding: 10px 20px;
        }
        
        /* Logo section */
        .hamburger-menu-logo {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .hamburger-menu-logo img {
            height: 40px;
            width: auto;
            transition: height 0.3s ease;
            border-radius: 5px;
        }
        
        .hamburger-menu-container.sticky .hamburger-menu-logo img {
            height: 35px;
        }
        
        .hamburger-menu-logo-text {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            display: inline-block;
            transition: all 0.3s ease;
        }
        
        /* Hamburger button */
        .hamburger-button {
            display: none;
            cursor: pointer;
            width: 30px;
            height: 25px;
            position: relative;
            z-index: 1001;
            background: transparent;
            border: none;
            padding: 0;
        }
        
        .hamburger-bar {
            width: 100%;
            height: 3px;
            background-color: #333;
            display: block;
            position: absolute;
            border-radius: 3px;
            transition: all 0.3s ease;
        }
        
        .hamburger-bar:nth-child(1) {
            top: 0;
        }
        
        .hamburger-bar:nth-child(2) {
            top: 10px;
        }
        
        .hamburger-bar:nth-child(3) {
            top: 20px;
        }
        
        /* Animated hamburger button */
        .hamburger-button.active .hamburger-bar:nth-child(1) {
            transform: translateY(10px) rotate(45deg);
        }
        
        .hamburger-button.active .hamburger-bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger-button.active .hamburger-bar:nth-child(3) {
            transform: translateY(-10px) rotate(-45deg);
        }
        
        /* Navigation menu */
        .hamburger-nav-menu {
            display: flex;
            gap: 20px;
        }
        
        .hamburger-nav-menu a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            position: relative;
            transition: all 0.3s ease;
            padding: 5px 0;
        }
        
        .hamburger-nav-menu a:hover {
            color: #0066cc;
        }
        
        .hamburger-nav-menu a:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #0066cc;
            transition: width 0.3s ease;
        }
        
        .hamburger-nav-menu a:hover:before {
            width: 100%;
        }
        
        .hamburger-nav-menu a.active {
            color: #0066cc;
        }
        
        .hamburger-nav-menu a.active:before {
            width: 100%;
        }
        
        /* Mobile menu overlay */
        .hamburger-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.98);
            z-index: 999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .hamburger-menu-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .hamburger-menu-overlay-links {
            display: flex;
            flex-direction: column;
            gap: 20px;
            text-align: center;
        }
        
        .hamburger-menu-overlay-links a {
            text-decoration: none;
            color: #333;
            font-size: 1.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
            transform: translateY(20px);
            opacity: 0;
            position: relative;
            padding: 10px 20px;
        }
        
        .hamburger-menu-overlay.active .hamburger-menu-overlay-links a {
            transform: translateY(0);
            opacity: 1;
        }
        
        /* Adding delay for each menu item */
        .hamburger-menu-overlay-links a:nth-child(1) {
            transition-delay: 0.1s;
        }
        .hamburger-menu-overlay-links a:nth-child(2) {
            transition-delay: 0.2s;
        }
        .hamburger-menu-overlay-links a:nth-child(3) {
            transition-delay: 0.3s;
        }
        .hamburger-menu-overlay-links a:nth-child(4) {
            transition-delay: 0.4s;
        }
        .hamburger-menu-overlay-links a:nth-child(5) {
            transition-delay: 0.5s;
        }
        
        .hamburger-menu-overlay-links a:hover {
            color: #0066cc;
        }
        
        .hamburger-menu-overlay-links a:before {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background-color: #0066cc;
            transition: width 0.3s ease;
        }
        
        .hamburger-menu-overlay-links a:hover:before {
            width: 40%;
        }
        
        .hamburger-menu-overlay-links a.active {
            color: #0066cc;
        }
        
        .hamburger-menu-overlay-links a.active:before {
            width: 40%;
        }
        
        /* Responsive styles */
        @media (max-width: 991px) {
            .hamburger-button {
                display: block;
            }
            
            .hamburger-nav-menu {
                display: none;
            }
        }
        
        @media (min-width: 992px) {
            .hamburger-menu-overlay {
                display: none !important;
            }
        }
        
        @media (max-width: 576px) {
            .hamburger-menu-logo-text {
                display: none;
            }
        }
    `;
    document.head.appendChild(styleElement);
}

/**
 * Create and inject the hamburger menu into the DOM
 */
function createHamburgerMenu() {
    // Get the site logo path from the existing logo
    const existingLogo = document.querySelector('.logo-container img');
    const logoPath = existingLogo ? existingLogo.src : 'assets/logo.jpg';
    
    // Get the existing nav links from the current navigation
    const existingNavLinks = document.querySelectorAll('.nav-links a');
    const navItems = [];
    
    existingNavLinks.forEach(link => {
        navItems.push({
            href: link.getAttribute('href'),
            text: link.textContent
        });
    });
    
    // Create the hamburger menu container
    const hamburgerMenuContainer = document.createElement('div');
    hamburgerMenuContainer.className = 'hamburger-menu-container';
    
    // Create the menu bar
    const hamburgerMenuBar = document.createElement('div');
    hamburgerMenuBar.className = 'hamburger-menu-bar';
    
    // Create logo section
    const hamburgerMenuLogo = document.createElement('div');
    hamburgerMenuLogo.className = 'hamburger-menu-logo';
    
    const logoImg = document.createElement('img');
    logoImg.src = logoPath;
    logoImg.alt = 'Festival Logo';
    
    const logoText = document.createElement('span');
    logoText.className = 'hamburger-menu-logo-text';
    logoText.textContent = 'Festeiros 2005';
    
    hamburgerMenuLogo.appendChild(logoImg);
    hamburgerMenuLogo.appendChild(logoText);
    
    // Create the hamburger button
    const hamburgerButton = document.createElement('button');
    hamburgerButton.className = 'hamburger-button';
    hamburgerButton.setAttribute('aria-label', 'Menu');
    
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('span');
        bar.className = 'hamburger-bar';
        hamburgerButton.appendChild(bar);
    }
    
    // Create desktop navigation menu
    const desktopNavMenu = document.createElement('nav');
    desktopNavMenu.className = 'hamburger-nav-menu';
    
    // Create mobile menu overlay
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'hamburger-menu-overlay';
    
    const mobileMenuLinks = document.createElement('div');
    mobileMenuLinks.className = 'hamburger-menu-overlay-links';
    
    // Add navigation items to both desktop and mobile menus
    navItems.forEach(item => {
        // Desktop menu item
        const desktopLink = document.createElement('a');
        desktopLink.href = item.href;
        desktopLink.textContent = item.text;
        desktopNavMenu.appendChild(desktopLink);
        
        // Mobile menu item
        const mobileLink = document.createElement('a');
        mobileLink.href = item.href;
        mobileLink.textContent = item.text;
        mobileMenuLinks.appendChild(mobileLink);
    });
    
    mobileMenuOverlay.appendChild(mobileMenuLinks);
    
    // Assemble the hamburger menu
    hamburgerMenuBar.appendChild(hamburgerMenuLogo);
    hamburgerMenuBar.appendChild(desktopNavMenu);
    hamburgerMenuBar.appendChild(hamburgerButton);
    
    hamburgerMenuContainer.appendChild(hamburgerMenuBar);
    document.body.appendChild(hamburgerMenuContainer);
    document.body.appendChild(mobileMenuOverlay);
}

/**
 * Initialize sticky behavior for the menu
 */
function initStickyBehavior() {
    const hamburgerMenuContainer = document.querySelector('.hamburger-menu-container');
    
    // Variables to track scrolling
    let lastScrollTop = 0;
    let scrollThreshold = 100; // How many pixels to scroll before the menu becomes sticky
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Apply sticky class when scrolled down
        if (scrollTop > scrollThreshold) {
            hamburgerMenuContainer.classList.add('sticky');
            
            // Hide on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                // Scrolling down & past threshold
                hamburgerMenuContainer.classList.add('hidden');
            } else {
                // Scrolling up
                hamburgerMenuContainer.classList.remove('hidden');
            }
        } else {
            // At the top of the page
            hamburgerMenuContainer.classList.remove('sticky');
            hamburgerMenuContainer.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenuOverlay = document.querySelector('.hamburger-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.hamburger-menu-overlay-links a');
    const desktopMenuLinks = document.querySelectorAll('.hamburger-nav-menu a');
    const hamburgerMenuLogo = document.querySelector('.hamburger-menu-logo');
    
    // Toggle mobile menu
    hamburgerButton.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    });
    
    // Set active links based on current page
    function updateActiveLinks() {
        const currentPath = window.location.pathname;
        
        // Update desktop menu
        desktopMenuLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Update mobile menu
        mobileMenuLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close the menu
            hamburgerButton.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // If using the same routing system, prevent default and handle manually
            const targetPath = this.getAttribute('href');
            if (targetPath.startsWith('/') && targetPath !== '/' && window.handleSpecialUrls) {
                e.preventDefault();
                window.history.pushState({}, '', targetPath);
                window.handleSpecialUrls();
                updateActiveLinks();
            }
        });
    });
    
    // Desktop menu links with the same routing system
    desktopMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetPath = this.getAttribute('href');
            if (targetPath.startsWith('/') && targetPath !== '/' && window.handleSpecialUrls) {
                e.preventDefault();
                window.history.pushState({}, '', targetPath);
                window.handleSpecialUrls();
                updateActiveLinks();
            }
        });
    });
    
    // Logo click should go to home
    hamburgerMenuLogo.addEventListener('click', function() {
        window.location.href = '/';
    });
    
    // Make routing function available globally
    window.handleSpecialUrls = function() {
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
                // Update URL to maintain the virtual route for sharing
                const stateObj = { path: path };
                window.history.pushState(stateObj, '', path);
                
                // Scroll to the element with a slight delay to ensure smooth transition
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Add highlight effect to the section
                    if (window.addTemporaryHighlight) {
                        window.addTemporaryHighlight(targetElement);
                    }
                }, 100);
            }
        }
        
        updateActiveLinks();
    };
    
    // Initialize active links
    updateActiveLinks();
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function() {
        if (window.handleSpecialUrls) {
            window.handleSpecialUrls();
        }
    });
}