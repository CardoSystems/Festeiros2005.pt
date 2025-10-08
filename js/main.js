// Import required if using modules
// import GoogleCalendarEmbed from './components/GoogleCalendarEmbed.js';
// Note: For real implementation, uncomment the import below
// import { fetchUpcomingEvents, formatEventDate, formatEventTime } from './calendar-api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Calendar integration
    setupCalendar();
    
    // Setup subscribe button
    setupSubscribeButton();
    
    // Add smooth scrolling
    setupSmoothScrolling();
    
    // Initialize FancyBox gallery
    setupFancyBox();
    
    // Setup public URL switcher
    setupPublicUrlSwitcher();
    
    // Add current year to copyright
    const copyrightEl = document.querySelector('.copyright');
    if (copyrightEl) {
        copyrightEl.innerHTML = copyrightEl.innerHTML.replace('2025', new Date().getFullYear());
    }
});

function setupCalendar() {
    const calendarContainer = document.getElementById('calendar');
    if (!calendarContainer) return;

    // For the HTML iframe approach, we customize it here
    const calendarIframe = document.getElementById('calendar-iframe');
    if (calendarIframe) {
        // Check if we're using the correct calendar
        const calendarSrc = calendarIframe.src;
        const correctCalendarId = '816a0a926eb45804d46292e69a25a992e459786291315a30096815b6a5fe92e';
        if (!calendarSrc.includes(correctCalendarId)) {
            console.warn('Calendar ID may not be set correctly');
        }
        
        // Responsive behavior
        const handleResize = () => {
            if (window.innerWidth < 600) {
                calendarIframe.style.height = '450px';
            } else if (window.innerWidth < 900) {
                calendarIframe.style.height = '550px';
            } else {
                calendarIframe.style.height = '650px';
            }
        };
        
        window.addEventListener('resize', handleResize);
        
        // Trigger resize handler immediately
        handleResize();
        
        // Setup view toggling
        setupViewToggle(calendarIframe);
        
        // Handle load errors
        calendarIframe.addEventListener('error', handleCalendarError);
        
        // Set a timeout to check if the calendar loaded properly
        setTimeout(checkCalendarLoaded, 5000);
    }
}

function handleCalendarError() {
    const loadingElement = document.querySelector('.calendar-loading');
    if (loadingElement) {
        loadingElement.textContent = 'Ocorreu um erro ao carregar o calendário. Por favor, utilize o link alternativo abaixo.';
        loadingElement.style.display = 'flex';
    }
    
    // Show the fallback link more prominently
    const fallbackLink = document.querySelector('.calendar-fallback');
    if (fallbackLink) {
        fallbackLink.style.backgroundColor = '#ffe8e8';
        fallbackLink.style.padding = '15px';
        fallbackLink.style.borderRadius = '5px';
        fallbackLink.style.marginTop = '20px';
        fallbackLink.style.fontWeight = 'bold';
    }
    
    // Show the reload button
    const reloadBtn = document.getElementById('reload-calendar-btn');
    if (reloadBtn) {
        reloadBtn.style.display = 'block';
        reloadBtn.addEventListener('click', reloadCalendar);
    }
}

function reloadCalendar() {
    const calendarIframe = document.getElementById('calendar-iframe');
    const loadingElement = document.querySelector('.calendar-loading');
    
    if (!calendarIframe || !loadingElement) return;
    
    // Show loading indicator
    loadingElement.textContent = 'A carregar calendário...';
    loadingElement.style.display = 'flex';
    
    // Append a random query parameter to force reload
    const currentSrc = calendarIframe.src;
    const timestamp = Date.now();
    const newSrc = currentSrc.includes('?') 
        ? `${currentSrc}&_=${timestamp}` 
        : `${currentSrc}?_=${timestamp}`;
    
    calendarIframe.src = newSrc;
    
    // Hide the reload button
    const reloadBtn = document.getElementById('reload-calendar-btn');
    if (reloadBtn) {
        reloadBtn.style.display = 'none';
    }
}

function setupPublicUrlSwitcher() {
    const publicUrlLink = document.getElementById('use-public-url');
    if (!publicUrlLink) return;
    
    publicUrlLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        const calendarIframe = document.getElementById('calendar-iframe');
        const loadingElement = document.querySelector('.calendar-loading');
        
        if (!calendarIframe || !loadingElement) return;
        
        // Show loading indicator
        loadingElement.textContent = 'A carregar vista pública do calendário...';
        loadingElement.style.display = 'flex';
        
        // Use the public URL version (works without login)
        calendarIframe.src = 'https://calendar.google.com/calendar/htmlembed?src=816a0a926eb45804d46292e69a25a992e459786291315a30096815b6a5fe92e%40group.calendar.google.com&ctz=Europe%2FLisbon';
        
        // Update message
        publicUrlLink.textContent = 'A usar vista pública';
        publicUrlLink.style.color = '#888';
        publicUrlLink.style.textDecoration = 'none';
        publicUrlLink.style.cursor = 'default';
        publicUrlLink.onclick = (e) => e.preventDefault();
    });
}

function checkCalendarLoaded() {
    const calendarIframe = document.getElementById('calendar-iframe');
    const loadingElement = document.querySelector('.calendar-loading');
    
    if (!calendarIframe || !loadingElement) return;
    
    // Using a more reliable approach to detect if the calendar loaded properly
    // If the loading element is still visible after timeout, show the fallback options
    if (loadingElement.style.display !== 'none') {
        // If we still see the loading message, calendar might have issues
        handleCalendarError();
        
        // Add an event listener to the iframe in case it loads later
        calendarIframe.addEventListener('load', function() {
            // Hide the loading indicator when the iframe finally loads
            loadingElement.style.display = 'none';
            
            // Hide the error message if it was displayed
            const reloadBtn = document.getElementById('reload-calendar-btn');
            if (reloadBtn) {
                reloadBtn.style.display = 'none';
            }
        });
    }
}

function setupSubscribeButton() {
    const subscribeBtn = document.getElementById('subscribe-button');
    if (!subscribeBtn) return;
    
    subscribeBtn.addEventListener('click', () => {
        const calendarId = '816a0a926eb45804d46292e69a25a992e459786291315a30096815b6a5fe92e@group.calendar.google.com';
        const subscribeUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(calendarId)}`;
        window.open(subscribeUrl, '_blank');
    });
}

function setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

function setupViewToggle(calendarIframe) {
    const monthViewBtn = document.getElementById('month-view-btn');
    const agendaViewBtn = document.getElementById('agenda-view-btn');
    
    if (!monthViewBtn || !agendaViewBtn || !calendarIframe) return;
    
    // Store the base URL without mode parameter
    const baseUrl = calendarIframe.src.replace(/&mode=(MONTH|AGENDA)/, '');
    
    monthViewBtn.addEventListener('click', () => {
        setActiveButton(monthViewBtn, agendaViewBtn);
        showCalendarLoading();
        calendarIframe.src = `${baseUrl}&mode=MONTH`;
    });
    
    agendaViewBtn.addEventListener('click', () => {
        setActiveButton(agendaViewBtn, monthViewBtn);
        showCalendarLoading();
        calendarIframe.src = `${baseUrl}&mode=AGENDA`;
    });
    
    // Auto-switch to agenda view on mobile
    if (window.innerWidth < 600 && !sessionStorage.getItem('calendarViewSelected')) {
        agendaViewBtn.click();
        sessionStorage.setItem('calendarViewSelected', 'true');
    }
}

function setActiveButton(activeBtn, inactiveBtn) {
    activeBtn.classList.add('active');
    inactiveBtn.classList.remove('active');
}

function showCalendarLoading() {
    const loadingElement = document.querySelector('.calendar-loading');
    if (loadingElement) {
        loadingElement.style.display = 'flex';
    }
}

/**
 * Setup FancyBox gallery with auto-slide and other features
 */
function setupFancyBox() {
    // Check if FancyBox is loaded
    if (typeof Fancybox === 'undefined') {
        console.warn('FancyBox is not loaded. Make sure the script is included correctly.');
        return;
    }
    
    // Initialize FancyBox with options
    Fancybox.bind('[data-fancybox="gallery"]', {
        // Auto start slideshow
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: window.innerWidth > 768 ? [
                    "zoomIn",
                    "zoomOut",
                    "toggle1to1",
                    "rotateCCW",
                    "rotateCW",
                ] : ["zoomIn", "zoomOut"],
                right: ["slideshow", "thumbs", "close"],
            },
            absolute: true,
        },
        Thumbs: {
            autoStart: window.innerWidth > 480,
            type: "classic",
            keepRatio: true,
            key: "t",
            mobile: {
                showOnStart: false,
                width: "100%",
                height: 120,
                gap: 10,
            },
        },
        Carousel: {
            friction: 0.8,
            autoPlay: {
                startOnAppear: true,
                timeout: 3000
            },
            preload: 2,
        },
        Image: {
            zoom: true,
            fit: "contain",
            wheel: "slide",
            click: "toggleZoom",
            doubleClick: "toggleZoom",
        },
        // Video specific settings
        Video: {
            autoplay: true,
            ratio: 16/9,
            fit: "cover",
            controls: true,
            clickSlide: "close",
        },
        // HTML5 video specific settings
        Html5video: {
            tpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">' +
                '<source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos</video>',
        },
        // Make FancyBox responsive
        compact: window.innerWidth < 768,
        contentClick: "toggleZoom",
        animated: true,
        showClass: "fancybox-zoomIn",
        hideClass: "fancybox-zoomOut",
        idle: false,
        dragToClose: false,
        // Portuguese localization
        l10n: {
            CLOSE: "Fechar",
            NEXT: "Seguinte",
            PREV: "Anterior",
            ERROR: "O conteúdo não pôde ser carregado.",
            PLAY_START: "Iniciar apresentação",
            PLAY_STOP: "Pausar apresentação",
            TOGGLE_THUMBS: "Miniaturas",
            TOGGLE_FULLSCREEN: "Ecrã completo",
            TOGGLE_ZOOM: "Zoom"
        },
        
        // Mobile-specific options
        mobile: {
            preventCaptionOverlap: true,
            toolbar: true,
            buttons: ["zoom", "slideShow", "close"]
        }
    });
    
    // Initialize FancyBox for highlights with enhanced options
    Fancybox.bind('[data-fancybox="highlights"]', {
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: ["zoomIn", "zoomOut", "toggle1to1"],
                right: ["slideshow", "close"],
            },
            absolute: true,
        },
        Thumbs: {
            autoStart: false,
        },
        Carousel: {
            friction: 0.8,
            autoPlay: {
                startOnAppear: true,
                timeout: 5000
            },
        },
        Image: {
            zoom: true,
            fit: "contain", // Changed to contain for better viewing of large images
            wheel: "slide",
            click: "toggleZoom",
            doubleClick: "toggleZoom",
            Panzoom: {
                panOnlyZoomed: false,
                maxScale: 3, // Allow more zoom
            }
        },
        compact: window.innerWidth < 768,
        animated: true,
        showClass: "fancybox-zoomIn",
        hideClass: "fancybox-zoomOut",
        idle: false,
        l10n: {
            CLOSE: "Fechar",
            NEXT: "Seguinte",
            PREV: "Anterior",
            ERROR: "O conteúdo não pôde ser carregado.",
            PLAY_START: "Iniciar apresentação",
            PLAY_STOP: "Pausar apresentação",
            TOGGLE_FULLSCREEN: "Ecrã completo",
            TOGGLE_ZOOM: "Zoom"
        }
    });
    
    // Add responsive handling for FancyBox on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Re-initialize FancyBox when window size changes significantly
            const currentWidth = window.innerWidth;
            if ((currentWidth < 768 && lastWidth >= 768) || 
                (currentWidth >= 768 && lastWidth < 768) || 
                (currentWidth < 480 && lastWidth >= 480) || 
                (currentWidth >= 480 && lastWidth < 480)) {
                
                // Close any open Fancybox instance
                if (typeof Fancybox !== 'undefined' && Fancybox.getInstance()) {
                    Fancybox.getInstance().close();
                }
                
                // Force refresh gallery layout
                const galleryItems = document.querySelectorAll('.gallery-carousel a');
                if (galleryItems.length) {
                    // Apply optimal thumbnail sizing based on screen width
                    galleryItems.forEach(item => {
                        // Remove any inline styles that might be affecting layout
                        item.style.removeProperty('width');
                        item.style.removeProperty('height');
                        
                        // Apply subtle animation to show that the layout is refreshing
                        item.style.transition = 'all 0.3s ease';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => { 
                            item.style.transform = 'scale(1)';
                        }, 50);
                    });
                }
            }
            lastWidth = currentWidth;
        }, 250);
    });
    
    // Store initial width
    let lastWidth = window.innerWidth;
    
    // Optimize mobile experience on page load
    setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        const galleryItems = document.querySelectorAll('.gallery-carousel a');
        
        if (galleryItems.length) {
            // Make sure mobile thumbnails are appropriately sized
            galleryItems.forEach(item => {
                const img = item.querySelector('img');
                if (img) {
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                }
                
                // Add enhanced touch behavior for mobile
                if (isMobile) {
                    item.addEventListener('touchstart', () => {
                        item.classList.add('touch-active');
                    });
                    
                    item.addEventListener('touchend', () => {
                        item.classList.remove('touch-active');
                    });
                }
                
                // Special handling for video items
                if (item.dataset.type === 'html5video') {
                    item.addEventListener('click', (e) => {
                        // Force video to play when opened in FancyBox
                        setTimeout(() => {
                            const videoElements = document.querySelectorAll('.fancybox__container video');
                            if (videoElements.length > 0) {
                                videoElements.forEach(video => {
                                    // Attempt to play the video
                                    const playPromise = video.play();
                                    
                                    if (playPromise !== undefined) {
                                        playPromise.catch(error => {
                                            console.log('Auto-play prevented, user interaction needed:', error);
                                            // Show play button or message if autoplay is blocked
                                            const playOverlay = document.createElement('div');
                                            playOverlay.className = 'video-play-overlay';
                                            playOverlay.innerHTML = '<div class="big-play-button">▶</div>';
                                            video.parentNode.appendChild(playOverlay);
                                            
                                            playOverlay.addEventListener('click', () => {
                                                video.play();
                                                playOverlay.style.display = 'none';
                                            });
                                        });
                                    }
                                });
                            }
                        }, 300);
                    });
                }
            });
            
            // Ensure FancyBox images and videos are sized properly
            if (typeof Fancybox !== 'undefined') {
                Fancybox.defaults.Image = {
                    ...Fancybox.defaults.Image,
                    zoom: true,
                    wheel: "slide",
                    fit: "contain"
                };
                
                // Monitor for FancyBox video issues
                document.addEventListener('fancybox-after-show', (event) => {
                    const videoElement = document.querySelector('.fancybox__container video');
                    if (videoElement) {
                        videoElement.controls = true;
                        videoElement.style.width = '100%';
                        
                        // Fix for iOS video playback
                        videoElement.setAttribute('playsinline', '');
                        videoElement.setAttribute('webkit-playsinline', '');
                    }
                });
            }
        }
    }, 500);
    
    // Start automatic rotation for thumbnails in the page
    startGalleryRotation();
}

/**
 * Start gallery thumbnail rotation on the page
 */
function startGalleryRotation() {
    const galleryLinks = document.querySelectorAll('.gallery-carousel a');
    if (galleryLinks.length <= 1) return;
    
    let currentIndex = 0;
    const totalItems = galleryLinks.length;
    
    // Add active class to first item
    galleryLinks[0].classList.add('active-thumbnail');
    
    // Set interval for rotation
    setInterval(() => {
        // Remove active class from current item
        galleryLinks[currentIndex].classList.remove('active-thumbnail');
        
        // Move to next item (loop back to start if at end)
        currentIndex = (currentIndex + 1) % totalItems;
        
        // Add active class to new current item
        galleryLinks[currentIndex].classList.add('active-thumbnail');
        
        // Apply subtle animation
        galleryLinks[currentIndex].style.transition = 'transform 0.5s ease-in-out';
        galleryLinks[currentIndex].style.transform = 'scale(1.05)';
        
        // Reset transform after animation
        setTimeout(() => {
            galleryLinks[currentIndex].style.transform = '';
        }, 500);
    }, 3000); // 3 seconds interval
}

/**
 * Dynamically loads events from calendar API into highlights section
 * Note: This function would be used with ES modules
 */
// Function removed as event highlights section has been removed from the page