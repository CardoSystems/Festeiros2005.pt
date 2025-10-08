// Service Worker for Festival Website
// Version: 1.0.0

const MEDIA_CACHE_NAME = 'festival-media-cache-v1';

// No core assets to cache - focusing only on media files

// Media assets and icons to cache
const MEDIA_ASSETS = [
  // Image assets
  '/assets/baraberto.jpg',
  '/assets/diadejogo.jpg',
  '/assets/logo.jpg',
  '/assets/paocaseiro.jpg',
  
  // Video assets
  '/assets/fabrica.mp4',
  
  // Icons and favicons
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png'
];

// Install event - cache media assets only
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    // Cache media assets
    caches.open(MEDIA_CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching media assets');
      return cache.addAll(MEDIA_ASSETS);
    })
    .then(() => {
      console.log('[Service Worker] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== MEDIA_CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[Service Worker] Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - only intercept and cache media files
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Skip cross-origin requests
  if (requestUrl.origin !== location.origin) {
    return;
  }
  
  // Detect if this is a media file by checking file extension or explicit paths
  const isMediaFile = (url) => {
    const path = url.pathname;
    
    // Check if it's one of our explicitly listed media assets
    const isExplicitMedia = MEDIA_ASSETS.some(mediaPath => 
      path === mediaPath || 
      path.endsWith(mediaPath.split('/').pop())
    );
    
    if (isExplicitMedia) return true;
    
    // Check file extensions for other media files
    const mediaExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', 
                             '.mp4', '.webm', '.ogg', '.mp3', '.wav',
                             '.ico'];
    
    return mediaExtensions.some(ext => path.toLowerCase().endsWith(ext));
  };
  
  // Only handle media file requests
  if (isMediaFile(requestUrl)) {
    event.respondWith(handleMediaRequest(event.request));
  }
  // Let the browser handle all other requests normally
});

// Handle media asset requests with cache-first strategy
async function handleMediaRequest(request) {
  // Check cache first for media assets
  const cachedResponse = await caches.match(request, { cacheName: MEDIA_CACHE_NAME });
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // If not in cache, fetch from network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(MEDIA_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      console.log('[Service Worker] Cached new media file:', request.url);
    }
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Media fetch failed:', error);
    return new Response('Media not available offline', { 
      status: 408, 
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Update checker - check for service worker updates every 6 hours
const CHECK_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

// Function to check for updates
async function checkForUpdates() {
  try {
    // Check if service worker needs updating
    const registration = await self.registration;
    await registration.update();
    console.log('[Service Worker] Checked for updates');
  } catch (error) {
    console.error('[Service Worker] Update check failed:', error);
  }
}

// Set up periodic update checks
setInterval(checkForUpdates, CHECK_INTERVAL);

// Listen for message events (can be used to trigger immediate update check)
self.addEventListener('message', event => {
  if (event.data === 'CHECK_FOR_UPDATES') {
    console.log('[Service Worker] Manual update check triggered');
    checkForUpdates();
  }
});