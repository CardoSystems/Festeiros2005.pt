// Debug script for service worker functionality
// To test in browser console

function checkServiceWorker() {
    console.log('Checking service worker status...');
    
    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
        console.error('❌ Service Workers are not supported in this browser');
        return;
    }
    
    console.log('✅ Service Workers are supported');
    
    // Check if a service worker is registered
    navigator.serviceWorker.getRegistration().then(registration => {
        if (!registration) {
            console.error('❌ No Service Worker is currently registered');
            return;
        }
        
        console.log('✅ Service Worker is registered with scope:', registration.scope);
        console.log('Current Service Worker state:', registration.active ? 'Active' : registration.installing ? 'Installing' : registration.waiting ? 'Waiting' : 'Unknown');
        console.log('Service Worker details:', registration);
        
        // Check if the service worker is controlling this page
        if (navigator.serviceWorker.controller) {
            console.log('✅ Service Worker is controlling this page');
            console.log('Controller details:', navigator.serviceWorker.controller);
        } else {
            console.warn('⚠️ Service Worker is registered but not controlling this page yet');
            console.log('This is normal if you just registered the service worker');
            console.log('Try refreshing the page to allow the service worker to take control');
        }
        
        // Check for updates
        registration.update().then(() => {
            console.log('Service Worker update check completed');
        });
    });
    
    // Check cache storage
    if ('caches' in window) {
        console.log('✅ Cache Storage API is supported');
        
        // List all available caches
        caches.keys().then(cacheNames => {
            console.log('Available caches:', cacheNames);
            
            // Check if our specific media cache exists
            if (cacheNames.includes('festival-media-cache-v1')) {
                console.log('✅ Media cache exists');
                
                // Inspect the media cache
                caches.open('festival-media-cache-v1').then(cache => {
                    cache.keys().then(requests => {
                        console.log('Cached media items:', requests.length);
                        if (requests.length > 0) {
                            console.log('Sample of cached items:', requests.slice(0, 5).map(req => req.url));
                        } else {
                            console.warn('⚠️ Media cache exists but contains no items');
                        }
                    });
                });
            } else {
                console.warn('⚠️ Media cache does not exist yet');
                console.log('This could be normal if no media has been accessed or the service worker just installed');
            }
        });
    } else {
        console.error('❌ Cache Storage API is not supported');
    }
}

// Test media caching functionality
async function testMediaCaching() {
    console.log('Testing media caching functionality...');
    
    const testImageUrl = '/assets/logo.jpg';
    
    console.log(`Fetching test image: ${testImageUrl}`);
    
    try {
        // First check if it's in cache
        const initialCacheResponse = await caches.match(testImageUrl);
        
        if (initialCacheResponse) {
            console.log('✅ Image was already in cache before test');
        } else {
            console.log('Image not in cache initially, this is expected if first test run');
        }
        
        // Now fetch the image to trigger caching
        const response = await fetch(testImageUrl);
        if (response.ok) {
            console.log('✅ Image fetch successful');
            
            // Wait a moment to let service worker do its job
            setTimeout(async () => {
                // Check if it's now in cache
                const cacheResponse = await caches.match(testImageUrl);
                
                if (cacheResponse) {
                    console.log('✅ Image was successfully cached by service worker');
                } else {
                    console.warn('⚠️ Image was not cached after fetching');
                    console.log('Potential issues:');
                    console.log('1. Service worker might not be active yet');
                    console.log('2. Service worker fetch handler might not be working correctly');
                    console.log('3. Cache name might be different than expected');
                }
            }, 1000);
        } else {
            console.error('❌ Failed to fetch the test image');
        }
    } catch (error) {
        console.error('❌ Error during test:', error);
    }
}

// Function to manually trigger the service worker update check
function checkForUpdates() {
    if (navigator.serviceWorker.controller) {
        console.log('Sending update check message to service worker...');
        navigator.serviceWorker.controller.postMessage('CHECK_FOR_UPDATES');
        console.log('Message sent. Check service worker console for response.');
    } else {
        console.warn('⚠️ No controlling service worker to send message to');
    }
}

// Usage instructions
console.log('====== SERVICE WORKER DEBUGGING TOOLS ======');
console.log('Run any of these functions:');
console.log('1. checkServiceWorker() - Check current service worker status');
console.log('2. testMediaCaching() - Test if media caching is working');
console.log('3. checkForUpdates() - Manually trigger SW update check');

// Run the check automatically
checkServiceWorker();